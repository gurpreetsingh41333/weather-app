import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  icon: { justifyContent: 'space-between' },
  hidden: { visibility: 'hidden' },
}));

const CustomPagination = ({ gotoPage, pagination }) => {
  const classes = useStyles();
  const { hasPreviousPage, hasNextPage } = pagination;

  return (
    <Grid item container className={classes.icon}>
      <IconButton
        id="back-btn"
        size="medium"
        className={clsx(!hasPreviousPage && classes.hidden)}
        onClick={() => gotoPage('back')}>
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        id="next-btn"
        size="medium"
        className={clsx(!hasNextPage && classes.hidden)}
        onClick={() => gotoPage('next')}>
        <ArrowForwardIcon fontSize="inherit" />
      </IconButton>
    </Grid>
  );
};

CustomPagination.propTypes = {
  gotoPage: PropTypes.func,
  pagination: PropTypes.shape({
    hasPreviousPage: PropTypes.bool,
    hasNextPage: PropTypes.bool,
  }),
};

export default CustomPagination;
