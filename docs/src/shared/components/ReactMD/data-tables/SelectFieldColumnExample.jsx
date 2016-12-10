import React, { PureComponent, PropTypes } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';
import SelectFieldColumn from 'react-md/lib/DataTables/SelectFieldColumn';

const menuItems = ['Hello', 'World!', 'Woop'];

export default class SelectFieldColumnExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <DataTable baseId="woop">
        <TableHeader>
          <TableRow>
            <TableColumn className="prevent-grow md-table-column--select-field" style={{ minWidth: 168 }}>One</TableColumn>
            <TableColumn>Two</TableColumn>
            <TableColumn>Three</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <SelectFieldColumn menuItems={menuItems} placeholder="Something" />
            <TableColumn>Two</TableColumn>
            <TableColumn>Three</TableColumn>
          </TableRow>
          <TableRow>
            <SelectFieldColumn menuItems={menuItems} placeholder="Something" />
            <TableColumn>Two</TableColumn>
            <TableColumn>Three</TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    );
  }
}
