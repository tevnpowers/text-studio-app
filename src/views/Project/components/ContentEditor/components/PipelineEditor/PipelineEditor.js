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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '20%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  actionItem: {
    display: 'flex',
    alignItems: 'center'
  },
  actionContainer: {
    paddingLeft: theme.spacing(1)
  }
}));

const PipelineEditor = props => {
  const { data, components, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({

  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const getPipelineComponents = (pipelineComponents, projectComponents) => {
    let inputs = []
    inputs.push(
      <div
        className={classes.child}
        key={'pipelineHeader' + id}
      >
        <Typography
          gutterBottom
          variant="h4"
        >
          Pipeline Components
        </Typography>
      </div>
    )

    for (var id of pipelineComponents) {
      for (var item of projectComponents) {
        if (id === item.id) {
          inputs.push(
            <ExpansionPanel
              key={item.id}
            >
              <ExpansionPanelSummary
                aria-controls="panel1a-content"
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{item.name}</Typography>
                <Typography className={classes.secondaryHeading}>{item.description.slice(0, 115) + '....'}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {item.description}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        }
      }
    }
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
          action={
            <IconButton aria-label="settings">
              <EditOutlinedIcon />
            </IconButton>
          }
          subheader={data.id}
          title={'Pipeline'}
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
                helperText={'Display name for this pipeline in your project'}
                label="Name"
                margin="dense"
                name="annotatorName"
                onChange={handleChange}
                required
                value={data.name}
                variant="outlined"
              />
            </div>
            {getPipelineComponents(data.components, components)}
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
              <IconButton>
                <PlayCircleFilledWhiteOutlinedIcon color="primary"/>
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
};

PipelineEditor.propTypes = {
  components: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export default PipelineEditor;
