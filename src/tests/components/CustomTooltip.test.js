import React from 'react';
import { shallow } from 'enzyme';

import CustomTooltip from '../../components/CustomTooltip';
import { payload } from '../fixtures/payload';

const label = '53.98 °F';

test('should render CustomTooltip correctly', () => {
  const wrapper = shallow(<CustomTooltip label={label} payload={payload} active />);
  expect(wrapper).toMatchSnapshot();
});

test('should CustomTooltip return null if not active', () => {
  const wrapper = shallow(<CustomTooltip label={label} payload={payload} active={false} />);
  expect(wrapper).toMatchSnapshot();
});
