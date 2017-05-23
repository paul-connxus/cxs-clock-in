import React from 'react';
import { observer } from 'mobx-react';
import firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';
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
    var self = this;
    var query = firebase.database().ref("users").orderByKey();

      query.once("value")
          .then(function(snapshot) {
            self.props.appState.loading = true;
            snapshot.forEach(function(childSnapshot) {
              var childData = childSnapshot.val();
              users.push(childData);
          }
        );
        console.log(users);
        self.props.appState.loading = false;
      });
  }

  componentWillMount() {
    this.populateUserArray(this.props.appState.users);
  }

  render() {
    var users = this.props.appState.users;
    if (!this.props.appState.loading) {
      return (
        <Table multiSelectable={false}>
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
              return (
                <TableRow selectable={true}>
                  <TableRowColumn><img className="avatar" src={user.photoURL} /></TableRowColumn>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>Null</TableRowColumn>
                  <TableRowColumn>Null</TableRowColumn>
                </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
      )
    } else {
      console.log(this.props.appState.loading);
      console.log(this.props.appState.users);
      return (
        <div>
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }
 }
};
