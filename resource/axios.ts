import axios from 'axios';


export const tuzimbeApi = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})