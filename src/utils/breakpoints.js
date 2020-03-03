import { css } from 'styled-components';
import theme from '../globals/theme';

export const above = Object.keys(theme.breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.breakpoints[label]}px) {
      ${css(...args)}
    }
  `
  return acc;
}, {});

export const below = Object.keys(theme.breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${theme.breakpoints[label]}px) {
      ${css(...args)}
    }
  `
  return acc;
}, {});
