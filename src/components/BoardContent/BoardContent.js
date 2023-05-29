import React from "react";
import "./BoardContent.scss";
import Column from "../Column/Column";

function BoardContent(props) {
  return (
    <div className="board-columns">
      <Column />
    </div>
  );
}

export default BoardContent;
