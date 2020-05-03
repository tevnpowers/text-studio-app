import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Button,
} from '@material-ui/core';

import { DatasetViewer } from 'components'

const useStyles = makeStyles(() => ({
  root: {},
  container: {
    margin: '0 auto',
    width: '100%'
  },
  child: {
    paddingBottom: '10px',
  }
}));

const DatasetEditor = props => {
  const { className, data, ...rest } = props;
  const classes = useStyles();

  const getLanguageChips = languages => {
    let chips = []
    for (var lang of languages) {
      chips.push(
        <Chip
          color="primary"
          key={lang}
          label={lang}
          size="small"
          variant="outlined"
        />
      )
    }

    return chips
  }

  return (
    <div className={classes.container}>
      <div className={classes.child}>
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <form
            autoComplete="off"
            noValidate
          >
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <EditOutlinedIcon />
                </IconButton>
              }
              subheader={data.path}
              title={data.name}
            />
            <Divider />
            <CardContent>
              <div className={classes.container}>
                <Typography
                  className={classes.child}
                  gutterBottom
                  variant="body2"
                >
                  {data.description}
                </Typography>
                {getLanguageChips(data.languages)}
              </div>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                variant="contained"
              >
            Save
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
      <div className={classes.child}>
        <DatasetViewer
          id={data.id}
        />
      </div>
    </div>
  );
};

DatasetEditor.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object
};

export default DatasetEditor;
