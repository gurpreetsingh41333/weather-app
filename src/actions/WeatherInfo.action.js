import { API_BASE_URL, END_POINTS, APP_ID } from '../config/APIURI';
import ApiCall from '../middleware/ApiCall';
import { TYPES } from './types';
import { dayWiseAvgTemp } from '../utils/utils';
import { constants } from '../config/constants';

export const setWeatherInfo = (payload = {}) => ({ type: TYPES.WEATHER_INFO, payload });

export const setLoader = (payload = false) => ({ type: TYPES.LOADER, payload });

export const setUnit = (payload = constants.FAHRENHEIT) => ({ type: TYPES.SET_UNIT, payload });

export const setSelectedCard = (payload = '') => ({ type: TYPES.SET_SELECTED_CARD, payload });

// fetch the weather info for 5 days & every 3 hours
export const getWeatherInfo = ({
  location = { latitude: '48.1374', longitude: '11.5755' },
  units = constants.FAHRENHEIT,
}) => async dispatch => {
  dispatch(setLoader(true));
  const config = {
    url:
      API_BASE_URL +
      END_POINTS.GET_WEATHER_INFO.replace('{lat}', location.latitude)
        .replace('{lon}', location.longitude)
        .replace('{APP_ID}', APP_ID)
        .replace('{UNITS}', units),
  };
  try {
    const weatherInfoResponse = await ApiCall.getCall(config);
    if (weatherInfoResponse?.data && weatherInfoResponse?.status === 200) {
      weatherInfoResponse.data.dayWiseList = dayWiseAvgTemp(weatherInfoResponse.data.list);
      await dispatch(setWeatherInfo(weatherInfoResponse.data));
    } else {
      await dispatch(setWeatherInfo({}));
    }
    dispatch(setLoader(false));
    return weatherInfoResponse;
  } catch (error) {
    dispatch(setLoader(false));
    return error;
  }
};
