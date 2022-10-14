export const revealed = (board, x, y, newNonMinesCount) => {
  board[x][y].revealed = true;
  if (board[x][y].value === '💣') return { board, newNonMinesCount };
  newNonMinesCount--;
  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
  if (board[x][y].value === 0) {
    if (x+1 < board.length && board[x][y].value !== '💣' && !board[x+1][y].revealed) {
      const res = revealed(board, x+1, y, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (x-1 >= 0 && board[x][y].value !== '💣' && !board[x-1][y].revealed) {
      const res = revealed(board, x-1, y, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (y+1 < board[x].length && board[x][y].value !== '💣' && !board[x][y+1].revealed) {
      const res = revealed(board, x, y+1, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (y-1 >= 0 && board[x][y].value !== '💣' && !board[x][y-1].revealed) {
      const res = revealed(board, x, y-1, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
  }
  
  return { board, newNonMinesCount };
};
