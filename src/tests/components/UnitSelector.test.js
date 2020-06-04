import React from 'react';
import { shallow } from 'enzyme';

import UnitSelector from '../../components/UnitSelector';
import { constants } from '../../config/constants';

describe('<UnitSelector />', () => {
  const handleChange = jest.fn();
  const wrapper = shallow(<UnitSelector unit={constants.FAHRENHEIT} handleChange={handleChange} />);

  test('should render UnitSelector correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call handleChange on change', () => {
    wrapper.find('#unit').simulate('change');
    expect(handleChange).toHaveBeenCalled();
  });
});
