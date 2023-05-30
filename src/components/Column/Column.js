import React from "react";
import "./Column.scss";
import Card from "../Card/Card";
import { mapOrder } from "../../utilities/sort";
// import { initData } from "../../actions/initData";

function Column(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  return (
    <div className="column">
      <header>{column.title}</header>
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
