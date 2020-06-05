import { dayWiseAvgTemp } from '../../utils/utils';
import { weatherInfo } from '../fixtures/weatherInfo';

test('should return an array containing average temp & date', () => {
  const result = dayWiseAvgTemp(weatherInfo.list);
  expect(result).toEqual(
    expect.arrayContaining([
      {
        avgTemp: expect.any(String),
        date: expect.any(String),
      },
    ]),
  );
});
