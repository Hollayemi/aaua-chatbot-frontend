import axios from 'axios';
// https://shuttle-backend.onrender.com
// 'http://localhost:4040/api/v1/ictac-bot',
export default axios.create({
    baseURL: 'https://aaua-chatbot.onrender.com/api/v1/ictac-bot',
});
