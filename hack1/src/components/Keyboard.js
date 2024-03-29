import './css/Keyboard.css';
import config from '../data/config.json';
import React, { useEffect, useState } from 'react';
import { IoBackspaceOutline } from 'react-icons/io5';

const Keyboard = ({ usedChars }) => {
    const [firstRowLetters, setFirstRowLetters] = useState(null);       // firstRowLetters must be a 10-character array.
    const [secondRowLetters, setSecondRowLetters] = useState(null);     // secondRowLetters must be a 9-character array.
    const [thirdRowLetters, setThirdRowLetters] = useState(null);

    useEffect(() => {
        // TODO 1-2: slice `config.letters` into three parts.
        
        setFirstRowLetters(config.letters.slice(0, 10));
        setSecondRowLetters(config.letters.slice(10, 19));
        setThirdRowLetters(config.letters.slice(19, 29));
    }, []);
    
    return (
        <div className='Keyboard-container'>
            {/* TODO 1-2: show `firstRowLetters` and `secondRowLetters` */}
            {/* TODO 5: add color to each `Keyboard-char`. */}
            
            {
                [firstRowLetters, secondRowLetters, thirdRowLetters].map(
                    (row, idx) => {
                        return (
                            <div id={`KBrow_${idx+1}`} key={`KBrow_${idx+1}`} className='Keyboard-row'>
                                {
                                    row && row.map((letter) => {
                                        const color = usedChars[letter.char]
                                        return (
                                            letter.char === 'Enter' ?
                                                <div key={'char_' + letter.char} className='Keyboard-char-enter' >{letter.char}</div>
                                                :
                                                letter.char === 'Backspace' ?
                                                    <div key={'char_' + letter.char} className='Keyboard-char-backspace'><IoBackspaceOutline /></div>
                                                    :
                                                    <div id={'char_' + letter.char} key={'char_' + letter.char} className={'Keyboard-char ' + color}>{letter.char}</div>
                                        )
                                    })
                                }
                            </div>
                        );
                    }
                )
            }
            
        </div>
    )
}

export default Keyboard;