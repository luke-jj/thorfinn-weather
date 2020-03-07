import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line
import styled from 'styled-components/macro';
import moment from 'moment';

import { getWeather as getFakeWeather } from './services/dummyWeather';
import { getWeather } from './services/weather';
import { getFullName } from './services/countryCode';
import { getCurrentUtcTime } from './services/time';
import { Searchbar } from './components';
import GlobalStyle from './globals/style';
import Header from './layout/header';
import WeatherCard from './components/weathercard';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState(0);
  const [cityInput, setCityInput] = useState('');
  const [activeCity, setActiveCity] = useState(null);

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
    setWeather(w => {
      return [ ...w, getFakeWeather() ]
    });
  }, []);

  const handleInput = e => {
    setCityInput(e.target.value)
  };

  const handleSearch = async e => {
    e.preventDefault();
    try {
      const { data } = await getWeather(cityInput);
      setCityInput('');
      setWeather(w => [ data ]);
      setActiveCity({ id: data.city.id, name: data.city.name });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data);
      } else if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      } else {
        toast.error('Something went wrong fetching the weather.');
      }
    }
  };

  return (
    <Router>
      <GlobalStyle />
      <ToastContainer />
      <Header time={time}/>
      <Container>
        <div css={`
          margin-top: 100px;
          margin-bottom: 50px;
          display: flex;
          justify-content: center;
        `}>
          <Searchbar
            input={cityInput}
            onChange={handleInput}
            onSubmit={handleSearch}
          />
        </div>
        { activeCity && <WeatherCard weather={weather[0]} time={time}/> }
      </Container>
    </Router>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 22px;
`;

export default App;
