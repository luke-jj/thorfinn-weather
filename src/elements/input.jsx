import styled from 'styled-components';
import { fg, fgDisabled, fontSize, fontWeight, fontFamily } from '../utils';

export const Input = styled.input`
  background: transparent;
  width: 100%;
  height: 100%;
  color: ${fg};
  font-size: ${fontSize.highlight};
  font-weight: ${fontWeight.highlight};
  font-family: ${fontFamily.base};
  border-width: 0;
  outline: none;
  text-align: center;
  ::placeholder {
    color: ${fgDisabled};
  }

  &:active {

  }
`;
