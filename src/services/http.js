import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';
import logger from './log';

const errorHandler = error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred.');
  }

  return Promise.reject(error);
};

const weatherAxios = axios.create({
  baseURL: config.WEATHER_API_URL,
});

const timeAxios = axios.create({
  baseURL: config.TIME_API_URL,
});

weatherAxios.interceptors.response.use(null, errorHandler);
timeAxios.interceptors.response.use(null, errorHandler);

function setJwt(jwt) {
  weatherAxios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  getTime: timeAxios.get,
  get: weatherAxios.get,
  post: weatherAxios.post,
  put: weatherAxios.put,
  delete: weatherAxios.delete,
  setJwt,
};
