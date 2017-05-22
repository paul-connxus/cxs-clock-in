import React from 'react';
import { observer } from 'mobx-react';
import firebase from 'firebase';
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

  render() {
    const user = this.props.appState;
    console.log(user);
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Avatar</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Signed In</TableHeaderColumn>
            <TableHeaderColumn>Signed Out</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            <TableRow>
              <TableRowColumn>
              
              </TableRowColumn>
            </TableRow>
          }
        </TableBody>
      </Table>
    )
 }
};
