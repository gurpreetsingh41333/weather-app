import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { store } from '../store/mockStore';
import WeatherCards from '../../containers/WeatherCards';
import { weatherInfo } from '../fixtures/weatherInfo';

describe('<WeatherCards />', () => {
  const pagination = {
    currentPage: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };

  const wrapper = mount(
    <Provider store={store}>
      <WeatherCards weatherInfo={weatherInfo} />
    </Provider>,
  );

  test('should have an <CustomPagination /> component', () => {
    expect(wrapper.find('CustomPagination')).toHaveLength(1);
  });

  test('should have proper props for <CustomPagination />', () => {
    expect(wrapper.find('CustomPagination').props()).toEqual({
      gotoPage: expect.any(Function),
      pagination,
    });
  });

  test('should have Three <TemperatureCard /> components', () => {
    expect(wrapper.find('TemperatureCard')).toHaveLength(3);
  });

  test('should have proper props for <TemperatureCard />', () => {
    expect(wrapper.find('TemperatureCard').first().props()).toEqual({
      mouseHover: expect.any(String),
      data: expect.objectContaining({ avgTemp: expect.any(String), date: expect.any(String) }),
      setMouseHover: expect.any(Function),
    });
  });
});
