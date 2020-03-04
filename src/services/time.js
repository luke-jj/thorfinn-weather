import http from './http';

const apiEndpoint = "json/utc/now";

export const getCurrentFileTime = () => {
  return http.getTime(apiEndpoint);
};
