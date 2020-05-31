import React from 'react';
import PropTypes from 'prop-types';
import { Grid, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { constants } from '../config/constants';

const useStyles = makeStyles(() => ({
  grid: {
    height: '10%',
    justifyContent: 'center',
  },
}));

const UnitSelector = ({ unit, handleChange }) => {
  const classes = useStyles();

  return (
    <Grid item container xs={12} className={classes.grid}>
      <FormControl component="fieldset">
        <RadioGroup aria-label="unit" name="unit" row value={unit} onChange={handleChange}>
          <FormControlLabel value={constants.CELCIUS} control={<Radio />} label="Celcius" />
          <FormControlLabel value={constants.FAHRENHEIT} control={<Radio />} label="Fahrenheit" />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

UnitSelector.propTypes = {
  unit: PropTypes.string,
  handleChange: PropTypes.func,
};

export default UnitSelector;
