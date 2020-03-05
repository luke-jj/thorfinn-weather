import http from './http';
import querystring from 'querystring';

const apiEndpoint = "weather";

export const getWeather = (city) => {
  const query = querystring.stringify({ city });

  return http.get(`${apiEndpoint}?${query}`);
};
