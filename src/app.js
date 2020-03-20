import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line
import styled from 'styled-components/macro';

import { getWeather } from './services/weather';
import { getCurrentUtcTime } from './services/time';
import { Searchbar, WeatherCard, CityButton } from './components';
import { Button } from './elements';
import GlobalStyle from './globals/style';
import Header from './layout/header';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState(0);
  const [cityInput, setCityInput] = useState('');
  const [activeCity, setActiveCity] = useState({});

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

  const handleInput = e => {
    setCityInput(e.target.value)
  };

  const handleSearch = async e => {
    e.preventDefault();
    try {
      const { data } = await getWeather(cityInput);
      setCityInput('');
      setWeather(w => [ ...w, data ]);
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

  const handleDeleteRecent = (e, { id }) => {
    if (id === activeCity.id) setActiveCity({});
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setWeather(w => w.filter(city => city.city.id !== id));
  };

  const handleSelectCity = ({ name, id }) => {
    setActiveCity({ id, name });
  };

  const getActiveCity = () => {
    return weather.find(w => w.city.id === activeCity.id);
  };

  return (
    <Router>
      <GlobalStyle />
      <ToastContainer />
      <Header time={time}/>
      <Container>
        <div css={`
          display: flex;
          margin: 30px auto 10px;
          width: 70%;
          align-items: center;
          height: 40px;
        `}>
          <Button small secondary active >Recent</Button>
          <Button small secondary disabled >Favorites</Button>
        </div>
        <div css={`
          display: flex;
          justify-content: center;
          height: 40px;
        `}>
          { weather.map(w => (
            <div key={w.city.id}>
              <CityButton
                city={w.city}
                onSelect={handleSelectCity}
                onDelete={handleDeleteRecent}
                active={activeCity.id === w.city.id}
              />
            </div>
          ))}
        </div>
        <div css={`
          margin-top: 20px;
          margin-bottom: 40px;
          display: flex;
          justify-content: center;
        `}>
          <Searchbar
            input={cityInput}
            onChange={handleInput}
            onSubmit={handleSearch}
          />
        </div>
        { activeCity.id && <WeatherCard weather={getActiveCity()} time={time}/> }
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
