const DIRECTIONS = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];

export const revealed = (board, x, y, newNonMinesCount) => {
  board[x][y].revealed = true;
  if (board[x][y].value === '💣') return { board, newNonMinesCount };
  newNonMinesCount--;
  if (board[x][y].value === 0) {
    /* DFS */
    DIRECTIONS.map(
      ([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (0 <= newX && newX < board.length && 0 <= newY && newY < board.length && !board[newX][newY].revealed) {
          const res = revealed(board, newX, newY, newNonMinesCount);
          board = res.board;
          newNonMinesCount = res.newNonMinesCount;
        }
        return undefined;
      }
    );
  }
  return { board, newNonMinesCount };
};
