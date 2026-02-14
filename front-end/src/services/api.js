import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const register = (user) => api.post('/register', user);
export const login = (credentials) => api.post('/login', credentials);

export default api;
