import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import moment from 'moment';
import { absolute, shadows, fontSize, fgDisabled } from '../utils';
import { getFullName } from '../services/countryCode';

const toUtcString = timezone => {
  const hours = timezone / 60 / 60;
  return `UTC ` + (hours > 0 ? '+ ' + hours : '- ' + Math.abs(hours));
};

const adjustTimeZone = timestamp => {
  const clientTimeZoneOffset = new Date().getTimezoneOffset() * 60;
  return new Date((timestamp + clientTimeZoneOffset) * 1000);
};

const WeatherCard = ({ className, weather, time }) => (
  <div className={className}>
    <div css={` grid-column: 1 / 3; `}>
      <p css={`font-size: ${fontSize.heading}`}>{weather.city.name}</p>
      {getFullName(weather.city.country)}
      <p>{moment.unix(time + weather.city.timezone).utc().format("HH : mm : ss")}</p>
      <p css={`color: ${fgDisabled};`}>
        {toUtcString(weather.city.timezone)}<br />
        <span css={`margin-top: 100px;`}>{moment.unix(time + weather.city.timezone).utc().format("dddd, MMMM Do YYYY")}</span>
      </p>
    </div>
    <div>
      <div css={` height: 100px; width: 100px; `}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
          alt="weather"
        />
      </div>
      <p>{weather.list[0].weather[0].description}</p>
      <p css={`margin-bottom: 12px;`}>humidity: {weather.list[0].main.humidity}%</p>
      <p><i class="fa fa-cloud" aria-hidden="true"></i> {weather.list[0].clouds.all}%</p>
      <p>
        <i class="fa fa-flag" aria-hidden="true"></i> {' '}
        {Math.round(weather.list[0].wind.speed * 3.6)} km/h
      </p>
    </div>
    <div css={`align-self: end;`}>
      <p>{moment(adjustTimeZone(weather.city.sunrise)).format('HH : mm')}</p>
      <p>sunrise</p>
    </div>
    <div>
      <p css={` font-size: ${fontSize.heading}; margin: 5px 0;`}>
        {weather.list[0].main.temp}
      </p>
      <p><em>feels like</em> {weather.list[0].main.feels_like}</p>
      <span
        css={`
          font-size: ${fontSize.heading};
          color: ${fgDisabled};
          ${absolute({ x: '72px', y: '-16px' })}
        `}>°C</span>
    </div>
    <div css={`align-self: end;`}>
      <p>{moment(adjustTimeZone(weather.city.sunset)).format('HH : mm')}</p>
      <p>sunset</p>
    </div>
    <div></div>
    <div>forecast</div>
    <div></div>
  </div>
);

WeatherCard.propTypes = {
  weather: PropTypes.object.isRequired
};

export default styled(WeatherCard)`
  align-self: center;
  height: 500px;
  width: 360px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template: 1fr 140px 1fr / repeat(3, 1fr);
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 22px;
  transition: background-color .3s ease-out, box-shadow .3s ease-out;

  div {
    position: relative;
    text-align: center;
  }

  p {
    margin: 5px 0;
  }

  &:hover {
    ${shadows[0]}
  }
`;
