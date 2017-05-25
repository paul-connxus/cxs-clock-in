import React from 'react';
import { Observer, observer } from 'mobx-react';
import firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';
import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */


@observer
export default class Home extends React.Component {

  populateUserArray(users) {
    users.clear();
    this.props.appState.loading = true;
    var self = this;
    var userQuery = firebase.database().ref("users").orderByKey();
    var timesQuery = firebase.database().ref("userTimes").orderByKey();
      userQuery.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var user = childSnapshot.val();
              self.getUserTimes(user, users);
          }
        );
      });
    self.props.appState.loading = false;
  }

  getUserTimes(user, users) {
    var self = this;
    var timesQuery = firebase.database().ref("userTimes").orderByKey();
    var userId = user.userId;
    timesQuery.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var day = childSnapshot.val();
            var dbUser = day[userId]
            if (dbUser) {
              var signIn =  new Date(dbUser.signIn)
              var signOut =  new Date(dbUser.signOut)
              var formatedSignIn = `${signIn.getHours() > 12 ? signIn.getHours() - 12 : signIn.getHours()}:${signIn.getMinutes() < 10 ? '0' + signIn.getMinutes() : signIn.getMinutes()} ${signIn.getHours() < 12 ? 'AM' : 'PM'}`
              var formatedSignOut = `${signOut.getHours() > 12 ? signOut.getHours() - 12 : signOut.getHours()}:${signOut.getMinutes() < 10 ? '0' + signOut.getMinutes() : signOut.getMinutes()} ${signOut.getHours() < 12 ? 'AM' : 'PM'}`
              user.signIn = formatedSignIn
              user.signOut = formatedSignOut;
            } else {
              user.signIn = null;
              user.signOut = null;
            }
          users.push(user);
        }
      );
    });
  }

  writeSignIn(user) {
     var date = new Date();
     var path = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
    //  Finds Specific User
     if (!user.signIn) {
       firebase.database().ref(`userTimes/${path}/${user.userId}`).set({
          signIn : date.getTime(),
          signOut : null
      });
      user.signIn = date.toTimeString().split(' ')[0];
    } else if (user.signIn) {
        firebase.database().ref(`userTimes/${path}/${user.userId}`).update({
           signOut : date.getTime()
       });
       user.signOut = date.toTimeString().split(' ')[0];
    }
  }

  signInOrSignOut(user) {
    var self = this;

    if (user.signOut) {
      return (<FlatButton label="Done" />)
    } else if (user.signIn) {
      return (<FlatButton label="Sign-Out" onTouchTap={self.writeSignIn.bind(self, user)}/>)
    } else {
      return (<FlatButton label="Sign-In" onTouchTap={self.writeSignIn.bind(self, user)}/>)
    }
  }

  componentWillMount() {
    this.populateUserArray(this.props.appState.users);
  }

  render() {
    var users = this.props.appState.users;
    var self = this;
    if (!this.props.appState.loading) {
      const style ={
        paddingTop: '3.5em'
      }
      return (
        <div style={style}>
            <Table multiSelectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Avatar</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Signed In</TableHeaderColumn>
                  <TableHeaderColumn>Signed Out</TableHeaderColumn>
                  <TableHeaderColumn>Sign In / Sign Out</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {users.map(function(user){
                    return (
                        <TableRow key={user.userId} selectable={false}>
                          <TableRowColumn><img className="avatar" src={user.photoURL} /></TableRowColumn>
                          <TableRowColumn>{user.name}</TableRowColumn>
                          <TableRowColumn>
                          {typeof user.signIn === "string" ? (
                            <div>{user.signIn}</div>
                          ) : (
                            <div>--:--</div>
                          )
                          }</TableRowColumn>
                          <TableRowColumn>
                          {typeof user.signOut === "string" ? (
                              <div>{user.signOut}</div>
                            ) : (
                              <div>--:--</div>
                            )
                          }
                          </TableRowColumn>
                          <TableRowColumn>
                            {self.signInOrSignOut(user)}
                          </TableRowColumn>
                        </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
        </div>
      )
    } else {
      return (
        <div>
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }
 }
};
