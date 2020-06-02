import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { constants } from '../config/constants';

const useStyles = makeStyles(() => ({
  alignment: { alignItems: 'center' },
  margin: { margin: '0.1em', padding: '0.1em' },
  zeroPadding: { padding: '0px' },
}));

const CustomTooltip = ({ active, payload = [], label }) => {
  const classes = useStyles();

  if (active) {
    return (
      <Card variant="outlined">
        <CardActions>
          <CardContent className={classes.zeroPadding}>
            <Grid container className={classes.alignment}>
              <Typography variant="h5" component="h2" className={classes.margin}>
                Temp:
              </Typography>
              <Typography variant="h6" component="h2" className={classes.margin} color="textSecondary">
                {label}
              </Typography>
            </Grid>
            <Grid container className={classes.alignment}>
              <Typography variant="h5" component="h2" className={classes.margin}>
                Time:
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                className={classes.margin}
                style={{ whiteSpace: 'nowrap' }}
                color="textSecondary">
                {moment(payload[0]?.payload['dt_txt']).format(constants.TIME_FORMAT)}
              </Typography>
            </Grid>
          </CardContent>
        </CardActions>
      </Card>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  payload: PropTypes.array,
};

export default CustomTooltip;
