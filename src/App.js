import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const gennerateBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

const checkForWin = (board) => {
  //horizontal
  for (let row of board) {
    const rowSet = new Set(row);
    if (rowSet.size == 1 && !rowSet.has(undefined)) {
      return true;
    }
  }
  //vertical
  //diagnoale
};

function App() {
  const [board, setBoard] = useState(gennerateBoard(3));

  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleClick = (row, col) => {
    console.log("row===>", row);
    console.log("col===>", col);

    board[row][col] = currentPlayer;
    setBoard([...board]);
    if (checkForWin(board)) {
      alert(currentPlayer + " wins");
    }
    setCurrentPlayer(currentPlayer == "X" ? "O" : "X");
  };

  return (
    <div>
      {board.map((row, r) => {
        return (
          <div
            key={r}
            style={{
              display: "flex",
            }}
          >
            {row?.map((col, c) => {
              return (
                <div
                  key={c}
                  style={{
                    border: "1px black solid",
                    height: "50px",
                    width: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleClick(r, c)}
                >
                  {col}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
