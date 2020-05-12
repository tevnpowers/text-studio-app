import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minWidth: 750
  },
  container: {
    //margin: '0 auto',
    //width: '100%'
  },
  child: {
    //paddingBottom: '10px',
  },
  actionItem: {
    display: 'flex',
    alignItems: 'center'
  },
  actionContainer: {
    paddingLeft: theme.spacing(1)
  }
}));

const AnnotatorEditor = props => {
  const { data, onRunAnnotator, type, ...rest } = props;

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

  const getConfigInput = (data, classes, type, id) => {
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
          {type === 'annotators' ? 'Parameters' : 'Configuration'}
        </Typography>
      </div>
    )

    let configArray = null;
    if (type === 'annotators' || type === 'actions') {
      configArray = data.config.keys;
    } else {
      configArray = data.config;
    }

    configArray.map(key => {
      inputs.push(
        <div
          className={classes.child}
          key={'key' + key.name + id}
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


    if (type === 'annotators') {
      // Annotations
      inputs.push(
        <div
          className={classes.child}
          key={'annotationHeader' + id}
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
            key={'annotation' + annotation.name + id}
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
    }
    return inputs
  }

  let header = ''
  if (type === 'annotators') {
    header = 'Annotator'
  } else if (type === 'actions') {
    header =' Action'
  } else if (type === 'loaders') {
    header =' Dataset Loader'
  } else {
    header = type
  }

  let descriptionText = header.toLowerCase()

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
          action={
            <IconButton aria-label="settings">
              <EditOutlinedIcon />
            </IconButton>
          }
          subheader={data.id}
          title={header}
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
                helperText={'Display name for this ' + descriptionText + ' in your project'}
                label="Name"
                margin="dense"
                name="annotatorName"
                onChange={handleChange}
                required
                value={data.config.name}
                variant="outlined"
              />
            </div>
            {getConfigInput(data, classes, type, data.id)}
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid
            alignItems="center"
            className={classes.actionContainer}
            container
            justify="flex-start"
            spacing={5}
          >
            <Grid
              className={classes.actionItem}
              item
            >
              <Button
                color="primary"
                variant="contained"
              >
          Save
              </Button>
            </Grid>
            <Grid
              className={classes.actionItem}
              item
            >
              <IconButton
                onClick={() => onRunAnnotator(data.id)}
              >
                <PlayCircleFilledWhiteOutlinedIcon
                  color="primary"
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
};

AnnotatorEditor.propTypes = {
  data: PropTypes.object.isRequired,
  onRunAnnotator: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default AnnotatorEditor;
