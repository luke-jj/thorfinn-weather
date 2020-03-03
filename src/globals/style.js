import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { bg, fg, fontFamily, fontSize, fontWeight } from '../utils';

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
    background: ${bg};
    color: ${fg};
    font-family: ${fontFamily.base};
    font-size: ${fontSize.base};
    font-weight: ${fontWeight.base};
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }

  main {
    // width: 90%;
    // margin: 0 auto;
  }

`;

export default GlobalStyle;
