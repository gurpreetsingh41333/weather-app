import React from 'react';
import { Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import { images } from '../../config/Images';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
  grid: {
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const ApplicationError = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.grid}>
        <img src={images.applicationErrorImage} width="175" height="200" alt="" />
        <h2 className="errorHeading">Application error</h2>
        <p className="errorDescription">
          An error occurred in the application and your page could not be served. Please try to
          refresh the page.
        </p>
      </Grid>
    </Grid>
  );
};

export default ApplicationError;
