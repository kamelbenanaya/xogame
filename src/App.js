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

const checkHorizontal = (board) => {
  for (let row of board) {
    const rowSet = new Set(row);
    if (rowSet.size == 1 && !rowSet.has(undefined)) {
      return true;
    }
  }
};
const rowToColumns = (board) => {
  const newBoard = [];
  let column = 0;
  while (column < board.length) {
    const newRow = [];
    for (let row = 0; row < board.length; row++) {
      newRow.push(board[row][column]);
    }
    newBoard.push(newRow);
    column++;
  }
  return newBoard;
};

const diagonaleToRow = (board) => {
  const newBoard = [[], []];
  let increment = 0;
  let decrement = board.length - 1;
  while (increment < board.length) {
    newBoard[0].push(board[increment][increment]);
    newBoard[1].push(board[increment][decrement]);
    increment++;
    decrement--;
  }
  return newBoard;
};

const checkForWin = (board) => {
  //horizontal
  if (checkHorizontal(board)) {
    return true;
  }
  //vertical
  if (checkHorizontal(rowToColumns(board))) {
    return true;
  }
  //diagnoale
  if (checkHorizontal(diagonaleToRow(board))) {
    return true;
  }
};

function App() {
  const [board, setBoard] = useState(gennerateBoard(3));

  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleClick = (row, col) => {
    board[row][col] = currentPlayer;
    setBoard([...board]);
    if (checkForWin(board)) {
      console.log(currentPlayer + " wins");
      setBoard(gennerateBoard(3));
      setCurrentPlayer("X");
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
