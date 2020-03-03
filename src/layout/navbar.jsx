import React from 'react';
import styled from 'styled-components';

const Navbar = ({ className }) => (
  <nav className={className}>
    <ul>
      <li>User</li>
    </ul>
  </nav>
);

export default styled(Navbar)`
  ul {
    padding: 0 0 0 10px;
    margin: 0;
    list-style-type: none;

    li {
    }
  }
`;
