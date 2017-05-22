import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Clock from 'react-clock';
injectTapEventPlugin();
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
 export default class Title extends React.Component {

 constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  setHome = () => {
    this.props.appState.home = true;
    this.props.appState.registerEmployee = false;
    this.props.appState.viewTimes = false;
    this.handleClose()
  }
  setRegisterEmployee = () => {
    this.props.appState.home = false;
    this.props.appState.registerEmployee = true;
    this.props.appState.viewTimes = false;
    this.handleClose()
  }
  setViewTimes = () => {
    this.props.appState.home = false;
    this.props.appState.registerEmployee = false;
    this.props.appState.viewTimes = true;
    this.handleClose()
  }
  // var registerEmployee = this.props.appState.registerEmployee;
  // var viewTimes = this.props.appState.viewTimes;


  render() {
    let now = new Date();
    const timeStyling = {
      color: "white",
      fontSize: "1.2em",
      margin: "auto"
    }
    return (
      <div>
        <AppBar
        title={<img className="logo" src='src/assets/white_cxs_logo.png'/>}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.handleToggle}
        >
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onTouchTap={this.setHome}>Home</MenuItem>
            <MenuItem onTouchTap={this.setRegisterEmployee}>Register Employee</MenuItem>
            <MenuItem onTouchTap={this.setViewTimes}>View Clock Ins</MenuItem>
          </Drawer>
        <Clock style={timeStyling}/>
        </AppBar>
      </div>
    );
  }
}
