import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tindev-react-backend.herokuapp.com/'
})

export default api;

