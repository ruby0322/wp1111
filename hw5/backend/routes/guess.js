import express from 'express';
import { genNumber, getNumber } from '../core/getNumber.js';

const isNumric = val => !isNaN(val) && !isNaN(parseFloat(val));

const router = express.Router();

router.post('/start', (req, res) => {
    console.log('Some User Started The Game.');
    genNumber();
    res.status(200).json({
        message: 'Number guessing game has started!'
    });
});

router.get('/guess', (req, res) => {
    console.log(`Some User Guessed ${req.query.number}.`);
    if (isNumric(req.query.number)) {
        const guess = parseInt(req.query.number);
        if (1 <= guess && guess <= 100) {
            if (guess === getNumber()) {
                res.status(200).json({
                    message: 'It was a successful guessing attempt! Good job!',
                    status: 'Correct. You Won! Great Work!',
                    verdict: 'Correct'
                });
            } else {
                if (guess > getNumber()) {
                    res.status(200).json({
                        message: 'It was an unsuccessful guessing attempt. Try Again.',
                        status: 'You Went Too High. Go Lower!',
                        verdict: 'Incorrect'
                    });
                } else {
                    res.status(200).json({
                        message: 'It was an unsuccessful guessing attempt. Try Again.',
                        status: 'You Went Too Low. Go Higher!',
                        verdict: 'Incorrect'
                    });
                }
            }
        } else {
            res.status(406).json({
                message: 'Invalid Input.',
                status: 'Number Guessed Out Of Range. Try Again!',
                verdict: 'Rejected'
            });
        }
    } else {
        res.status(406).json({
            message: 'Invalid Input.',
            status: 'That Is Not A Number. Try Again!',
            verdict: 'Rejected'
        });
    }
});

router.post('/restart', (req, res) => {
    console.log('Some User Restarted The Game.');
    genNumber();
    res.status(200).json({
        message: 'Number guessing game has restarted!'
    });
});

export default router;