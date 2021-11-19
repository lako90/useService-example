import axios from 'axios';

const mainAxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export default mainAxiosInstance;
