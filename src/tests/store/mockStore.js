import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { constants } from '../../config/constants';

const initialState = {
  weather: {
    weatherInfo: {
      dayWiseList: [],
      list: [],
      city: {},
    },
    loader: false,
    unit: constants.FAHRENHEIT,
    selectedCard: '',
  },
};

const createMockStore = configureMockStore([thunk]);

export const store = createMockStore(initialState);
