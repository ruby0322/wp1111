import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
            {
                guess ?        
                    guess.map(
                        (d, idx) => (
                            d ? 
                                <div key={`${rowIdx}-${idx}`} id={`${rowIdx}-${idx}`} className={`Row-wordbox ${d.color}`}>{d.char}</div> :
                                <div key={`${rowIdx}-${idx}`} id={`${rowIdx}-${idx}`} className='Row-wordbox'></div>
                        )
                    ) :
                    [...Array(5)].map((_, idx) => <div key={`${rowIdx}-${idx}`} id={`${rowIdx}-${idx}`} className='Row-wordbox'></div>)
            }
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;