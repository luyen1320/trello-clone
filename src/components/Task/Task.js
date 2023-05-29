import React from "react";
import "./Task.scss";

function Task(props) {
  return (
    <ul className="task-list">
      <li className="task-item">
        <img
          src="https://phuongtanphuoc.gov.vn/wp/vietnam/anhdepvietnam%20(32).jpg"
          alt=""
        />
        Title: Today
      </li>
      <li className="task-item">what are you doing</li>
      <li className="task-item">what are you doing</li>
      <li className="task-item">what are you doing</li>
      <li className="task-item">what are you doing</li>
      <li className="task-item">what are you doing</li>
    </ul>
  );
}

export default Task;
