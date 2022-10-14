import './css/HomePage.css';
import React, { useState } from 'react';
import Panel from './Panel'

const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize}) => {
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.

  const difficultyAdjustmentOnClick = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      <button className='btn' onClick={error ? undefined : startGameOnClick}>
        Start Game
      </button>
      <div className='controlContainer'>
        <button className='btn' onClick={difficultyAdjustmentOnClick}>
          Difficulty Adjustment
        </button>
        {
          showPanel
            ? <Panel error={error} setError={setError} mineNum={mineNum} mineNumOnChange={mineNumOnChange} boardSize={boardSize} boardSizeOnChange={boardSizeOnChange} />
            : <></>
        }
      </div>
    </div>
  );

}
export default HomePage;   