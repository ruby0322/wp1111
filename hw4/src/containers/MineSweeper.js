import './MineSweeper.css';
import Board from '../components/Board'
import React, { useState } from 'react';
import HomePage from '../components/HomePage'

const MineSweeper = () => {
  const [startGame, setStartGame] = useState(false);      // A boolean variable. If true, show `Board`, else show `HomePage`.
  const [mineNum, setMineNum] = useState(10);             // A integer variable to store the number of mines in the game. The default value is 10.
  const [boardSize, setBoardSize] = useState(8);          // A integer variable to store the board size in the game. The default value is 8.
  const startGameOnClick = () => setStartGame(true);
  const mineNumOnChange = (value) => setMineNum(value);
  const boardSizeOnChange = (value) => setBoardSize(value);
  const backToHomeOnClick = () => setStartGame(false);

  return (
    <div className='mineSweeper'>
      { startGame ? <Board mineNum={mineNum} boardSize={boardSize} backToHome={backToHomeOnClick} /> : <HomePage startGameOnClick={startGameOnClick} mineNum={mineNum} mineNumOnChange={mineNumOnChange} boardSize={boardSize} boardSizeOnChange={boardSizeOnChange} /> }
    </div>
  );
}
export default MineSweeper;