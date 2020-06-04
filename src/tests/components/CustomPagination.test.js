import React from 'react';
import { shallow } from 'enzyme';

import CustomPagination from '../../components/CustomPagination';

const pagination = {
  hasPreviousPage: true,
  hasNextPage: true,
};

describe('<CustomPagination />', () => {
  const gotoPage = jest.fn();
  const wrapper = shallow(<CustomPagination pagination={pagination} gotoPage={gotoPage} />);

  test('should render CustomPagination correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call gotoPage with next on click', () => {
    wrapper.find('#next-btn').simulate('click');
    expect(gotoPage).toHaveBeenCalledWith('next');
  });

  test('should call gotoPage with back on click', () => {
    wrapper.find('#back-btn').simulate('click');
    expect(gotoPage).toHaveBeenCalledWith('back');
  });
});
