import axios from 'axios';

const api = axios.create({
        baseURL: 'https://tiffin-wala-backend-production.up.railway.app',
});
export default api;  