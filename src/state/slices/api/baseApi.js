import axios from 'axios';
// https://shuttle-backend.onrender.com
// 'http://localhost:2020/api/v1/ictac-bot',
export default axios.create({
    baseURL: 'https://shuttle-backend.onrender.com/api/v1/ictac-bot',
});
