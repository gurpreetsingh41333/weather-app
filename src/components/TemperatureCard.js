import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import { constants } from '../config/constants';
import { setSelectedCard } from '../actions/WeatherInfo.action';

const useStyles = makeStyles(() => ({
  alignment: { alignItems: 'center' },
  margin: { margin: '0.1em', padding: '0.1em' },
  card: { margin: '0.2em', width: '33%' },
  boxShadow: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  selectedBox: { boxShadow: '2px 5px 3px rgb(117, 178, 238)' },
  zeroPadding: { padding: 0 },
  noWrap: { whiteSpace: 'nowrap' },
}));

const TemperatureCard = ({ mouseHover, data, setMouseHover }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { unit, selectedCard } = useSelector(state => state.weather);
  const unitValue = unit === constants.FAHRENHEIT ? 'F' : 'C';

  return (
    <Grid
      item
      className={clsx(classes.card, {
        [classes.boxShadow]: mouseHover === data.date,
        [classes.selectedBox]: selectedCard === data.date,
      })}
      onMouseEnter={() => setMouseHover(data.date)}
      onMouseLeave={() => setMouseHover(null)}
      onClick={() => dispatch(setSelectedCard(data.date))}>
      <Card variant="outlined">
        <CardActions>
          <CardContent className={classes.zeroPadding}>
            <Grid container className={classes.alignment}>
              <Typography variant="h5" component="h2" className={classes.margin}>
                Temp:
              </Typography>
              <Typography variant="h6" component="h2" className={classes.margin} color="textSecondary">
                {data.avgTemp} &deg;{unitValue}
              </Typography>
            </Grid>
            <Grid container className={classes.alignment}>
              <Typography variant="h5" component="h2" className={classes.margin}>
                Date:
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                className={clsx(classes.margin, classes.noWrap)}
                color="textSecondary">
                {data.date}
              </Typography>
            </Grid>
            <Grid container className={classes.alignment}>
              <Typography variant="h5" component="h2" className={classes.margin}>
                ...
              </Typography>
            </Grid>
          </CardContent>
        </CardActions>
      </Card>
    </Grid>
  );
};

TemperatureCard.propTypes = {
  mouseHover: PropTypes.string,
  data: PropTypes.shape({
    avgTemp: PropTypes.string,
    date: PropTypes.string,
  }),
  setMouseHover: PropTypes.func,
};

export default TemperatureCard;
