import 'regenerator-runtime/runtime';

import { setWeatherInfo, setLoader, setUnit, setSelectedCard } from '../../actions/WeatherInfo.action';
import { TYPES } from '../../actions/types';
import { constants } from '../../config/constants';

test('should setup weather info action object', () => {
  const action = setWeatherInfo({});
  expect(action).toEqual({
    type: TYPES.WEATHER_INFO,
    payload: {},
  });
});

test('should setup weather info action object with default value', () => {
  const action = setWeatherInfo();
  expect(action).toEqual({
    type: TYPES.WEATHER_INFO,
    payload: {},
  });
});

test('should setup temperature unit action object', () => {
  const action = setUnit('imperial');
  expect(action).toEqual({
    type: TYPES.SET_UNIT,
    payload: constants.FAHRENHEIT,
  });
});

test('should setup temperature unit action object with default value', () => {
  const action = setUnit();
  expect(action).toEqual({
    type: TYPES.SET_UNIT,
    payload: constants.FAHRENHEIT,
  });
});

test('should setup loader action object', () => {
  const action = setLoader(true);
  expect(action).toEqual({
    type: TYPES.LOADER,
    payload: true,
  });
});

test('should setup loader action object with default value', () => {
  const action = setLoader();
  expect(action).toEqual({
    type: TYPES.LOADER,
    payload: false,
  });
});

test('should setup selected card action object', () => {
  const action = setSelectedCard('03 Jun 20');
  expect(action).toEqual({
    type: TYPES.SET_SELECTED_CARD,
    payload: '03 Jun 20',
  });
});

test('should setup selected card action object with default value', () => {
  const action = setSelectedCard();
  expect(action).toEqual({
    type: TYPES.SET_SELECTED_CARD,
    payload: '',
  });
});
