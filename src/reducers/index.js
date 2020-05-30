import { combineReducers } from 'redux';
import { weather } from './WeatherInfo.reducer';

export default combineReducers({
  weather,
});
