import express from 'express';
import scoreCardRouter from './scoreCard.js'

const router = express.Router();

router.use('/scoreCard', scoreCardRouter);

export default router;