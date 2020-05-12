/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { DatasetCard, NewItemCard } from 'components';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import ExtensionOutlinedIcon from '@material-ui/icons/ExtensionOutlined';


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

function getNewItemCard(text, type, onClick) {
  let icon;
  if (type === 'project') {
    icon = <DescriptionOutlinedIcon
      color="action"
      fontSize="large"
    />
  } else if (type === 'dataset') {
    icon = <StorageRoundedIcon
      color="action"
      fontSize="large"
    />
  } else if (type === 'extension') {
    icon = <ExtensionOutlinedIcon
      color="action"
      fontSize="large"
    />
  }

  return (
    <Grid
      item
      key={'newItem'}
      lg={4}
      md={6}
      onClick={onClick}
      xs={12}
    >
      <NewItemCard
        icon={icon}
        text={text}
      />
    </Grid>
  );
}

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.newText = props.newText;
    this.type = props.type;
    this.nextPage = props.nextPage;
    this.previousPage = props.previousPage;
    this.onNewClick = props.onNewClick;
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
            {/*getNewItemCard(this.newText, this.type, this.onNewClick)*/}
            {this.props.items.map(item => (
              <Grid
                item
                key={item.id}
                lg={4}
                md={6}
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

Carousel.propTypes = {
  classes: PropTypes.object,
  endIndex: PropTypes.number,
  items: PropTypes.array,
  newText: PropTypes.string,
  nextPage: PropTypes.func,
  onNewClick: PropTypes.func,
  previousPage: PropTypes.func,
  startIndex: PropTypes.number,
  total: PropTypes.number,
  type: PropTypes.string
};

export default withStyles(styles)(Carousel);
