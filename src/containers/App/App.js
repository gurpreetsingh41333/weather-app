import React, { useState, useEffect } from 'react';
import {
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import WeatherCards from '../../components/WeatherCards';
import './App.css';
import { constants } from '../../config/constants';
import { getWeatherInfo } from '../../actions/WeatherInfo.action';
import Loader from '../../components/Loader';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

const App = () => {
  const classes = useStyles();
  const [unit, setUnit] = useState(constants.FAHRENHEIT);
  const dispatch = useDispatch();

  const { weatherInfo, loader } = useSelector(state => state.weather);

  useEffect(() => {
    (async () => {
      await dispatch(getWeatherInfo({}));
    })();
  }, []);

  const handleChange = event => {
    setUnit(event.target.value);
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container>
        <Grid
          item
          container
          xs={12}
          style={{
            height: '10%',
            border: '1px solid red',
            justifyContent: 'center',
          }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="unit"
              name="unit"
              row
              value={unit}
              onChange={handleChange}>
              <FormControlLabel
                value={constants.CELCIUS}
                control={<Radio />}
                label="Celcius"
              />
              <FormControlLabel
                value={constants.FAHRENHEIT}
                control={<Radio />}
                label="Fahrenheit"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <WeatherCards weatherInfo={weatherInfo} />
        <Grid item xs={12} style={{ height: '50%', border: '1px solid red' }}>
          grid
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
