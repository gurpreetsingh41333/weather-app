import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomTooltip from './CustomTooltip';

const useStyles = makeStyles(() => ({
  grid: { height: '50%', width: '100%' },
  center: { justifyContent: 'center', alignItems: 'center' },
}));

const Chart = ({ barChartData }) => {
  const classes = useStyles();

  const { innerHeight, innerWidth, addEventListener, removeEventListener } = window;

  const [width, setWidth] = useState(innerWidth * 0.95);
  const [height, setHeight] = useState(innerHeight * 0.4);

  const updateWidthAndHeight = () => {
    setWidth(innerWidth * 0.95);
    setHeight(innerHeight * 0.4);
  };

  useEffect(() => {
    addEventListener('resize', updateWidthAndHeight);
    return () => removeEventListener('resize', updateWidthAndHeight);
  });

  return (
    <Grid item container xs={12} className={classes.grid}>
      <Grid item xs={12} container className={classes.center}>
        <BarChart data={barChartData} width={width} height={height}>
          <XAxis dataKey="main.label" axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="main.temp" barSize={50} fill="#8884d8" />
        </BarChart>
      </Grid>
    </Grid>
  );
};

Chart.propTypes = {
  barChartData: PropTypes.array,
};

export default Chart;
