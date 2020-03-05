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

axios.defaults.baseURL = config.API_URL;
axios.interceptors.response.use(null, errorHandler);

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
