import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { DataBrowserToolbar, DatasetCard } from './components';

import mockData from './data';

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

class DataBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: mockData,
    }

    this.searchDatasets = this.searchDatasets.bind(this);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <div>
          <DataBrowserToolbar
            addDataset
            heading={'Your Datasets'}
            onChange={this.searchDatasets}
          />
          <div className={classes.content}>
            <Grid
              container
              spacing={3}
            >
              {this.state.datasets.map(dataset => (
                <Grid
                  item
                  key={dataset.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <DatasetCard dataset={dataset} />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className={classes.pagination}>
            <Typography variant="caption">1-6 of 20</Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
        <div>
          <DataBrowserToolbar
            addDataset={false}
            heading={'Public Datasets'}
            onChange={this.searchDatasets}
          />
          <div className={classes.content}>
            <Grid
              container
              spacing={3}
            >
              {this.state.datasets.map(dataset => (
                <Grid
                  item
                  key={dataset.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <DatasetCard dataset={dataset} />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className={classes.pagination}>
            <Typography variant="caption">1-6 of 20</Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }

  searchDatasets(event) {
    // TO DO: Replace with dataset search!
    console.log(event.target.value);
  }
}

DataBrowser.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(DataBrowser);
