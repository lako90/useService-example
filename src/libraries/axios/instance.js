import axios from 'axios';

const authAxiosInstance = axios.create({
  baseURL: 'https://httpbin.org',
});

const mainAxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export { authAxiosInstance, mainAxiosInstance };
