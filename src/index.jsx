import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import App from './App';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBwiWDCsqjnp6EbxDv6BrLCdwnbvRzkAH8",
  authDomain: "cxs-clock-in.firebaseapp.com",
  databaseURL: "https://cxs-clock-in.firebaseio.com",
  projectId: "cxs-clock-in",
  storageBucket: "cxs-clock-in.appspot.com",
  messagingSenderId: "779305743494"
};
firebase.initializeApp(config);

const appState = new AppState();

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
