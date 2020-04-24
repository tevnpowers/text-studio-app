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
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  container: {
    //margin: '0 auto',
    //width: '100%'
  },
  child: {
    //paddingBottom: '10px',
  }
}));

const AnnotatorEditor = props => {
  const { data, type, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const getConfigInput = (data, classes) => {
    let inputs = []

    // Keys
    inputs.push(
      <div
        className={classes.child}
        key="keyHeader"
      >
        <Typography
          gutterBottom
          variant="h4"
        >
        Parameters
        </Typography>
      </div>
    )

    data.config.keys.map(key => {
      inputs.push(
        <div
          className={classes.child}
          key={'key' + key}
        >
          <TextField
            fullWidth
            helperText={key.description}
            label={key.name}
            margin="dense"
            name={key + 'Name'}
            onChange={handleChange}
            required
            value={key.value}
            variant="outlined"
          />
        </div>
      )
    })


    // Annotations
    inputs.push(
      <div
        className={classes.child}
        key="annotationHeader"
      >
        <Typography
          gutterBottom
          variant="h4"
        >
          Output
        </Typography>
      </div>
    )
  
    data.config.annotations.map(annotation => {
      inputs.push(
        <div
          className={classes.child}
          key={'annotation' + annotation}
        >
          <TextField
            fullWidth
            helperText={annotation.description}
            label={annotation.name}
            margin="dense"
            name={annotation + 'Name'}
            onChange={handleChange}
            required
            value={annotation.value}
            variant="outlined"
          />
        </div>
      )
    })
    return inputs
  }

  return (
    <Card
      {...rest}
      className={classes.root}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader={data.id}
          title={'Annotator'}
        />
        <Divider />
        <CardContent>
          <div className={classes.container}>
            <div
              className={classes.child}
              key="description"
            >
              <Typography
                gutterBottom
                variant="body2"
              >
                {data.description}
              </Typography>
            </div>
            <div
              className={classes.child}
              key="annotatorName"
            >
              <TextField
                fullWidth
                helperText="Display name for this annotator in your project"
                label="Name"
                margin="dense"
                name="annotatorName"
                onChange={handleChange}
                required
                value={data.config.name}
                variant="outlined"
              />
            </div>
            {getConfigInput(data, classes)}
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
  );
};

AnnotatorEditor.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default AnnotatorEditor;
