import { useState } from "react";
import styled from "@emotion/styled";

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 60px);
  grid-gap: 5px;
  margin: 20px auto;
`;

const Cell = styled.div`
  width: 60px;
  height: 60px;
  background: ${(props) => props.color || "#ccc"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
`;

const PlayerInfo = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const initialBoard = Array(7).fill(Array(7).fill(null));

const GameBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });

  const colors = ["#FF6666", "#66FF66", "#6666FF", "#FFFF66"];

  const checkWinner = (row, col, player) => {
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal right-down
      [1, -1], // Diagonal left-down
    ];

    for (let [dx, dy] of directions) {
      let count = 1;

      for (let step = 1; step < 4; step++) {
        const x = row + dx * step;
        const y = col + dy * step;
        if (x >= 0 && y >= 0 && x < 7 && y < 7 && board[x][y] === player) {
          count++;
        } else break;
      }

      for (let step = 1; step < 4; step++) {
        const x = row - dx * step;
        const y = col - dy * step;
        if (x >= 0 && y >= 0 && x < 7 && y < 7 && board[x][y] === player) {
          count++;
        } else break;
      }

      if (count >= 4) return true;
    }
    return false;
  };

  const handleCellClick = (row, col) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
    );

    setBoard(newBoard);

    if (checkWinner(row, col, currentPlayer)) {
      alert(`Player ${currentPlayer} wins!`);
      setScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));
      setBoard(initialBoard);
    } else {
      setCurrentPlayer((prev) => (prev % 4) + 1);
    }
  };

  return (
    <div>
      <Board>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              color={cell ? colors[cell - 1] : null}
              onClick={() => handleCellClick(i, j)}
            >
              {cell}
            </Cell>
          ))
        )}
      </Board>
      <PlayerInfo>
        {Object.keys(scores).map((player) => (
          <div key={player} style={{ margin: "0 20px" }}>
            <strong>Player {player}:</strong> {scores[player]} points
          </div>
        ))}
      </PlayerInfo>
      <p style={{ textAlign: "center" }}>Current Turn: Player {currentPlayer}</p>
    </div>
  );
};

export default GameBoard;
