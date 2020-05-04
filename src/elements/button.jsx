import styled, { css } from 'styled-components'
import {
  fg,
  fgDisabled,
  shadows,
  fontFamily,
  fontSize,
  fontWeight,
} from '../utils'

export const Button = styled.button`
  min-width: 76px;
  height: 44px;
  border-radius: 22px;
  border-width: 0px;
  color: ${fg};
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 0.15);
  font-family: ${fontFamily.base};
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.base};
  -moz-osx-font-smoothing: grayscale;
  text-size-adjust: 100%;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  outline: none;
  text-align: center;
  transition: background-color .3s ease-out, box-shadow .3s ease-out, color .1s ease-out;

  &:hover {
    background-color: rgba(255, 255, 255, .3);
    ${shadows[1]}
  }

  ${({ small }) =>
    small &&
    css`
      min-width: 76px;
      height: 26px;
      border-radius: 13px;
      padding: 5px 10px;
    `}

  ${({ active }) =>
    active &&
    css`
      background-color: rgba(255, 255, 255, 0.3);
    `}

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: rgba(0, 0, 0, 0.04);
      &:hover {
        background-color: rgba(0, 0, 0, 0.16);
      }
      ${({ active }) =>
        active &&
        css`
          background-color: rgba(0, 0, 0, 0.16);
        `}
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      color: ${fgDisabled};

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
        box-shadow: none;
      }
    `}
`
