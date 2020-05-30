import moment from 'moment';

import { constants } from '../config/constants';

// daywise avg temperature
export const dayWiseAvgTemp = data => {
  const dayWiseList = [];
  for (let i = 0; i < 5; i++) {
    const day = {};
    let temp = 0;
    for (let j = i * 8; j < (i + 1) * 8; j++) {
      temp += data[j].main.temp;
    }
    day.avgTemp = (temp / 8).toFixed(2);
    day.date = moment(data[i * 8].dt_txt).format(constants.DATE_FORMAT);
    dayWiseList.push(day);
  }
  return dayWiseList;
};
