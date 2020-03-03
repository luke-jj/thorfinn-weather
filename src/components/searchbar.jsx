import React from 'react';
import styled from 'styled-components';
import { Input } from '../elements';
import { shadows } from '../utils';

const Searchbar = ({ className }) => (
  <div className={className}>
    <Input type="text" placeholder="city name..."/>
  </div>
);

export default styled(Searchbar)`
  width: 300px;
  height: 56px;
  border-radius: 30px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, .15);
  text-align: center;
  transition: background-color .3s ease-out;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, .3);
    ${shadows[1]}
  }
`;
