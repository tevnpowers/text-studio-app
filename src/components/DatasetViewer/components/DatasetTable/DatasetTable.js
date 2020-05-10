import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const DatasetTable = props => {
  const { className, data, ...rest } = props;

  const classes = useStyles();

  const [selectedData, setSelectedData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { data } = props;

    let selectedData;

    if (event.target.checked) {
      selectedData = data.map(data => data.id);
    } else {
      selectedData = [];
    }

    setSelectedData(selectedData);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedData.indexOf(id);
    let newSelectedData = [];

    if (selectedIndex === -1) {
      newSelectedData = newSelectedData.concat(selectedData, id);
    } else if (selectedIndex === 0) {
      newSelectedData = newSelectedData.concat(selectedData.slice(1));
    } else if (selectedIndex === selectedData.length - 1) {
      newSelectedData = newSelectedData.concat(selectedData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedData = newSelectedData.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1)
      );
    }

    setSelectedData(newSelectedData);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const getRowCells = (keys, data) => {
    let cells = []
    keys.map(key => {
      if (key in data) {
        let value = data[key]
        let dataType = typeof value
        if (dataType === 'object' || dataType == 'boolean') {
          value = JSON.stringify(value)
        } else if (dataType === 'string') {
          if (value.length > 20) {
            value = value.slice(0, 20) + '...'
          }
        }
        cells.push(<TableCell key={key}>{value}</TableCell>)
      } else {
        cells.push(<TableCell key={key}/>)
      }
    })
    return cells
  }

  const getColumnNames = data => {
    if (data.length > 0) {
      let first = data[0]
      return Object.keys(first)
    }
    return []
  }

  const getCells = names => {
    let cells = []
    names.map(key => {
      cells.push(<TableCell key={key}>{key}</TableCell>)
    })
    return cells
  };

  let columnNames = getColumnNames(data)

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedData.length === data.length}
                      color="primary"
                      indeterminate={
                        selectedData.length > 0 &&
                        selectedData.length < data.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {getCells(columnNames)}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, rowsPerPage).map((rowData, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={index}
                    selected={selectedData.indexOf(rowData.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedData.indexOf(rowData.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, rowData.id)}
                        value="true"
                      />
                    </TableCell>
                    {getRowCells(columnNames, rowData)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={data.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

DatasetTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
};

export default DatasetTable;
