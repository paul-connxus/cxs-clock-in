import React from 'react';
import Home from './home';
import Title from './title';
import RegisterEmployee from './register';
import ViewTimes from './viewTimes';
import { observer } from 'mobx-react';

@observer
 export default class MainPage extends React.Component {

   render() {
    const mainStyle = {
       marginTop: "3em"
    }

    if (this.props.appState.home) {
        return (
        <div>
          <Title appState={this.props.appState}/>
          <div>
            <Home appState={this.props.appState}/>
          </div>
        </div>
      )
    }
    if (this.props.appState.registerEmployee) {
        return (
        <div>
          <Title appState={this.props.appState}/>
          <RegisterEmployee appState={this.props.appState} />
        </div>
      )
    }
    if (this.props.appState.viewTimes) {
        return (
        <div>
          <Title appState={this.props.appState}/>
          <ViewTimes appState={this.props.appState}/>
        </div>
      )
    }
  }

};
