import React from 'react';
import styled from 'styled-components/macro';
import { fontSize, fgDisabled } from '../utils';

const Navbar = ({ className }) => (
  <nav className={className}>
    <ul>
      <li>
        <i className="fa fa-user"></i>
      </li>
    </ul>
  </nav>
);

export default styled(Navbar)`
  justify-self: end;
  font-size: ${fontSize.lead};

  ul {
    padding: 0 0 0 10px;
    margin: 0;
    list-style-type: none;

    li {
        font-size: 26px;
        color: ${fgDisabled};
    }
  }
`;
