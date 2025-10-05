import React, { useState } from "react";
import "./App.css";

const App = () => {
  const emptyBoard = Array(9)
    .fill(null)
    .map(() => Array(9).fill(""));

  const [board, setBoard] = useState(emptyBoard);
  const [message, setMessage] = useState("");


  const handleChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value;
      setBoard(newBoard);
    }
  };


  const validateSudoku = () => {

    for (let row of board) {
      const nums = row.filter(Boolean);
      if (new Set(nums).size !== nums.length) {
        setMessage("Sudoku rules violated!");
        return;
      }
    }


    for (let col = 0; col < 9; col++) {
      const nums = [];
      for (let row = 0; row < 9; row++) {
        if (board[row][col]) nums.push(board[row][col]);
      }
      if (new Set(nums).size !== nums.length) {
        setMessage("Sudoku rules violated!");
        return;
      }
    }


    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const nums = [];
        for (let r = row; r < row + 3; r++) {
          for (let c = col; c < col + 3; c++) {
            if (board[r][c]) nums.push(board[r][c]);
          }
        }
        if (new Set(nums).size !== nums.length) {
          setMessage("Sudoku rules violated!");
          return;
        }
      }
    }

    setMessage("Sudoku is valid!");
  };

  const handleReset = () => {
    setBoard(emptyBoard);
    setMessage("");
  };

  return (
    <div className="app">
      <h1>Sudoku Validator</h1>
      

      <p className="description">
        Enter numbers 1-9 and validate the board.
      </p>

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              value={cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            />
          ))
        )}
      </div>

      <div className="buttons">
        <button onClick={validateSudoku}>Validate</button>
        <button onClick={handleReset}>Clear</button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default App;
