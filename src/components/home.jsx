import React from 'react';
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
const home = () => (
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
    </TableBody>
  </Table>
);

export default home;
