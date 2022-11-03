import express from 'express';
import cors from 'cors';
import db from './db.js';
import apiRouter from './routes/index.js';

db.connect();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Express app listening on port ${port}.`);
});