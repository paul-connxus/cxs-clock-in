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


  checkUserSignInAndSignOut(user, users) {
    if (user.signIn || user.signOut) {
      return true;
    }
    if (!user.signIn && !user.signOut) {
      user.signIn = null;
      user.signOut = null;
    }
  }

  checkToday(users) {
    var date = new Date();
    var todaysPath = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

    console.log("Timer has start!!!");
    setTimeout(function() {
      self.populateUserArray(users);
    }, 3600000);
  }

  getUserTimes(user, users) {
    var self = this;
    var timesQuery = firebase.database().ref("userTimes").orderByKey();
    var userId = user.userId;
    var date = new Date();
    var todaysPath = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    var todaysUserTimes = this.props.appState.userTimes

    return timesQuery.once("value")
        .then(function(userTimes) {
        var todayObj = userTimes.val();
        todaysUserTimes = todayObj[todaysPath];

        if (todaysUserTimes) {
            var dbUser = todaysUserTimes[userId]

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
            }
            users.push(user);
            self.checkUserSignInAndSignOut(user, users);
        } else {
           firebase.database().ref(`userTimes/${todaysPath}/${user.userId}`).set({
            signIn: false,
            signOut: false
          }).catch();
          self.getUserTimes(user, users);
        }
    }
  );
  }

  writeSignIn(user) {
    var newDate = new Date();
    var unixDate = newDate.getTime();
    var date = new Date(unixDate);
    var path = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    //  Finds Specific User
    firebase.database().ref(`userTimes/${path}/${user.userId}`).set({
        signIn : unixDate,
        signOut : null
    });
    user.signIn = unixDate;
  }

  writeSignOut(user) {
    var newDate = new Date();
    var unixDate = newDate.getTime();
    var date = new Date(unixDate);
    var path = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    if (user.signIn) {
       firebase.database().ref(`userTimes/${path}/${user.userId}`).update({
          signOut : unixDate
      });
      user.signOut = unixDate;
   }
  }

  updateSignIn(event, time) {
    var unixTime = time.getTime();
    var date = new Date();
    var user = this.user;
    var refSignIn = `${user.userId}SignIn`
    var path = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    var value = time;

    firebase.database().ref(`userTimes/${path}/${user.userId}`).set({
        signIn: unixTime,
        signOut: user.signOut ? user.signOut : null
    })
    .catch(function(error) {
        console.log("Update failed: " + error.message)
      });
    user.signIn = value;
  }

  updateSignOut(event, time) {
    var unixTime = time.getTime();
    var date = new Date();
    var user = this.user;
    var refSignIn = `${user.userId}SignOut`
    var path = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    var value = time;

    firebase.database().ref(`userTimes/${path}/${user.userId}`).set({
        signIn: user.signIn ? user.signIn : null,
        signOut: unixTime
    })
    .catch(function(error) {
        console.log("Update failed: " + error.message)
      });
    user.signOut = value;
  }

  signInOrSignOut(user) {
    var self = this;

    if (user.signOut && user.signIn) {
      return (<FlatButton label="Done" />)
    } else if (user.signIn) {
      return (<FlatButton label="Sign-Out" onTouchTap={self.writeSignOut.bind(self, user)}/>)
    } else {
      return (<FlatButton label="Sign-In" onTouchTap={self.writeSignIn.bind(self, user)}/>)
    }
  }

  componentWillMount() {
    this.populateUserArray(this.props.appState.users);
    this.checkToday(this.props.appState.users);
  }

  render() {
    var users = this.props.appState.users;
    var self = this;
    if (!this.props.appState.loading) {
      const style ={
        paddingTop: '3.5em'
      }
      const paperStyle = {
        margin: '1em'
      }
      return (
        <div style={style}>
          <Paper style={paperStyle}>
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
                            format="ampm"
                            value={userSignIn ? userSignIn : null}
                            onChange={self.updateSignIn} />
                          </TableRowColumn>
                          <TableRowColumn>
                            <TimePicker
                            id={`${user.userId}-${user.signOut ? user.signOut : 'blankBoi'}`}
                            ref={`${user.userId}SignOut`}
                            user={user}
                            hintText="--:--"
                            format="ampm"
                            value={userSignOut ? userSignOut : null}
                            onChange={self.updateSignOut} />
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
          </Paper>
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
