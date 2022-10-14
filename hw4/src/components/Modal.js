import { useEffect } from 'react';
import './css/Modal.css'

export default function Modal({ restartGame, backToHome, win }) {
  useEffect(() => { 
    console.log(win);
  }, [win]);
  return (
    <div className='modal'>
      <div className='modalWrapper'>
      </div>
      <div className='modalContent'>
        <div className='modalResult'>
          { win ? 'Win' : 'Game Over'}
        </div>
        <div className='modalBtnWrapper'>
          <div className='modalBtn' onClick={restartGame}>
            Try Again
          </div>
          <div className='modalBtn' onClick={backToHome}>
            Back To Home
          </div>
        </div>
      </div>
      <div className='modalWrapper'>
      </div>
    </div>        
  );
}