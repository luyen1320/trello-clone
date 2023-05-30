import React from "react";
import "./Card.scss";

function Task(props) {
  const { card } = props;
  return (
    <ul className="card-list">
      <li className="card-item">
        {card.cover && <img src={card.cover} className="card-cover" alt="" />}
        {card.title}
      </li>
    </ul>
  );
}

export default Task;
