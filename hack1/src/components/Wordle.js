import './css/Wordle.css';
import Board from './Board';
import Keyboard from './Keyboard';
import useWordle from './hooks/useWordle';
import React, { useEffect, useState } from 'react';

const Wordle = ({ solution }) => {
    const { turn, curGuess, guesses, isCorrect, usedChars, handleKeyup, printTest } = useWordle(solution);
    const [ result, setResult ] = useState('');
    const [ gameOver, setGameOver ] = useState(false);                      // A bool whose default is false. It will be set to turn when the game is ended. 
    const [ win, setWin ] = useState(false);                                // A bool whose default is false. It will be set to turn when the player wins the game. 
    
    useEffect(() => {
        if (gameOver) return;
        window.addEventListener('keyup', handleKeyup);
        if (isCorrect) {
            setTimeout(() => {
                setWin(true);
                setResult('You win!!!!');
                setGameOver(true);
            })
        } else if (turn > 5) {
            setTimeout(() => {
                setGameOver(true);
                setResult(`You lose!!!! The answer is ${solution}.`)
            })
        }
        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, turn, gameOver, setGameOver, setResult, result, win, setWin, solution]);

    return (
        <div className='Wordle-container'>
            <div className={`Wordle-${win ? 'win' : 'lose'} ${gameOver ? '' : 'Hidden'}`}>
                { result }
            </div>
            
            <Board turn={turn} guesses={guesses} curGuess={curGuess} />
            
            <Keyboard usedChars={usedChars} />
            
            {/* <button className='App-test-btn' onClick={printTest}>TEST</button>       */}
        </div>
    )
}

export default Wordle;