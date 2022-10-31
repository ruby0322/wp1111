import { useState, useRef, useEffect } from 'react';
import { start, guess, restart } from './axios.js'
import './App.css';
import Profile from './components/Profile';

const App = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [status, setStatus] = useState('Crack Accounts To Collect Personal Data For Profit!');
  const [profile, setProfile] = useState({});
  const [balance, setBalance] = useState(100);
  const inputRef = useRef();

  useEffect(() => {
    if (balance <= 0) {
      setHasWon(true);
    }
  }, [balance, hasWon, setHasWon]);

  const handleKeyUp = async e => {
    if (e.key === 'Enter') {
      let res;
      try {
        res = await guess(inputRef.current.value);
        setStatus(res.status);
        setBalance(balance - 10);
        if (res.verdict === 'Correct') {
          setBalance(balance + Math.floor(Math.random() * 500) + 100);
          handleStartGame();
        }
      } catch (e) {
        setStatus(e.response.data.status);
      }
      inputRef.current.value = '';
    }
  };

  const handleStartGame = async () => {
    const res = await start();
    setHasStarted(true);
    setProfile(res);
  };
  
  const handleRestartGame = async () => {
    const res = await restart();
    setProfile(res);
    setHasWon(false);
    setHasStarted(true);
    setBalance(100);
    setStatus('Crack Accounts To Collect Personal Data For Profit!')
  };

  return (
    <>
    <nav>
      <h2 id='logo'>
          {
            hasStarted ?
              `$${balance}`
              :
            'Hacker Simulator'
          }
      </h2>
    </nav>
    <div id='main'>
      {
        hasWon
          ?
          <>
            <div>
              Apparently, you are a bad hacker. Try again.  
            </div>   
            <br></br>      
            <button onClick={handleRestartGame}>Restart Game</button>
          </>
          :
        (
          hasStarted
          ? 
            <>
            <Profile profile={profile} />   
                  <br></br>
            <div className="input-group">
              <div className="input-group-icon">Hacker@Linux $ Hack</div>
              <div className="input-group-area">
                <input onKeyUp={handleKeyUp} ref={inputRef} placeholder="Hacking Attempt">
                </input>
              </div>
            </div>
            <br></br>      
            { status }      
          </>
          :
          <>
            <ul>
              <li>
                Each Valid Hacking Attempt Costs $10.
              </li>      
              <br></br>
              <li>
                Each Successful Hack Brings $100-$500 Profit.
              </li>      
              <br></br>
              <li>
                Passwords Consist Only Of Ascii Characters.
              </li>      
              <br></br>
              <li>
                  Password Hints: 'D' Stands For 'Digit'; 'N' Stands For 'Non-Digit'.
                  <br></br>
                  For Example, The Hint For 'abc123' Is 'DDDNNN'.
              </li>      
              <br></br>
              <li>
                  Hack Result: Works The Same As The Famous Game, Wordle.
              </li>      
              <br></br>
              <li>
                  You Lose If You Go Bankrupt.
              </li>      
              <br></br>
              <li>
                  Happy Hacking!
              </li>      
            </ul>
            <button onClick={handleStartGame}>Start Hacking</button>
          </>
        )
      }
      </div>
    </>
  );
}

export default App;
