import styled from 'styled-components';
import theme from '../globals/theme';
import { fontsizeHeading } from '../utils';

export const H2 = styled.h2`
  ${({ noMargin }) => noMargin && 'margin: 0;'}
  font-size: ${fontsizeHeading};
  font-weight: ${theme.fontWeights.highlight};
`;
