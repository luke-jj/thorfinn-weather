import React from 'react';
import moment from 'moment';

const Clock = ({ time }) => (
  <div>
    utc {moment.unix(time).utc().format("hh : mm : ss")}
    <br />
    {time}
  </div>
);

export default Clock;
