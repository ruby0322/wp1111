import axios from 'axios';

const ax = axios.create({
  baseURL: `http://localhost:4000/api/scoreCard`,
  timeout: 2000
});

export default ax;