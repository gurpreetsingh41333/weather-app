import { weather } from '../../reducers/WeatherInfo.reducer';
import { constants } from '../../config/constants';
import { TYPES } from '../../actions/types';
import data from '../testData.json';

test('should setup default weather reducer values to state', () => {
  const state = weather(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    weatherInfo: {
      dayWiseList: [],
      list: [],
      city: {},
    },
    loader: false,
    unit: constants.FAHRENHEIT,
    selectedCard: '',
  });
});

test('should set weather info to state', () => {
  const action = {
    type: TYPES.WEATHER_INFO,
    payload: data,
  };
  const state = weather(undefined, action);
  expect(state.weatherInfo).toEqual(
    expect.objectContaining({
      list: expect.any(Array),
      city: expect.any(Object),
    }),
  );
});

test('should set loader value to state', () => {
  const action = {
    type: TYPES.LOADER,
    payload: true,
  };
  const state = weather(undefined, action);
  expect(state.loader).toBe(true);
});

test('should set temperatue unit to state', () => {
  const action = {
    type: TYPES.SET_UNIT,
    payload: constants.FAHRENHEIT,
  };
  const state = weather(undefined, action);
  expect(state.unit).toBe(constants.FAHRENHEIT);
});

test('should set selected card to state', () => {
  const action = {
    type: TYPES.SET_SELECTED_CARD,
    payload: '03 Jun 20',
  };
  const state = weather(undefined, action);
  expect(state.selectedCard).toBe('03 Jun 20');
});
