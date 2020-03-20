import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line
import styled from 'styled-components/macro';
import _ from 'lodash';

import { getWeather } from './services/weather';
import { getCurrentUtcTime } from './services/time';
import { Searchbar, WeatherCard, TabBar, CityList } from './components';
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
      setWeather(weather => {
        const weatherArray = _.cloneDeep(weather);
        const index = weatherArray.findIndex(w => w.city.id === data.city.id);
        if (index === -1) {
          weatherArray.push(data);
        } else {
          weatherArray.splice(index, 1, data);
        }

        return weatherArray;
      });

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
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (id === activeCity.id) {
      const index = weather.findIndex(city => city.city.id === id);

      if (weather.length === 1) {
        setActiveCity({});
      } else if (weather.length === index+1) {
        setActiveCity({
          id: weather[index-1].city.id,
          name: weather[index-1].city.name
        });
      } else {
        setActiveCity({
          id: weather[index+1].city.id,
          name: weather[index+1].city.name
        });
      }
    }

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
        <TabBar />
        <CityList
          weather={weather}
          onSelect={handleSelectCity}
          onDelete={handleDeleteRecent}
          activeCity={activeCity}
        />
        <div css={`
          margin-top: 40px;
          margin-bottom: 20px;
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
