import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:6969/api/age',
    timeout: 2000
});
 
const start = async () => {
    const res = await ax.post('/start');
    return res.data;
};

const guess = async pwd => {
    const { data: { status, verdict } } = await ax.get('/guess', { params: { pwd } });
    return { status, verdict }
};

const restart = async () => {
    const res = await ax.post('/restart');
    return res.data;
};

export { start, guess, restart };