import React, { useState, useEffect } from 'react';
import Score from './Score';
import GameMessage from './GameMessage';
import Button from './Buttons';
import { authenticatedRequest } from '../Services/authService';

const Grid = () => {
  const gridSize = 4; // the size of the grid
  const [grid, setGrid] = useState([]); // state for storing the current grid
  const [score, setScore] = useState(0); // state for tracking the scores
  const [highScore, setHighScore] = useState(0);  // state for tracking the highscore
  const [gameStatus, setGameStatus] = useState(null) // state for checking the game status
  const [history, setHistory] = useState([]); // to store grid history
  const [scoreHistory, setScoreHistory] = useState([]); // to store score history
  const moveSound = new Audio('/sounds/movingSound.wav'); // sound for tiles moving
  const loseSound = new Audio('/sounds/youLose.mp3'); // sound if the user lose
  const winSound = new Audio('/sounds/youWon.wav'); // sound if the user won
  const [soundEnabled, setSoundEnabled] = useState(true); // sound check

  // it sends an updated highscore to the server
  const updateHighScore = async (newScore) => {
    try {
      await authenticatedRequest('http://localhost:5000/api/auth/highscore', 'PUT', { score: newScore });
    } catch (error) {
      console.error("Failed to update high score:", error);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };
  
  // generating two random tiles with values of either 2 or 4
  const initializeTiles = () => {
    const initialGrid = Array(gridSize * gridSize).fill(null); // empty grid 
    const randomIndices = []; // randomly placing the tiles
    while (randomIndices.length < 2) {
      const index = Math.floor(Math.random() * gridSize * gridSize);
      if (!randomIndices.includes(index)) {
        randomIndices.push(index);
      }
    }
    randomIndices.forEach(index => {
      initialGrid[index] = getRandomTileValue();
    });
    setGrid(initialGrid);
    setScore(0);
    setGameStatus(null);
  };

  // returns a random tile value with higher chance of getting 2 than getting 4
  const getRandomTileValue = () => Math.random() < 0.9 ? 2 : 4;

  // check if the game has won
  const checkForWin = () => grid.includes(2048);

  // check if the game has loss
  const checkForLoss = () => {
    if (grid.includes(null)) return false; 
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        const tile = grid[index];
        const right = j < gridSize - 1 ? grid[index + 1] : null;
        const down = i < gridSize - 1 ? grid[index + gridSize] : null;
        if (tile === right || tile === down) return false; 
      }
    }
    return true;
  };
  
  // handle game's status
  const handleGame = () => {
    if (score > highScore) {
      setHighScore(score);  
      updateHighScore(score); 
    }
  
    if (checkForWin()) {
      setGameStatus('won');
      if (soundEnabled) {
        winSound.play();
      }
    } else if (checkForLoss()) {
      setGameStatus('lost');
      if (soundEnabled) {
        loseSound.play();
      }
    }
  };
  

  // assigning background color based on the tile value
  const getTileColor = (value) => {
    switch (value) {
    case 2: return 'bg-[#B89C75]'; 
    case 4: return 'bg-[#D69F5D]'; 
    case 8: return 'bg-[#F17F29]'; 
    case 16: return 'bg-[#E86B3A]'; 
    case 32: return 'bg-[#E6724B]'; 
    case 64: return 'bg-[#D85C29]'; 
    case 128: return 'bg-[#F1A80F]';
    case 256: return 'bg-[#F1A600]'; 
    case 512: return 'bg-[#F58B32]';
    case 1024: return 'bg-[#F67A1F]';
    case 2048: return 'bg-[#F15E00]'; 
    default: return 'bg-oliveGreen';
    }
  };

  // shifts the row to the left, merging tiles where possible  
  const shiftRowLeft = (row) => {
    let filteredRow = row.filter(cell => cell !== null);
    let newRow = [];
    let merged = Array(row.length).fill(false);
    let tempScore = 0; 

    let i = 0;
    while (i < filteredRow.length) {
      // merging if they have the same value and are not merged yet.
      if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1] && !merged[i] && !merged[i + 1]) {
        const mergedValue = filteredRow[i] * 2;
        newRow.push(filteredRow[i] * 2); 
        tempScore += mergedValue; 
        merged[i] = true; 
        i += 2;
      } else {
        newRow.push(filteredRow[i]); 
        i++
      }
    }

    // maintaining the grid size
    while (newRow.length < gridSize) {
      newRow.push(null);
    }
    setScore(prevScore => prevScore + tempScore); 
    return newRow;
  };


  // shift the row to the right
  const shiftRowRight = (row) => {
    let filteredRow = row.filter(cell => cell !== null).reverse();
    let newRow = [];
    let merged = Array(row.length).fill(false);
    let tempScore = 0;


    let i = 0;
    while (i < filteredRow.length) {
      if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1] && !merged[i] && !merged[i + 1]) {
        const mergedValue = filteredRow[i] * 2;
        newRow.push(filteredRow[i] * 2);
        tempScore += mergedValue;
        merged[i] = true;
        i += 2;
      } else {
        newRow.push(filteredRow[i]);
        i++;
      }
    }

    while (newRow.length < gridSize) {
      newRow.push(null);
    }
    setScore(prevScore => prevScore + tempScore);
    return newRow.reverse();
  };

  // shifts the colum upwards
  const shiftUp = (colIndex) => {
    const col = [];
    
    for (let i = 0; i < gridSize; i++) {
      col.push(grid[i * gridSize + colIndex]);
    }
    let filteredCol = col.filter(cell => cell !== null);
    let newCol = [];
    let i = 0;
    let merged = Array(col.length).fill(false);
    let tempScore = 0;

    while (i < filteredCol.length) {
      if (i + 1 < filteredCol.length && filteredCol[i] === filteredCol[i + 1] && !merged[i] && !merged[i + 1]) {
        const mergedValue = filteredCol[i] * 2;
        newCol.push(filteredCol[i] * 2);
        tempScore += mergedValue;
        merged[i] = true;
        i += 2;
      } else {
        newCol.push(filteredCol[i]);
        i++;
      }
    }

    while (newCol.length < gridSize) {
      newCol.push(null);
    }
    setScore(prevScore => prevScore + tempScore);
    
    return newCol;
  };

  // shifts the colum downward
  const shiftDown = (colIndex) => {
    const col = [];
    for (let i = 0; i < gridSize; i++) {
      col.push(grid[i * gridSize + colIndex]);
    }
    let filteredCol = col.filter(cell => cell !== null).reverse();
    let newCol = [];
    let i = 0;
    let merged = Array(col.length).fill(false);
    let tempScore = 0;

    while (i < filteredCol.length) {
      if (i + 1 < filteredCol.length && filteredCol[i] === filteredCol[i + 1] && !merged[i] && !merged[i + 1]) {
        const mergedValue = filteredCol[i] * 2;
        newCol.push(filteredCol[i] * 2);
        tempScore += mergedValue;
        merged[i] = true;
        i += 2;
      } else {
        newCol.push(filteredCol[i]);
        i++;
      }
    }

    while (newCol.length < gridSize) {
      newCol.push(null);
    }
    setScore(prevScore => prevScore + tempScore);
    return newCol.reverse();
  };

  // movement of the tiles in all directions
  const moveTiles = (direction) => {
    const newGrid = [...grid];
    let moved = false;

    setHistory(prevHistory => [...prevHistory, [...grid]]);
    setScoreHistory(prevScoreHistory => [...prevScoreHistory, score]);

    if (direction === 'left') {
      for (let i = 0; i < gridSize; i++) {
        const row = newGrid.slice(i * gridSize, i * gridSize + gridSize);
        const shiftedRow = shiftRowLeft(row);
        if (JSON.stringify(row) !== JSON.stringify(shiftedRow)) moved = true;
        newGrid.splice(i * gridSize, gridSize, ...shiftedRow);
      }
    }

    if (direction === 'right') {
      for (let i = 0; i < gridSize; i++) {
        const row = newGrid.slice(i * gridSize, i * gridSize + gridSize);
        const shiftedRow = shiftRowRight(row);
        if (JSON.stringify(row) !== JSON.stringify(shiftedRow)) moved = true;
        newGrid.splice(i * gridSize, gridSize, ...shiftedRow);
      }
    }

    if (direction === 'up') {
      for (let i = 0; i < gridSize; i++) {
        const shiftedCol = shiftUp(i);
        for (let j = 0; j < gridSize; j++) {
          if (newGrid[j * gridSize + i] !== shiftedCol[j]) moved = true;
          newGrid[j * gridSize + i] = shiftedCol[j];
        }
      }
    }

    if (direction === 'down') {
      for (let i = 0; i < gridSize; i++) {
        const shiftedCol = shiftDown(i);
        for (let j = 0; j < gridSize; j++) {
          if (newGrid[j * gridSize + i] !== shiftedCol[j]) moved = true;
          newGrid[j * gridSize + i] = shiftedCol[j];
        }
      }
    }

    // generating another tile if tiles moved
      if (moved) {
        if (soundEnabled) {
          moveSound.play(); 
        }
        const emptyCells = newGrid.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
        if (emptyCells.length > 0) {
          const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          newGrid[randomIndex] = getRandomTileValue();
        }
        setGrid(newGrid); 
      }
      handleGame();
    };

    // function to undo each moves
    const undoMove = () => {
      if (history.length > 0) {
        const lastGrid = history[history.length - 1];
        const lastScore = scoreHistory[scoreHistory.length - 1];
    
        setGrid(lastGrid);
        setScore(lastScore);
    
        setHistory(history.slice(0, -1)); // Remove the last grid from history
        setScoreHistory(scoreHistory.slice(0, -1)); // Remove the last score from history
      }
    };

    // function for restarting the game
    const restartGame = () => {
      initializeTiles(); // Reinitialize the grid and reset score
    };
    

  // calling the initialize function
  useEffect(() => {
    initializeTiles();
  }, []);

  // handling the key press for moving the tiles vertically and horizontally
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStatus) return;
      switch (e.key) {
        case 'w':
          moveTiles('up');
          break;
        case 'a':
          moveTiles('left');
          break;
        case 's':
          moveTiles('down');
          break;
        case 'd':
          moveTiles('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [grid, gameStatus]);

const handlePlayAgain = () => initializeTiles();

// rendering the grid
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div 
        className="flex justify-center items-center w-full mt-36 sm:mt-12 md:mt-2"
      >
      <div
        className="grid grid-cols-4 grid-rows-4 w-[90%] max-w-[600px] p-2 gap-1 aspect-square md:w-[45%] sm:w-[60%] sm:max-w-[700px] xs:w-[60%]" 
      >
        {grid.map((value, index) => (
          <div
            key={index}
            className={`w-full h-full flex rounded-lg justify-center items-center border-2 border-rustOrange ${getTileColor(value)}`}
          >
            {value && (
            <span className="text-lg sm:text-2xl xs:text-xl xxs:text-lg font-bold">
              {value}
            </span>
              )}
            </div>
          ))}
      </div>
      {gameStatus && (
        <GameMessage
          message={gameStatus === "won" ? "You Won!" : "Game Over"}
          buttonText="Play Again"
          onButtonClick={handlePlayAgain}
        />
      )}
      </div>
      <Button onUndo={undoMove} onRestart={restartGame} onToggleSound={toggleSound} soundEnabled={soundEnabled} />
      <Score score={score} highScore={highScore} />
    </div>
  );
};

export default Grid;
