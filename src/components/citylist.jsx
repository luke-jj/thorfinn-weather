import React from 'react'
import styled from 'styled-components/macro'
import CityButton from './citybutton'

const CityList = ({ className, activeCity, weather, onSelect, onDelete }) => (
  <div className={className}>
    {weather.map((w) => (
      <div
        key={w.city.id}
        css={`
          margin: 0 3px;
        `}
      >
        <CityButton
          city={w.city}
          onSelect={onSelect}
          onDelete={onDelete}
          active={activeCity.id === w.city.id}
        />
      </div>
    ))}
  </div>
)

export default styled(CityList)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
    display: none; /* Safari and Chrome */
  }
`
