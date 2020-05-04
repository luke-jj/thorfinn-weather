import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import moment from 'moment'
import { absolute, shadows, fontSize, fgDisabled } from '../utils'
import { getFullName } from '../services/countryCode'

const toUtcString = (timezone) => {
  const hours = timezone / 60 / 60
  return `UTC ` + (hours > 0 ? '+ ' + hours : '- ' + Math.abs(hours))
}

const adjustTimeZone = (timestamp) => {
  const clientTimeZoneOffset = new Date().getTimezoneOffset() * 60
  return new Date((timestamp + clientTimeZoneOffset) * 1000)
}

const getMinMaxTempForecast = (weather, day) => {
  let min = 100
  let max = -100
  for (let i = day * 8; i < day * 8 + 8; i++) {
    const minTemp = weather.list[i].main.temp_min
    const maxTemp = weather.list[i].main.temp_max
    if (minTemp < min) min = minTemp
    if (maxTemp > max) max = maxTemp
  }

  return { day, min, max }
}

const getForecast = (weather) => {
  let forecast = []
  for (let j = 0; j < 5; j++) {
    forecast.push(getMinMaxTempForecast(weather, j))
  }
  return forecast
}

const WeatherCard = ({ className, weather, time }) => {
  const forecast = getForecast(weather)
  const localTime = moment.unix(time + weather.city.timezone).utc()
  return (
    <div className={className}>
      <div
        css={`
          grid-column: 1 / 3;
        `}
      >
        <p
          css={`
            font-size: ${fontSize.heading};
          `}
        >
          {weather.city.name}
        </p>
        {getFullName(weather.city.country)}
        <p>{localTime.format('HH : mm : ss')}</p>
        <p
          css={`
            color: ${fgDisabled};
          `}
        >
          {toUtcString(weather.city.timezone)}
          <br />
          <span
            css={`
              margin-top: 100px;
            `}
          >
            {moment
              .unix(time + weather.city.timezone)
              .utc()
              .format('dddd, MMMM Do YYYY')}
          </span>
        </p>
      </div>
      <div>
        <div
          css={`
            height: 100px;
            width: 100px;
          `}
        >
          <img
            src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
            alt="weather"
          />
        </div>
        <p>{weather.list[0].weather[0].description}</p>
        <p
          css={`
            margin-bottom: 12px;
          `}
        >
          humidity: {weather.list[0].main.humidity}%
        </p>
        <p>
          <i className="fa fa-cloud" aria-hidden="true"></i>{' '}
          {weather.list[0].clouds.all}%
        </p>
        <p>
          <i className="fa fa-flag" aria-hidden="true"></i>{' '}
          {Math.round(weather.list[0].wind.speed * 3.6)} km/h
        </p>
      </div>
      <div
        css={`
          align-self: end;
        `}
      >
        <p>
          {moment(
            adjustTimeZone(weather.city.sunrise + weather.city.timezone),
          ).format('HH : mm')}
        </p>
        <p>sunrise</p>
      </div>
      <div>
        <p
          css={`
            font-size: ${fontSize.heading};
            margin: 5px 0;
          `}
        >
          {weather.list[0].main.temp}
        </p>
        <p>
          <em>feels like</em> {weather.list[0].main.feels_like}
        </p>
        <span
          css={`
            font-size: ${fontSize.heading};
            color: ${fgDisabled};
            ${absolute({ x: '72px', y: '-16px' })}
          `}
        >
          °C
        </span>
      </div>
      <div
        css={`
          align-self: end;
        `}
      >
        <p>
          {moment(
            adjustTimeZone(weather.city.sunset + weather.city.timezone),
          ).format('HH : mm')}
        </p>
        <p>sunset</p>
      </div>
      <div
        css={`
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-evenly;
          height: 100%;
          width: 100%;
        `}
      >
        {forecast.map((f) => (
          <div
            key={f.day}
            css={`
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
            `}
          >
            <div>{f.max}</div>
            <div>
              <p>{f.min}</p>
              <p>{moment(localTime).add(f.day, 'days').format('ddd')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

WeatherCard.propTypes = {
  weather: PropTypes.object.isRequired,
}

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
  transition: background-color 0.3s ease-out, box-shadow 0.3s ease-out;

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
`
