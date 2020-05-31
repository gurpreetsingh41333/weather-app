import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { constants } from '../config/constants';
import Chart from '../components/Chart';

const TemperatureBarChart = ({ weatherInfo }) => {
  const [barChartData, setBarChartData] = useState([]);
  const { selectedCard, unit } = useSelector(state => state.weather);

  // filter data selcted date data for barchart
  useEffect(() => {
    const filteredList = weatherInfo.list.filter(
      ele => moment(ele.dt_txt).format(constants.DATE_FORMAT) === selectedCard,
    );
    const unitValue = unit === constants.FAHRENHEIT ? ' \xB0F' : ' \xB0C';
    const data = [];
    filteredList.forEach(ele => {
      const tempEle = ele;
      tempEle.main.label = ele.main.temp + unitValue;
      data.push(tempEle);
    });
    setBarChartData(data);
  }, [selectedCard]);

  return <Chart barChartData={barChartData} />;
};

TemperatureBarChart.propTypes = {
  weatherInfo: PropTypes.shape({
    list: PropTypes.array,
  }),
};

export default TemperatureBarChart;
