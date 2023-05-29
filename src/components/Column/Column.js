import React from "react";
import "./Column.scss";
import Task from "../Task/Task";

function Column(props) {
  return (
    <div className="column">
      <header>Brainstorm</header>
      <Task />
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
