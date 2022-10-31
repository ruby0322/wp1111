import axios from 'axios';

let profile;

const ax = axios.create({
    baseURL: 'https://randomuser.me/api',
    timeout: 2000
});

const getProfile = () => profile;
const getPassword = () => profile.login.password;
const genProfile = async () => {
    profile = await ax.get('/');
    profile = profile.data.results[0];
    console.log(profile);
};

export { getProfile, getPassword, genProfile };