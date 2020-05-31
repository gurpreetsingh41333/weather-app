// eslint-disable-next-line no-console
console.info('env:', process.env.NODE_ENV);

export const { APP_ID } = process.env;

export const { API_BASE_URL } = process.env;

// end points
export const END_POINTS = {
  GET_WEATHER_INFO: '/data/2.5/forecast?q={LOCATION}&APPID={APP_ID}&units={UNITS}&cnt=40',
};
