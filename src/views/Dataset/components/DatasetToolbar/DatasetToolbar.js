import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IconButton } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { SearchInput } from 'components';
import { withStyles } from '@material-ui/styles';

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
  searchInput: {
    marginRight: theme.spacing(1)
  },
  backArrow: {
    cursor: 'pointer'
  }
});

class DatasetToolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { className, classes, goBack, ...rest } = this.props;
    return (
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.row}>
          <IconButton onClick={goBack}>
            <ArrowBackIosRoundedIcon
              className={classes.backArrow}
              color="primary"
            />
          </IconButton>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search dataset..."
          />
        </div>
      </div>
    );
  }
}

DatasetToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  goBack: PropTypes.func
};

export default withStyles(styles)(DatasetToolbar);
