import moment from 'moment';

import { constants } from '../config/constants';

// daywise avg temperature
export const dayWiseAvgTemp = data => {
  const dayWiseList = [];
  for (let i = 0; i < 6; i++) {
    const day = {};
    let temp = 0;
    // filter same day list
    const dayList = data.filter(
      list =>
        moment(list.dt_txt).format(constants.DATE_FORMAT) ===
        moment(data[0].dt_txt).add(i, 'd').format(constants.DATE_FORMAT),
    );
    // same day temperature total
    dayList.forEach(list => {
      temp += list.main.temp;
    });
    day.avgTemp = (temp / dayList.length).toFixed(2);
    day.date = moment(dayList[0].dt_txt).format(constants.DATE_FORMAT);
    dayWiseList.push(day);
  }
  return dayWiseList;
};
