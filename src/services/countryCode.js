import countryCodes from './country-names.json';

export const getFullName = (code) => {
  return countryCodes[code];
};
