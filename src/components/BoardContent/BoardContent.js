import React, { useState, useEffect } from "react";
import "./BoardContent.scss";
import Column from "../Column/Column";
import { initData } from "../../actions/initData";
import { isEmpty } from "lodash";
import { mapOrder } from "../../utilities/sort";

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

  return (
    <div className="board-columns">
      {columns.map((column, index) => (
        <Column key={index} column={column} />
      ))}
    </div>
  );
}

export default BoardContent;
