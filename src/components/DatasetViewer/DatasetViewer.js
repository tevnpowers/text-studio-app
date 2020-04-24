import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { DatasetToolbar, DatasetTable } from './components'

const { ipcRenderer } = require('electron');
const { GET_DATASET, RETURN_DATASET } = require('../../../utils/constants')

const styles = theme => ({
  root: {},
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

class DatasetViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      datasetId: props.id
    }

    this.setIpcFuncs = this.setIpcFuncs.bind(this)
    this.setIpcFuncs()
    ipcRenderer.send(GET_DATASET, this.state.datasetId);
  }

  setIpcFuncs() {
    ipcRenderer.on(RETURN_DATASET, (event, arg) => {
      let data = arg
      console.log(data)
      this.setState({
        data: data
      });
    });
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <DatasetToolbar />
        <div className={classes.content}>
          <DatasetTable data={this.state.data}/>
        </div>
      </div>
    );
  }
}

DatasetViewer.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string
};

export default withStyles(styles)(DatasetViewer);
