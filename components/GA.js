import ReactGA from 'react-ga';
import url from 'url';
import Router from 'next/router';

const GA_ID = 'UA-74755968-5';
let initialized = false;

Router.onRouteChangeComplete = () => {
  if(!initialized) {
    ReactGA.initialize(GA_ID);
    initialized = true;
  }
  ReactGA.set({
    page: window.location.pathname +
    window.location.search
  });
  ReactGA.pageview(
    window.location.pathname +
    window.location.search
  );
};

module.exports = (props) => {
  if(!initialized) {
    ReactGA.initialize(GA_ID);
    initialized = true;
  }
  return <span />;
};
