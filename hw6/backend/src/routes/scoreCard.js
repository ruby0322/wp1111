import express from 'express';
import ScoreCard from '../models/ScoreCard.js';
// import mongoose from 'mongoose';

// const db = mongoose.connection;
const router = express.Router();

router.get('/', async (req, res) => {
    console.log(`Receieved GET Request:\n${req}`);
    console.log(req.query);
    const cards = await ScoreCard.find({
        name: { $regex: (req.query.name ? req.query.name : '') },
        subject: { $regex: (req.query.subject ? req.query.subject : '') }
    });
    console.log(cards);
    res.status(200).json({
        results: cards,
        message: (cards.length > 0 ? `${cards.length} Cards Found` : `No Card Found For ${req.query.type}='${req.query.queryString}'`),
    });
});

router.post('/', async (req, res) => {
    console.log(`Receieved POST Request:\n${req}`);
    console.log(req.body);

    const existing = await ScoreCard.findOne({ name: req.body.name, subject: req.body.subject });
    
    if (existing) {
        await ScoreCard.updateOne({ _id: existing._id }, { score: req.body.score });
        res.status(200).json({
            message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`,
            card: true
        });
    }
    else {
        const newScoreCard = new ScoreCard({
            name: req.body.name,
            subject: req.body.subject,
            score: req.body.score
        });
        await newScoreCard.save();
        res.status(200).json({
            message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`,
            card: true
        });
    }

});

router.delete('/', async (req, res) => {
    console.log(`Receieved DELETE Request:\n${req}`);
    console.log(req);
    await ScoreCard.deleteMany(req.body ? req.body : {});
    res.status(200).json({
        message: 'Database Cleared!'
    });
});

router.put('/', async (req, res) => {
    console.log(`Receieved PUT Request:\n${req}`);
    console.log(req);
    res.status(200).json({
        message: 'Hello world!'
    });
});

export default router;