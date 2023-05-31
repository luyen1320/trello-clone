import React, { useState, useEffect, useRef, useCallback } from "react";
import "./BoardContent.scss";
import Column from "../Column/Column";
import { initData } from "../../actions/initData";
import { isEmpty } from "lodash";
import { mapOrder } from "../../utilities/sort";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../utilities/dragDrop";
import {
  Container as BoardContainer,
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";

function BoardContent() {
  const [board, setBoard] = useState({}); //object
  const [columns, setColumns] = useState([]); //array
  const [openColumnForm, setOpenColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(""); //string

  const newColumnInputRef = useRef(null);
  const onNewColumnTitleChange = useCallback((e) =>
    setNewColumnTitle(e.target.value, [])
  );

  useEffect(() => {
    const boardFromDB = initData.boards.find((board) => board.id === "board-1");
    if (boardFromDB) {
      setBoard(boardFromDB);

      //sort column
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [openColumnForm]);

  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        Board not found!
      </div>
    );
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
    console.log(newColumns);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((c) => c.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id);
      setColumns(newColumns);
    }
  };

  const toggleOpenNewColumnForm = () => {
    setOpenColumnForm(!openColumnForm);
  };

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
    };

    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
    setNewColumnTitle("");
    toggleOpenNewColumnForm();
  };

  return (
    <div className="board-columns">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "cards-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>

      <BoardContainer className="trello-container">
        {!openColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon"></i> Add another column
            </Col>
          </Row>
        )}

        {openColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(event) => event.key === "Enter" && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add column
              </Button>
              <span
                className="cancel-new-column"
                onClick={toggleOpenNewColumnForm}
              >
                <i className="fa fa-trash icon"></i>
              </span>
            </Col>
          </Row>
        )}
      </BoardContainer>
    </div>
  );
}

export default BoardContent;
