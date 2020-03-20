import React from 'react';
import { Button } from '../elements';

const CityButton = ({ city, onSelect, onDelete, active }) => (
  <Button onClick={() => onSelect(city)} active={active}>
    {city.name}
    {' '}
    <span onClick={(e) => onDelete(e, city)}>
      <i className="fa fa-times" aria-hidden="true"></i>
    </span>
  </Button>
);

export default CityButton;
