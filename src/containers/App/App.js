import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import WeatherCards from '../WeatherCards';
import './App.css';
import { constants } from '../../config/constants';
import { getWeatherInfo, setUnit } from '../../actions/WeatherInfo.action';
import Loader from '../../components/Loader';
import { TYPES } from '../../actions/types';
import UnitSelector from '../../components/UnitSelector';
import TemperatureBarChart from '../TemperatureBarChart';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { weatherInfo, loader, unit } = useSelector(state => state.weather);

  const getWeather = async units => {
    await dispatch(getWeatherInfo({ units }));
  };

  useEffect(() => {
    getWeather(constants.FAHRENHEIT);
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    dispatch(setUnit(TYPES.SET_UNIT, value));
    getWeather(value);
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
