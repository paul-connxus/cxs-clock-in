import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import MainPage from './components/mainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

@observer
class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <MainPage appState={this.props.appState}/>
        </MuiThemeProvider>
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  }
};

export default App;
