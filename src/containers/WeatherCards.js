import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import CustomPagination from '../components/CustomPagination';
import TemperatureCard from '../components/TemperatureCard';
import { setSelectedCard } from '../actions/WeatherInfo.action';
import { TYPES } from '../actions/types';

const useStyles = makeStyles(() => ({
  cardRow: {
    justifyContent: 'space-around',
    flexFlow: 'row nowrap',
  },
  cardGrid: { height: '40%', alignItems: 'center' },
}));

const WeatherCards = ({ weatherInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [mouseHover, setMouseHover] = useState(null);
  const [cardArr] = useState(weatherInfo.dayWiseList);
  const [selectedCardArr, setSelectedCardArr] = useState([]);
  const [pagination, setPagination] = useState({
    pageCount: 3,
    currentPage: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  });
  const { currentPage } = pagination;

  useEffect(() => {
    const tempArr = cardArr.slice(currentPage, currentPage + 3);
    setSelectedCardArr(tempArr);
    dispatch(setSelectedCard(TYPES.SET_SELECTED_CARD, weatherInfo?.dayWiseList[0]?.date));
  }, []);

  const gotoPage = page => {
    const paginate = {};
    if (page === 'back') {
      paginate.currentPage = currentPage - 1;
    } else {
      paginate.currentPage = currentPage + 1;
    }
    paginate.hasPreviousPage = paginate.currentPage > 0;
    paginate.hasNextPage = paginate.currentPage < (cardArr.length === 5 ? '2' : '3');
    setPagination(paginate);
    const tempArr = cardArr.slice(paginate.currentPage, paginate.currentPage + 3);
    setSelectedCardArr(tempArr);
  };

  return (
    <Grid item container xs={12} className={classes.cardGrid}>
      <Grid container>
        <CustomPagination gotoPage={gotoPage} pagination={pagination} />
        <Grid item container className={classes.cardRow}>
          {selectedCardArr.map(value => (
            <TemperatureCard key={value.avgTemp} mouseHover={mouseHover} data={value} setMouseHover={setMouseHover} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

WeatherCards.propTypes = {
  weatherInfo: PropTypes.shape({
    city: PropTypes.object,
    list: PropTypes.array,
    dayWiseList: PropTypes.array,
  }),
};

export default WeatherCards;
