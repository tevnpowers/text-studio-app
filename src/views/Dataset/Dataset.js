import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { DatasetTable } from 'components';
import { DatasetToolbar } from './components'

const { ipcRenderer } = require('electron');
const { GET_DATASET, RETURN_DATASET } = require('../../../utils/constants')

const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

class Dataset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      datasetId: props.match.params.datasetId
    }

    this.goBack = this.goBack.bind(this); // i think you are missing this
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

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <DatasetToolbar goBack={this.goBack}/>
        <div className={classes.content}>
          <DatasetTable data={this.state.data}/>
        </div>
      </div>
    );
  }
}

Dataset.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Dataset);
