import React from 'react';
import { shallow } from 'enzyme';

import Chart from '../../components/Chart';
import { barChartData } from '../fixtures/barChartData';

test('should render Chart correctly', () => {
  const wrapper = shallow(<Chart barChartData={barChartData} />);
  expect(wrapper).toMatchSnapshot();
});
