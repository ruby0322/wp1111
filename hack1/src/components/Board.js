import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {
                guesses.map(
                    (guess, idx) => (
                        idx === turn ?
                        <CurRow key={`row_${idx}`} rowIdx={idx} curGuess={curGuess} /> :
                        <Row key={`row_${idx}`} rowIdx={idx} guess={guess} />
                    )
                )
            }
        </div>
    )
};
export default Board;
