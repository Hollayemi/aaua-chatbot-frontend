import axios from 'axios';
// https://aaua-chatbot.onrender.com
// 'http://localhost:2020/api/v1/ictac-bot',
export default axios.create({
    baseURL: 'https://aaua-chatbot.onrender.com/api/v1/ictac-bot',
});
