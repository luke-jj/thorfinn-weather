import React from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import { bg, shadows } from '../utils';
import { Link, H2 } from '../elements';

const Header = ({ className }) => (
  <header className={className}>
    <Container>
      <Link to="/">
        <H2 noMargin>Thorfinn</H2>
      </Link>
      <Navbar />
    </Container>
  </header>
);

export default styled(Header)`
  background: ${bg};
  height: 76px;
  ${shadows[0]}
`;

const Container = styled.div`
  height: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
