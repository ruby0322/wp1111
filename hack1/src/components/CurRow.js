import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {
                    letters.map(
                        (ch, idx) => (
                            <div key={`${rowIdx}-${idx}`} id={`${rowIdx}-${idx}`} className='Row-wordbox filled'>{ch}</div>
                        )
                    )
                }
                {
                    [...Array(5 - letters.length)].map(
                        (_, idx) => <div key={`${rowIdx}-${idx+letters.length}`} id={`${rowIdx}-${idx}`} className='Row-wordbox'></div>
                    )
                }
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
