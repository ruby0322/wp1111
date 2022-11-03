import mongoose from 'mongoose';

const ScoreCardSchema = new mongoose.Schema({
    name: {
        type: String
    },
    subject: {
        type: String
    },
    score: {
        type: Number
    }
});

export default mongoose.model('ScoreCard', ScoreCardSchema);