/****************************************************************************
  FileName      [ Cell.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates a single cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Cell.css"
import React from "react";

// Nothing to do with this file.
// The input 'detail' of Cell is one single cell which have properties of x, y, value, flagged and revealed.
export default function Cell({ rowIdx, colIdx, detail, updateFlag, revealCell }) {
  const cellStyle = {
    background: detail.revealed ?
      detail.value === '💣' ? '#880000' : mineCheckPattern(detail.x, detail.y) : checkPattern(detail.x, detail.y),
    color: numColorCode(detail.value),
    border: detail.revealed ? "2px inset darkgrey" : "2px outset white",
  };
  const ID = rowIdx.toString() + '-' + colIdx.toString();
  return (
      <div
        id={ID}
        className='cell'
        style={cellStyle}
        onClick={() => revealCell(detail.x, detail.y)}
        onContextMenu={e => updateFlag(e, detail.x, detail.y)}
      >
        {!detail.revealed && detail.flagged ? '🚩' : detail.revealed && detail.value !== 0 ? (detail.value === '💣' ? '💣' : detail.value) : ''}
      </div>

  );
}

const mineCheckPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) return '#c0c0c0';
    else if (x % 2 === 0 && y % 2 !== 0) return '#bbbbbb';
    else if (x % 2 !== 0 && y % 2 === 0) return '#bbbbbb';
    else return '#c0c0c0';
}

const checkPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) return '#dddddd';
    else if (x % 2 === 0 && y % 2 !== 0) return '#d0d0d0';
    else if (x % 2 !== 0 && y % 2 === 0) return '#d0d0d0';
    else return '#dddddd';
}

const numColorCode = (num) => {
  return [undefined, '#0307de', '#15760f', '#dc1410', '#02087e', '#630501', '#ec596c', '#edf451', '#56dddc'][num];
}
