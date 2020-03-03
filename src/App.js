import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getWeather } from './services/dummyWeather';
import GlobalStyle from './globals/style';
import { colors } from './utils';
import Header from './layout/header';

const App = () => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    setWeather(w => [ ...w, getWeather() ]);
  }, []);

  return (
    <Router>
      { colors() }
      <GlobalStyle />
      <Header />
      <p>This is Thorfinn's weather service.</p>
      { weather.map(w => (
        <p>The weather in {w.location} is {w.weather} Celsius.</p>
      ))}
    </Router>
  );
}

export default App;
