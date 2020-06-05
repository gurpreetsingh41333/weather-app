import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { store } from '../store/mockStore';
import App from '../../containers/App';
import { constants } from '../../config/constants';

describe('<App />', () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  test('should have an <UnitSelector /> component', () => {
    expect(wrapper.find('UnitSelector')).toHaveLength(1);
  });

  test('should have proper props for <UnitSelector />', () => {
    expect(wrapper.find('UnitSelector').props()).toEqual({
      handleChange: expect.any(Function),
      unit: constants.FAHRENHEIT,
    });
  });

  test('should have the unit Fahrenheit by default', () => {
    expect(wrapper.find('UnitSelector').prop('unit')).toEqual(constants.FAHRENHEIT);
  });

  test('should have an <WeatherCards /> component', () => {
    expect(wrapper.find('WeatherCards')).toHaveLength(1);
  });

  test('should have default props for <WeatherCards />', () => {
    expect(wrapper.find('WeatherCards').prop('weatherInfo')).toEqual({
      dayWiseList: [],
      list: [],
      city: {},
    });
  });

  test('should have an <TemperatureBarChart /> component', () => {
    expect(wrapper.find('TemperatureBarChart')).toHaveLength(1);
  });

  test('should have default props for <TemperatureBarChart />', () => {
    expect(wrapper.find('TemperatureBarChart').prop('weatherInfo')).toEqual({
      dayWiseList: [],
      list: [],
      city: {},
    });
  });
});
