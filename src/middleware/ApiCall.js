import axios from 'axios';

const showErrorPage = () => {
  /* TODO check for 5XX or 4XX here
  Redirect to error page */
};

const ApiCall = {
  getCall: async config => {
    try {
      const response = await axios.get(config.url);
      return response;
    } catch (error) {
      if (error?.response) {
        showErrorPage(error.response);
        return error.response;
      }
      return error;
    }
  },
};

export default ApiCall;
