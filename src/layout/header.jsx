import React from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import PropTypes from 'prop-types';
import { bg, shadows } from '../utils';
import { Link, H2 } from '../elements';
import { Clock } from '../components';

const Header = ({ className, time }) => (
  <header className={className}>
    <Container>
      <Link to="/">
        <H2 noMargin>Thorfinn</H2>
      </Link>
      <Clock time={time} />
      <Navbar />
    </Container>
  </header>
);

Header.propTypes = {
  time: PropTypes.number
};

export default styled(Header)`
  background: ${bg};
  height: 76px;
  ${shadows[0]}
`;

const Container = styled.div`
  height: 100%;
  padding: 0 16px;
  // display: grid;
  // grid-template-columns: repeat(3, auto);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
