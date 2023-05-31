import React from "react";
import "./Column.scss";
import Card from "../Card/Card";
import { mapOrder } from "../../utilities/sort";
import { Container, Draggable } from "react-smooth-dnd";
// import { initData } from "../../actions/initData";

function Column(props) {
  const { column, onCardDrop } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
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
    </div>
  );
}

export default Column;
