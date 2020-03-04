import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { fgDisabled, fontSize } from '../utils';

const Clock = ({ time, className }) => (
  <div className={className}>
    UTC Time
    <br />
    {moment.unix(time).utc().format("HH : mm : ss")}
    <br />
    {time}
  </div>
);

Clock.propTypes = {
  time: PropTypes.number.isRequired
};

export default styled(Clock)`
  justify-self: center;
  color: ${fgDisabled};
  font-size: ${fontSize.lead};
  text-align: center;
`;
