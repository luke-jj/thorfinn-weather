import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    background: ${theme.colors.bg};
    color: ${theme.colors.fg};
    font-family: ${theme.fontFamilies.base};
    font-size: ${theme.fontSizes.base};
    font-weight: ${theme.fontWeights.base};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    // width: 90%;
    // margin: 0 auto;
  }

`;

export default GlobalStyle;
