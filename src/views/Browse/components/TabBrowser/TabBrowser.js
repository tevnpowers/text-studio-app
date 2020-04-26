/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { DatasetCard } from 'components';


const styles = theme => ({
  content: {
    marginTop: theme.spacing(2)
  },
  newItem: {
    backgroundColor: theme.palette.white
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

class TabBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = props.nextPage;
    this.previousPage = props.previousPage;
    this.state = {
      items: props.items,
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.content}>
          <Grid
            container
            spacing={3}
          >
            {this.props.items.map(item => (
              <Grid
                item
                key={item.id}
                lg={3}
                md={4}
                xs={12}
              >
                <DatasetCard dataset={item} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.pagination}>
          <Typography variant="caption">{this.props.startIndex}-{this.props.endIndex} of {this.props.total}</Typography>
          <IconButton
            disabled={this.props.startIndex <= 1}
            onClick={this.previousPage}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            disabled={this.props.endIndex >= this.props.total}
            onClick={this.nextPage}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

TabBrowser.propTypes = {
  classes: PropTypes.object,
  endIndex: PropTypes.number,
  items: PropTypes.array,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  startIndex: PropTypes.number,
  total: PropTypes.number
};

export default withStyles(styles)(TabBrowser);
