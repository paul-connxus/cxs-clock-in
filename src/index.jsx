import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { autorun } from 'mobx';
import AppState from './AppState';
import App from './App';
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var config = {
  apiKey: "AIzaSyBwiWDCsqjnp6EbxDv6BrLCdwnbvRzkAH8",
  authDomain: "cxs-clock-in.firebaseapp.com",
  databaseURL: "https://cxs-clock-in.firebaseio.com",
  projectId: "cxs-clock-in",
  storageBucket: "cxs-clock-in.appspot.com",
  messagingSenderId: "779305743494"
};
firebase.initializeApp(config);

const appState = window.appState = new AppState();

autorun(() => {
  console.log('store changed');
})

render(
  <AppContainer>
    <App appState={appState} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp appState={appState} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
