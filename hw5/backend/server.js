import express from 'express';
import cors from 'cors';
import guessRoute from './routes/guess.js';
import hackRoute from './routes/hack.js';

const app = express();

app.use(cors());
app.use('/api/guess', guessRoute);
app.use('/api/age', hackRoute);

const port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log(`Server is up on ${port}.`);
});