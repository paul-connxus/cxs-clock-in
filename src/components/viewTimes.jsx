import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { Observer, observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import TimePicker from 'material-ui/TimePicker';
import firebase from 'firebase';
import FlatButton from 'material-ui/FlatButton';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

var allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

@observer
export default class ViewTimes extends React.Component {

  state = {
    open: false,
    name: ''
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  populateUserArray(users, date) {
    users.clear();
    this.props.appState.loading = true;
    var self = this;
    var userQuery = firebase.database().ref("users").orderByKey();
    var timesQuery = firebase.database().ref("userTimes").orderByKey();
      userQuery.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var user = childSnapshot.val();
              self.getUserTimes(user, users, date);
          }
        );
      });
    self.props.appState.loading = false;
  }

  getUserTimes(user, users, date) {
    var self = this;
    var timesQuery = firebase.database().ref("userTimes").orderByKey();
    var userId = user.userId
    var selectedDate = date;

    timesQuery.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.key === selectedDate) {
              var day = childSnapshot.val();
              var dbUser = day[userId]
              if (dbUser) {
                if (dbUser.signIn) {
                  user.signIn = dbUser.signIn;
                } else {
                  user.signIn = null;
                }

                if (dbUser.signOut) {
                  user.signOut = dbUser.signOut;
                } else {
                  user.signOut = null;
                }
              } else {
                user.signIn = null;
                user.signOut = null;
              }
              users.push(user);
            }
        }
      );
    });
  }

  test = (slotInfo, users) => {
    const date = `${slotInfo.start.getMonth() + 1}-${slotInfo.start.getDate()}-${slotInfo.start.getFullYear()}`
    this.handleOpen();
    this.setState({name: `Times for ${slotInfo.start.getMonth() + 1}/${slotInfo.start.getDate()}/${slotInfo.start.getFullYear()}`})
    this.populateUserArray(users, date);
  }

  render(){
    var users = this.props.appState.users;
    var myEventsList = [];
    var self = this;
    const style ={
      paddingTop: '4.7em'
    }
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <BigCalendar
          style={style}
          events={myEventsList}
          selectable={true}
          onSelectSlot={slotInfo => this.test(slotInfo, users)}
          defaultDate={new Date()}
        />
        <Dialog
          title={this.state.name}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Avatar</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Signed In</TableHeaderColumn>
              <TableHeaderColumn>Signed Out</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {users.map(function(user){
            if (user.signIn) {
              var userSignIn = new Date(user.signIn);
            }
            if (user.signOut) {
              var userSignOut = new Date(user.signOut);
            }
              return (
                  <TableRow key={user.userId} selectable={false}>
                    <TableRowColumn><img className="avatar" src={user.photoURL} /></TableRowColumn>
                    <TableRowColumn>{user.name}</TableRowColumn>
                    <TableRowColumn>
                      <TimePicker
                      id={`${user.userId}-${user.signIn ? user.signIn : 'blankBoi'}`}
                      ref={`${user.userId}SignIn`}
                      user={user}
                      hintText="--:--"
                      disabled={true}
                      format="ampm"
                      initialTime={null}
                      defaultTime={null}
                      value={userSignIn ? userSignIn : null} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <TimePicker
                      id={`${user.userId}-${user.signOut ? user.signOut : 'blankBoi'}`}
                      ref={`${user.userId}SignOut`}
                      user={user}
                      hintText="--:--"
                      disabled={true}
                      format="ampm"
                      initialTime={null}
                      defaultTime={null}
                      value={userSignOut ? userSignOut : null} />
                    </TableRowColumn>
                  </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
        </Dialog>
      </div>
    )
  }
}
