const config = {
  WEATHER_API_URL: process.env.REACT_APP_WEATHER_API_URL,
  TIME_API_URL: process.env.REACT_APP_TIME_API_URL,
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
};

export const checkConfig = () => {
  if (!config.WEATHER_API_URL) {
    throw new Error('FATAL ERROR: REACT_APP_WEATHER_API_URL must be defined.');
  }

  if (!config.TIME_API_URL) {
    throw new Error('FATAL ERROR: REACT_APP_TIME_API_URL must be defined.');
  }

  if (!config.SENTRY_DSN) {
    throw new Error('FATAL ERROR: REACT_APP_SENTRY_DSN must be defined.');
  }
};

export default config;
