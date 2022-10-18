import './css/HomePage.css';
import React, { useRef } from 'react';

const Panel = ({error, setError, mineNum, mineNumOnChange, boardSize, boardSizeOnChange}) => {

  const mineNumberInputRef = useRef(null);
  const boardSizeInputRef = useRef(null);

  const checkValidity = () => {
    const m = mineNumberInputRef.current.value;
    const n = boardSizeInputRef.current.value;
    if (m >= n * n)
      setError(true);
    else if (error)
      setError(false);
  };

  const mineNumberInputOnChange = () => {
    mineNumOnChange(parseInt(mineNumberInputRef.current.value));
    checkValidity();
  };

  const boardSizeInputOnChange = () => {
    boardSizeOnChange(parseInt(boardSizeInputRef.current.value));
    checkValidity();
  };

  return (
    <div className={`controlWrapper ${error ? 'c-error' : 'c-default'}`}>
      {
        error 
          ? <div className='error'>ERROR: Mines number and board size are invalid</div>
          : <></>
      }
      <div className='controlPanel'>
        <div className='controlCol'>
          Mines Number
          <input ref={mineNumberInputRef} onChange={mineNumberInputOnChange} type='range' min='1' max='100' defaultValue={mineNum} step='1' /> 
          <p className='controlNum'>
            {mineNum}
          </p>
        </div>
        <div className='controlCol'>
          Board Size (n x n)
          <input ref={boardSizeInputRef} onChange={boardSizeInputOnChange} type='range' min='1' max='20' defaultValue={boardSize} step='1' /> 
          <p className='controlNum'>
            {boardSize}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Panel;   