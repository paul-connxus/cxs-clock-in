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
    var query = firebase.database().ref("users").orderByKey();
      query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var user = childSnapshot.val();
              user.signIn = null;
              user.signOut = null;
              self.writeSignIn(user);
              users.push(user);
          }
        );
        self.props.appState.loading = false;
      });

  }

  writeSignIn(user) {
     var date = new Date();
     var path = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();
    //  Finds Specific User
     if (!user.signIn) {
       firebase.database().ref(`userTimes/${path}/${user.userId}`).set({
          signIn : date.getTime()
      });
      user.signIn = date.toTimeString().split(' ')[0];
     }
     if (user.signIn) {
       firebase.database().ref(`userTimes/${path}/${user.userId}`).set({
          signOut : date.getTime()
      });
      user.signOut = date.toTimeString().split(' ')[0];
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
                            user.signIn
                          ) : (
                            console.log(user)
                          )
                          }</TableRowColumn>
                          <TableRowColumn>
                          {typeof user.signIn === "string" ? (
                              user.signOut
                            ) : (
                              console.log(user)
                            )
                          }
                          </TableRowColumn>
                          <TableRowColumn>
                          {(() => {
                             switch (user.signIn) {
                              case typeof user.signIn === "String" :   return (<FlatButton label="Sign-Out" />);
                              default:                               return  (<FlatButton label="Sign-In" />);
                             }
                           })()}
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
