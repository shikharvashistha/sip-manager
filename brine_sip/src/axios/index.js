import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseURL = 'http://192.168.0.104:8000';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    console.log(config);
    let token = await AsyncStorage.getItem('token');
    config.headers.Authorization = token ? `Token ${token}` : '';
    return config;
  },
  error => {
    Promise.reject(error);
  },
);
export default axiosInstance;
