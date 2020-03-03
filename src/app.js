import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line
import styled from 'styled-components/macro';
import { getWeather } from './services/dummyWeather';
import { Searchbar } from './components';
import GlobalStyle from './globals/style';
import Header from './layout/header';

const App = () => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    setWeather(w => [ ...w, getWeather() ]);
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <p>This is Thorfinn's weather service.</p>
      { weather.map(w => (
        <p key={w.location}>The weather in {w.location} is {w.weather} Celsius.</p>
      ))}

      <div css={`
        margin-top: 125px;
        display: flex;
        justify-content: center;
      `}>
        <Searchbar />
      </div>
    </Router>
  );
}

export default App;
