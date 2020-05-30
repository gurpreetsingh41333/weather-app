import { TYPES } from '../actions/types';

const initialState = {
  weatherInfo: {
    dayWiseList: [],
    list: [],
    city: {},
  },
  loader: false,
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
    default:
      return state;
  }
};
