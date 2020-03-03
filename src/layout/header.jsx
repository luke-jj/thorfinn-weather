import React from 'react';
import styled from 'styled-components';
import { bg, shadows } from '../utils';
import { H2 } from '../elements';

const Header = ({ className }) => (
  <header className={className}>
    <Container>
      <H2 noMargin>Thorfinn Weather App</H2>
    </Container>
  </header>
);

export default styled(Header)`
  background: ${bg};
  height: 50px;
  ${shadows[0]}
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
