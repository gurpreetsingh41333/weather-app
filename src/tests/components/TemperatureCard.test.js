import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import TemperatureCard from '../../components/TemperatureCard';
import { store } from '../store/mockStore';
import { setSelectedCard } from '../../actions/WeatherInfo.action';
import { TYPES } from '../../actions/types';

const data = {
  avgTemp: '57.43',
  date: '06 Jun 20',
};

test('should render TemperatureCard correctly', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <TemperatureCard data={data} />
    </Provider>,
  );
  expect(wrapper.childAt(0)).toMatchSnapshot();
});

describe('<TemperatureCard />', () => {
  const setMouseHover = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <TemperatureCard data={data} setMouseHover={setMouseHover} />
    </Provider>,
  );

  test('should call setMouseHover on mouse enter with date', () => {
    wrapper.find('#temp-grid').first().simulate('mouseenter');
    expect(setMouseHover).toHaveBeenCalledWith(data.date);
  });

  test('should call setMouseHover on mouse leave with null', () => {
    wrapper.find('#temp-grid').first().simulate('mouseleave');
    expect(setMouseHover).toHaveBeenCalledWith('');
  });

  test('should dispatch setSelectedCard on click with date', () => {
    wrapper.find('#temp-grid').first().simulate('click');
    expect(store.dispatch(setSelectedCard(data.date))).toEqual({
      type: TYPES.SET_SELECTED_CARD,
      payload: data.date,
    });
  });
});
