import React, { useState, useEffect } from 'react';
import '../App.css';

const GameGrid = ({ onCheckWord, word }) => {
  const numCols = 5;
  const numRows = 6;
  const maxAttempts = 6;

  const [grid, setGrid] = useState(Array(numRows).fill(Array(numCols).fill('')));
  const [activeRow, setActiveRow] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleChange = (e, rowIndex, colIndex) => {
    if (rowIndex !== activeRow) {
      return;
    }

    const value = e.target.value.toUpperCase();
    setGrid((prevGrid) => {
      const updatedGrid = prevGrid.map((row, rIndex) =>
        rIndex === rowIndex ? row.map((col, cIndex) => (cIndex === colIndex ? value : col)) : row
      );
      return updatedGrid;
    });
  };

  const handleKeyPress = (e, rowIndex, colIndex) => {
    if (e.key === 'Enter') {
      const inputWord = grid[rowIndex].join('');
      onCheckWord(inputWord);

      if (inputWord === word) {
        return;
      }
      if (grid[rowIndex].some((letter) => letter === '')) {
        return;
      }
      if (activeRow + 1 < numRows) {
        setActiveRow(activeRow + 1);
      } else {
        setGameOver(true);
      }
      setAttempts(attempts + 1);
    }
  };

  const getCellStyle = (rowIndex, colIndex) => {
    const inputLetter = grid[rowIndex][colIndex];
    const targetLetter = word[colIndex];

    if (targetLetter && inputLetter === targetLetter) {
      return { backgroundColor: 'rgb(44, 167, 44)' };
    } else if (targetLetter && word.includes(inputLetter)) {
      return { backgroundColor: 'rgb(234, 245, 75)' };
    }

    return {};
  };

  useEffect(() => {
    if (attempts === maxAttempts) {
      setGameOver(true);
    }
  }, [attempts, maxAttempts]);

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div>
      {gameOver ? (
        <div className='btn-container'>
          <p className='game-over'>¡PERDISTE!</p>
          <button onClick={restartGame} className='btn-volver'>Volver a Jugar</button>
        </div>
      ) : (
        <div className="game-grid">
          {[...Array(numRows)].map((_, rowIndex) => (
            <div key={rowIndex} className="row">
              {[...Array(numCols)].map((_, colIndex) => (
                <input
                  key={colIndex}
                  type="text"
                  maxLength="1"
                  value={grid[rowIndex][colIndex]}
                  onChange={(e) => handleChange(e, rowIndex, colIndex)}
                  onKeyPress={(e) => handleKeyPress(e, rowIndex, colIndex)}
                  style={getCellStyle(rowIndex, colIndex)}
                  disabled={rowIndex !== activeRow}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameGrid;