import {
  red700, red800,
  grey400, grey300,
  grey600, grey700, grey800, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import MainPage from './components/mainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

@observer
class App extends Component {
  render() {
    let muiTheme = getMuiTheme({
      palette: {
        primary1Color: red700,
        primary2Color: red800,
        primary3Color: grey400,
        accent1Color: grey600,
        accent2Color: grey700,
        accent3Color: grey800,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: red700,
        shadowColor: fullBlack,
      },
    });

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
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
