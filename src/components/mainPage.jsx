import React from 'react';
import Home from './home';
import Title from './title';
import RegisterEmployee from './register';
import { observer } from 'mobx-react';

@observer
 export default class MainPage extends React.Component {

   render() {
    if (this.props.appState.home) {
        return (
        <div>
          <Title appState={this.props.appState}/>
          <Home appState={this.props.appState}/>
        </div>
      )
    }
    if (this.props.appState.registerEmployee) {
        return (
        <div>
          <Title appState={this.props.appState}/>
          <RegisterEmployee />
        </div>
      )
    }
    if (this.props.appState.viewTimes) {
        return (
        <div>
          <Title appState={this.props.appState}/>
          <viewTimes />
        </div>
      )
    }
  }

  log = () => {
    console.log(this);
  }
};
