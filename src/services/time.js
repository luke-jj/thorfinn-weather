import http from './http'

const apiEndpoint = 'time'

export const getCurrentUtcTime = () => {
  return http.get(apiEndpoint)
}
