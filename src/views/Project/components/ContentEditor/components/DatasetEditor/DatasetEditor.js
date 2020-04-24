import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
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
              </div>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                variant="contained"
              >
            Save details
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
