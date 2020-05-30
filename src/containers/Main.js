/* eslint-disable no-console */
import React from 'react';

import App from './App/App';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const logInfo = {
      timeStamp: new Date(),
      stackTrace: info.componentStack,
      pageon: window.location.pathname,
      browserVersion1a: navigator.appVersion,
      env: process.env.REACT_APP_ENV,
    };
    console.info('logInfo', logInfo);
    // logComponentStackToMyService(logInfo);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      // render any custom fallback UI
      return <span>Error</span>;
    }
    return <App />;
  }
}

export default Main;
