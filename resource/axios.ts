import axios from 'axios';

export const tuzimbeApi = axios.create({
    baseURL: 'https://tuzimbe.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
    }
})