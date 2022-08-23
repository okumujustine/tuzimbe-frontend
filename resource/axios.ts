import axios from 'axios';

export const tuzimbeApi = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
        'Content-Type': 'application/json',
    }
})