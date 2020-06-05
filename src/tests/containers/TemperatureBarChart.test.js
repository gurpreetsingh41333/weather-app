import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import TemperatureBarChart from '../../containers/TemperatureBarChart';
import { weatherInfo } from '../fixtures/weatherInfo';
import { store } from '../store/mockStore';

describe('<TemperatureBarChart />', () => {
  const wrapper = mount(
    <Provider store={store}>
      <TemperatureBarChart weatherInfo={weatherInfo} />
    </Provider>,
  );

  test('should have an <Chart /> component', () => {
    expect(wrapper.find('Chart')).toHaveLength(1);
  });

  test('should have default props for <Chart />', () => {
    expect(wrapper.find('Chart').prop('barChartData')).toEqual([]);
  });
});
