import styled from 'styled-components'
import { fontSize, fontWeight } from '../utils'

export const H2 = styled.h2`
  ${({ noMargin }) => noMargin && 'margin: 0;'}
  font-size: ${fontSize.heading};
  font-weight: ${fontWeight.highlight};
`
