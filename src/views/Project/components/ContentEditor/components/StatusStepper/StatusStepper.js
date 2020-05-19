import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  completedContainer: {
    paddingBottom: theme.spacing(3),
  },
  progress: {
    paddingBottom: theme.spacing(3),
  },
}));

const StatusStepper = props => {
  const { complete, pipeline } = props;
  const classes = useStyles();

  let activeStep = complete ? pipeline.length : 0;
  let inProgressStep = false;
  let nextStep = -1;
  let stepsCompleted = {};
  let failedCount = 0;
  let stepsFailed = {};
  let completionMessage = 'All steps completed successfully!'
  for (var i = 0; i < pipeline.length; i++) {
    if (pipeline[i].status === 1) {
      activeStep = i;
      inProgressStep = true;
    } else if (pipeline[i].status === 3) {
      failedCount++;
    } else if (pipeline[i].status === -1 && nextStep === -1) {
      nextStep = i;
    }

    stepsFailed[pipeline[i].id] = pipeline[i].status === 3;
    stepsCompleted[pipeline[i].id] = pipeline[i].status === 2;
  }

  if (!inProgressStep && nextStep >= 0) {
    activeStep = nextStep;
  }

  if (failedCount > 0) {
    completionMessage = 'Completed with ' + failedCount + ' errors.';
  }

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
      >
        {pipeline.map(component => (
          <Step
            completed={stepsCompleted[component.id]}
            key={component.id}
          >
            <StepLabel error={stepsFailed[component.id]}>{component.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep !== pipeline.length && (
        <div>
          <Box
            mx="auto"
            my={0.5}
            pb={3}
            width={3 / 4}
          >
            <LinearProgress
              color="secondary"
            />
          </Box>
        </div>
      )}
      {activeStep === pipeline.length && (
        <Paper
          className={classes.completedContainer}
          elevation={0}
          square
        >
          <Typography variant="h5">{completionMessage}</Typography>
        </Paper>
      )}
    </div>
  );
}

StatusStepper.propTypes = {
  complete: PropTypes.bool.isRequired,
  pipeline: PropTypes.array
};
  
export default StatusStepper;