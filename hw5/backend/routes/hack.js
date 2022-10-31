import express from 'express';
import { genProfile, getProfile, getPassword } from '../core/getProfile.js';

const router = express.Router();

router.post('/start', async (req, res) => {
    console.log('Some User Started The Age Guessing Game.');
    await genProfile();
    console.log(`The correct password is ${getPassword()}`);
    res.status(200).json(getProfile());
});

router.get('/guess', (req, res) => {
    console.log(`Some User Guessed ${req.query.pwd}.`);
    const pwd = req.query.pwd;
    if (pwd.length === getPassword().length) {
        if (pwd === getPassword()) {
            res.status(200).json({
                message: 'It was a successful guessing attempt! Good job!',
                status: 'Permission Granted! You Sold The Data.',
                verdict: 'Correct'
            });
        } else {
            let result = '';
            let chrs = [...getPassword()];
            console.log(chrs);
            for (let i = 0; i < pwd.length; ++i)
                if (pwd[i] === getPassword()[i])
                    chrs.splice(chrs.indexOf(pwd[i]), 1);
            for (let i = 0; i < pwd.length; ++i) {
                if (pwd[i] === getPassword()[i])
                    result += 'G';
                else {
                    let idx = chrs.indexOf(pwd[i]);
                    if (idx > -1) {
                        result += 'Y';
                        chrs.splice(idx, 1);
                    }
                    else 
                        result += '*';
                }
            }
            res.status(200).json({
                message: 'It was an unsuccessful guessing attempt. Try Again!',
                status: `Permission Denied. The result of ${pwd} is ${result}.`,
                verdict: 'Incorrect'
            });
        }
    } else {
        res.status(406).json({
            message: 'Invalud Input.',
            status: `Invalid Hacking Attempt. The Password Has Length Of ${getPassword().length}!`,
            verdict: 'Invalid'
        });
    }
});

router.post('/restart', async (req, res) => {
    console.log('Some User Restarted The Game.');
    await genProfile();
    console.log(`The correct password is ${getPassword()}`);
    res.status(200).json(getProfile());
});


export default router;