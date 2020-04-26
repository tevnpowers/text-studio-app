import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';


const styles = theme => ({
  root: {
    cursor: 'pointer',
    height: '100%',
    margin: 'auto',
    textAlign: 'center'
  },
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
  cardContent: {
    backgroundColor: theme.palette.background.default,
    border: '#bbbbbb',
    borderStyle: 'dashed', 
    height: '100%',
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

class NewItemCard extends React.Component {
  render() {
    const { classes, icon, text, ...rest } = this.props;
    return (
      <Card
        {...rest}
        className={classes.root}
        elevation={15}
      >
        <CardContent className={classes.cardContent}>
          <div className={classes.imageContainer}>
            {icon}
          </div>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}


NewItemCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  icon: PropTypes.object,
  text: PropTypes.string
};

export default withStyles(styles)(NewItemCard);
