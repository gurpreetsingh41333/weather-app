import {
  setWeatherInfo,
  setLoader,
  setUnit,
  setSelectedCard,
  getWeatherInfo,
} from '../../actions/WeatherInfo.action';
import { TYPES } from '../../actions/types';
import { constants } from '../../config/constants';
import { store } from '../store/mockStore';

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

test('should fetch the weather info', done => {
  store
    .dispatch(
      getWeatherInfo({
        location: { latitude: '48.1374', longitude: '11.5755' },
        units: constants.FAHRENHEIT,
      }),
    )
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({ type: TYPES.LOADER, payload: true });
      expect(actions[1]).toEqual({
        type: TYPES.WEATHER_INFO,
        payload: expect.objectContaining({
          list: expect.any(Array),
          city: expect.any(Object),
          cod: '200',
        }),
      });
      expect(actions[2]).toEqual({ type: TYPES.LOADER, payload: false });
      done();
    });
});
