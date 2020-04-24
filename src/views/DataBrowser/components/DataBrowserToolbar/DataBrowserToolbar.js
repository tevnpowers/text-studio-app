import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Button, Typography as MuiTypography } from '@material-ui/core';

import { SearchInput } from 'components';

const styles = theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
});

class DataBrowserToolbar extends React.Component {
  render() {
    const { className, addDataset, heading, onChange, ...rest } = this.props;
    const classes = this.props.classes;

    return (
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.row}>
          <MuiTypography variant={'h4'}>{heading}</MuiTypography>
          <span className={classes.spacer} />
          {this.renderButton(addDataset)}
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            onChange={onChange}
            placeholder="Search datasets..."
          />
        </div>
      </div>
    );
  }

  renderButton(addDataset) {
    if (addDataset) {
      return (
        <Button
          color="primary"
          variant="contained"
        >
        Add dataset
        </Button>
      )
    }
  }
}

DataBrowserToolbar.propTypes = {
  addDataset: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.object,
  heading: PropTypes.string,
  onChange: PropTypes.func
};

export default withStyles(styles)(DataBrowserToolbar);
