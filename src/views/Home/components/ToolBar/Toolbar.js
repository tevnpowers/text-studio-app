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

class Toolbar extends React.Component {
  render() {
    const { className, buttonText, heading, onChange, onNewClick, searchPlaceholder, ...rest } = this.props;
    const classes = this.props.classes;

    return (
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.row}>
          <MuiTypography variant={'h4'}>{heading}</MuiTypography>
          <span className={classes.spacer} />
          {this.renderButton(buttonText, onNewClick)}
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            onChange={onChange}
            placeholder={searchPlaceholder}
          />
        </div>
      </div>
    );
  }


  renderButton(buttonText, onNewClick) {
    if (buttonText) {
      return (
        <Button
          color="primary"
          onClick={onNewClick}
          variant="contained"
        >
          {buttonText}
        </Button>
      )
    }
  }
}

Toolbar.propTypes = {
  buttonText: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object,
  heading: PropTypes.string,
  onChange: PropTypes.func,
  onNewClick: PropTypes.func,
  searchPlaceholder: PropTypes.string
};

export default withStyles(styles)(Toolbar);
