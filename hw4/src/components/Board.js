import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Board = ({ boardSize, mineNum, backToHome }) => {
	const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
	const [nonMineCount, setNonMineCount] = useState(boardSize*boardSize-mineNum);        // An integer variable to store the number of cells whose value are not '💣'.
	const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
	const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
	const [remainFlagNum, setRemainFlagNum] = useState(mineNum);      // An integer variable to store the number of remain flags.
	const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

	const freshBoard = () => {
		const newBoard = createBoard(boardSize, mineNum);
		// Basic TODO: Use `newBoard` created above to set the `Board`.
		// Hint: Read the definition of those Hook useState functions and make good use of them.
		setBoard(newBoard.board);
		setMineLocations(newBoard.mineLocations);
	};

	useEffect(() => {
		freshBoard();
	}, []);

	// Creating a board

	const restartGame = () => {
		freshBoard();
		setGameOver(false);
		setRemainFlagNum(mineNum);
		setNonMineCount(boardSize * boardSize - mineNum);
		setWin(false);
	};

	const updateFlag = (e, x, y) => {
		e.preventDefault();
		if (board[x][y].revealed) return;
		if (remainFlagNum === 0 && !board[x][y].flagged) return;
		let newBoard = JSON.parse(JSON.stringify(board)); 
		newBoard[x][y].flagged = !newBoard[x][y].flagged;
		setBoard(newBoard);
		setRemainFlagNum(newBoard[x][y].flagged ? remainFlagNum - 1 : remainFlagNum + 1);
	};

	const revealCell = (x, y) => {
		if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
		let newBoard = JSON.parse(JSON.stringify(board));
		const res = revealed(newBoard, x, y, nonMineCount);
		console.log(res.newNonMinesCount);
		setBoard(res.board);
		setNonMineCount(res.newNonMinesCount);
		if (board[x][y].value === '💣') {
			setGameOver(true);
			revealMines();
		}
	};

	const revealMines = () => {
		console.log(mineLocations);
		let newBoard = JSON.parse(JSON.stringify(board));
		mineLocations.map(
			(loc) => {
				const res = revealed(newBoard, loc[0], loc[1], nonMineCount);
				newBoard = res.board;
				return undefined;
			}
		);
		setBoard(newBoard);
	};

	useEffect(() => { 
		if (nonMineCount === 0) {
			setGameOver(true); setWin(true);
			revealMines();
		}
	}, [nonMineCount]);

	return (
		<div className='boardPage' >
			{ gameOver ? <Modal restartGame={restartGame} backToHome={backToHome} win={win} /> : <></> }
			<div className='boardWrapper' >
				<div className='boardContainer'>
					<Dashboard gameOver={gameOver} remainFlagNum={remainFlagNum} />
					{
						board.map(
							(row, r) => (
								<div key={`${r}`} id={`row${r}`} style={{ display: 'flex' }}>
									{
										row.map(
											(detail, c) => (
												<Cell key={uuidv4()} detail={detail} rowIdx={r} colIdx={c} revealCell={revealCell} updateFlag={updateFlag} />
											) 
										)
									}
								</div>
							)
						)
					}
				</div>
			</div>
		</div>
	);
}

export default Board