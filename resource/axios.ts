import axios from 'axios';

export const tuzimbeApi = axios.create({
    baseURL: 'https://reqres.in/api/444/tyhg',
    headers: {
        'Content-Type': 'application/json',
    }
})