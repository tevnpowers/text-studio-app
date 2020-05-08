import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { DatasetToolbar, DatasetTable } from './components'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const DatasetViewer = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DatasetToolbar />
      <div className={classes.content}>
        <DatasetTable data={props.data}/>
      </div>
    </div>
  );
}

DatasetViewer.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array,
};

export default DatasetViewer;
