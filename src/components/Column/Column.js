import React, { useCallback, useEffect, useState } from "react";
import "./Column.scss";
import Card from "../Card/Card";
import { mapOrder } from "../../utilities/sort";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form } from "react-bootstrap";
// import { initData } from "../../actions/initData";
import ConfirmModal from "../Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "../../utilities/constants";
import {
  saveContentAfterPressEnter,
  selectAllInlineText,
} from "../../utilities/contentEdit";

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const handleColumnTitleChange = useCallback((e) => {
    setColumnTitle(e.target.value), [];
  });

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
    toggleShowConfirmModal();
  };

  const handleColumnTitleBlur = () => {
    console.log(columnTitle);
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Enter column title..."
            className="content-edit"
            value={columnTitle}
            spellCheck="fasle"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove column...
              </Dropdown.Item>
              <Dropdown.Item>Move all cards in this columns</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDragStart={(e) => console.log("drag started", e)}
          onDragEnd={(e) => console.log("drag end", e)}
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          onDragEnter={() => {
            console.log("drag enter:");
          }}
          onDragLeave={() => {
            console.log("drag leave:");
          }}
          onDropReady={(p) => console.log("Drop ready: ", p)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>
        <div className="footer-action">
          <i className="fa fa-plus icon"></i> &nbsp; Add another card
        </div>
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure you want to remove <strong>${column.title}!</strong> .<br/> All related cards will also be removed!`}
      />
    </div>
  );
}

export default Column;
