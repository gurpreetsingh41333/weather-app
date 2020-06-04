import { dayWiseAvgTemp } from '../../utils/utils';
import data from '../fixtures/weatherInfo.json';

test('should return an array containing average temp & date', () => {
  const result = dayWiseAvgTemp(data.list);
  expect(result).toEqual(
    expect.arrayContaining([
      {
        avgTemp: expect.any(String),
        date: expect.any(String),
      },
    ]),
  );
});
