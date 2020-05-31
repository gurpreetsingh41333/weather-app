import { TYPES } from '../actions/types';
import { constants } from '../config/constants';

const initialState = {
  weatherInfo: {
    dayWiseList: [],
    list: [],
    city: {},
  },
  loader: false,
  unit: constants.FAHRENHEIT,
  selectedCard: '',
};

export const weather = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.WEATHER_INFO:
      return {
        ...state,
        weatherInfo: action.payload,
      };
    case TYPES.LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case TYPES.SET_UNIT:
      return {
        ...state,
        unit: action.payload,
      };
    case TYPES.SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: action.payload,
      };
    default:
      return state;
  }
};
