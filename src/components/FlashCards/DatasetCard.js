import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const styles = theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
});

class DatasetCard extends React.Component {
  render() {
    const { className, dataset, classes, ...rest } = this.props;
    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Link to={'/dataset/' + dataset.id}>
          <CardContent>
            <div className={classes.imageContainer}>
              <img
                alt="Dataset"
                className={classes.image}
                src={dataset.imageUrl}
              />
            </div>
            <Typography
              align="center"
              gutterBottom
              variant="h4"
            >
              {dataset.title}
            </Typography>
            <Typography
              align="center"
              gutterBottom
              variant="h6"
            >
              {dataset.user}
            </Typography>
            <Typography
              align="center"
              variant="body2"
            >
              {dataset.description.slice(0, 175) + '...'}
            </Typography>
          </CardContent>
        </Link>
        <Divider />
        <CardActions>
          <Grid
            container
            justify="space-between"
          >
            <Grid
              className={classes.statsItem}
              item
            >
              <AccessTimeIcon className={classes.statsIcon} />
              <Typography
                display="inline"
                variant="body2"
              >
                    Updated 2hr ago
              </Typography>
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
              <BookmarksIcon className={classes.statsIcon} />
              <Typography
                display="inline"
                variant="body2"
              >
                {dataset.totalDownloads} Bookmarks
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}


DatasetCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  dataset: PropTypes.object.isRequired
};

export default withStyles(styles)(DatasetCard);
