import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"

export default function Dashboard({ remainFlagNum, gameOver }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => { 
    if (!gameOver) setTime(0);
  }, [gameOver]); 

  useEffect(() => {
    if (!gameOver) {
      let f = setTimeout(() => setTime(time + 1), 1000);
      return () => clearTimeout(f);
    }
    else setSTime(time);
  }, [time, sTime, gameOver]);
  
  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {gameOver ? sTime : time}
        </div>
      </div>
    </div>
  );
}
