import React, { useState, useEffect } from "react";
import "./BoardContent.scss";
import Column from "../Column/Column";
import { initData } from "../../actions/initData";
import { isEmpty } from "lodash";
import { mapOrder } from "../../utilities/sort";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../utilities/dragDrop";

function BoardContent(props) {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initData.boards.find((board) => board.id === "board-1");
    if (boardFromDB) {
      setBoard(boardFromDB);

      //sort column
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

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
      console.log(newColumns);
      setColumns(newColumns);
    }
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
      <div className="add-new-column">
        <i className="fa fa-plus icon"></i> &nbsp; Add another column
      </div>
    </div>
  );
}

export default BoardContent;
