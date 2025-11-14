import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export async function loginUser(username, password) {
    const res = await api.post('/auth/login', { username, password });
    console.log(username, password)
    return res.data;
}
