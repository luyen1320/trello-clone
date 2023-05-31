import "./App.scss";
import React from "react";
import AppBar from "./components/AppBar/AppBar";
import BoarBar from "./components/BoarBar/BoarBar";
import BoardContent from "./components/BoardContent/BoardContent";

function App() {
  return (
    <div className="trello">
      <AppBar />
      <BoarBar />
      <BoardContent />
    </div>
  );
}

export default App;
