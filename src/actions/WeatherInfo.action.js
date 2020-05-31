import { API_BASE_URL, END_POINTS, APP_ID } from '../config/APIURI';
import ApiCall from '../middleware/ApiCall';
import { TYPES } from './types';
import { dayWiseAvgTemp } from '../utils/utils';

const setWeatherInfo = (type, payload) => ({ type, payload });

const setLoader = (type, payload) => ({ type, payload });

export const setUnit = (type, payload) => ({ type, payload });

export const setSelectedCard = (type, payload = '') => ({ type, payload });

// fetch the weather info for 5 days & every 3 hours
export const getWeatherInfo = ({ location = 'Munich,de', units }) => async dispatch => {
  dispatch(setLoader(TYPES.LOADER, true));
  const config = {
    url:
      API_BASE_URL +
      END_POINTS.GET_WEATHER_INFO.replace('{LOCATION}', location).replace('{APP_ID}', APP_ID).replace('{UNITS}', units),
  };
  try {
    const weatherInfoResponse = await ApiCall.getCall(config);
    if (weatherInfoResponse?.data && weatherInfoResponse?.status === 200) {
      weatherInfoResponse.data.dayWiseList = dayWiseAvgTemp(weatherInfoResponse.data.list);
      await dispatch(setWeatherInfo(TYPES.WEATHER_INFO, weatherInfoResponse.data));
    } else {
      await dispatch(setWeatherInfo(TYPES.WEATHER_INFO, {}));
    }
    dispatch(setLoader(TYPES.LOADER, false));
    return weatherInfoResponse;
  } catch (error) {
    dispatch(setLoader(TYPES.LOADER, false));
    return error;
  }
};
