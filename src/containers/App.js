import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import WeatherCards from './WeatherCards';
import { constants } from '../config/constants';
import { getWeatherInfo, setUnit } from '../actions/WeatherInfo.action';
import Loader from '../components/Loader';
import UnitSelector from '../components/UnitSelector';
import TemperatureBarChart from './TemperatureBarChart';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [location, setLocation] = useState({ latitude: '48.1374', longitude: '11.5755' });

  const { weatherInfo, loader, unit } = useSelector(state => state.weather);

  const getWeather = async (location, units) => {
    await dispatch(getWeatherInfo({ location, units }));
  };

  useEffect(() => {
    const success = position => {
      const { latitude, longitude } = position.coords;
      const location = { latitude, longitude };
      setLocation(location);
      getWeather(location, constants.FAHRENHEIT);
    };

    const error = () => {
      // get weather info with default Munich, Germany location
      getWeather(location, constants.FAHRENHEIT);
    };

    (async () => {
      if (!navigator.geolocation) {
        error();
      } else {
        await navigator.geolocation.getCurrentPosition(success, error);
      }
    })();
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    dispatch(setUnit(value));
    getWeather(location, value);
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container>
        <UnitSelector handleChange={handleChange} unit={unit} />
        <WeatherCards weatherInfo={weatherInfo} />
        <TemperatureBarChart weatherInfo={weatherInfo} />
      </Grid>
    </Grid>
  );
};

export default App;
