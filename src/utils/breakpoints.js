import { css } from 'styled-components';

const breakpoints = {
  small: 400,
  med: 960,
  large: 1140
};

export const above = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `
  return acc;
}, {});

export const below = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `
  return acc;
}, {});
