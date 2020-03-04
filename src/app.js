import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line
import styled from 'styled-components/macro';
import moment from 'moment';

import { getWeather } from './services/dummyWeather';
import { getFullName } from './services/countryCode';
import { getCurrentUtcTime } from './services/time';
import { Searchbar } from './components';
import GlobalStyle from './globals/style';
import Header from './layout/header';

const adjustTimeZone = timestamp => {
  const clientTimeZoneOffset = new Date().getTimezoneOffset() * 60;
  return new Date((timestamp + clientTimeZoneOffset) * 1000);
};

const toUtcString = timezone => {
  const hours = timezone / 60 / 60;
  return `UTC ` + (hours > 0 ? '+ ' + hours : '- ' + Math.abs(hours));
};

const App = () => {
  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const loadUtcTime = async () => {
      const { data: time } = await getCurrentUtcTime()
      setTime(time.currentUnixTime);
    };

    loadUtcTime();

    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    setWeather(w => [ ...w, getWeather() ]);
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Header time={time}/>
      <div css={`
        margin-top: 100px;
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
      `}>
        <Searchbar />
      </div>
      { weather.map(w => (
        <div key={w.city.id}>
          <h2>w.city</h2>
          <ul>
            <li>.name: {w.city.name}</li>
            <li>.country name: {w.city.country} - {getFullName(w.city.country)}</li>
            <li>Sunrise: {moment(adjustTimeZone(w.city.sunrise)).format()}</li>
            <li>Sunset: {moment(adjustTimeZone(w.city.sunset)).format()}</li>
            <li>.timezone {w.city.timezone}</li>
            <li>.timezone toUtcString: {toUtcString(w.city.timezone)} </li>
            <li>time in {w.city.name}: {moment.unix(time + w.city.timezone).utc().format("HH : mm : ss")}</li>

          </ul>
          <h2>w.list[0]</h2>
          <ul>
            <li>dt: {moment(adjustTimeZone(w.list[0].dt)).format()}</li>
            <li>dt_txt: {w.list[0].dt_txt}</li>
            <li>main.temp: {w.list[0].main.temp}</li>
            <li>main.feels_like: {w.list[0].main.feels_like}</li>
            <li>main.humidity: {w.list[0].main.humidity}%</li>
            <li>clouds.all: {w.list[0].clouds.all}%</li>
            <li>wind.speed: {w.list[0].wind.speed}</li>
            <li>wind.degree: {w.list[0].wind.deg}</li>
            <li>weather.id: {w.list[0].weather[0].id}</li>
            <li>weather.main: {w.list[0].weather[0].main}</li>
            <li>weather.description: {w.list[0].weather[0].description}</li>
            <li>weather.icon: {w.list[0].weather[0].icon}</li>
            <li>
              weather.icon image:
              <img src={`https://openweathermap.org/img/wn/${w.list[0].weather[0].icon}@2x.png`} alt="weather"/>
            </li>
          </ul>
        </div>
      ))}
    </Router>
  );
}

export default App;
