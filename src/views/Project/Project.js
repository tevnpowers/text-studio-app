import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import projectData from './data';

import {
  ContentEditor,
  FileTray
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    height: '100%'
    // height: '85vh',
    // minHeight: 750,
  },
  container: {
    display: 'flex',
    height: '100%',
    margin: 0,
    padding: 0
  },
  fixed: {
    minWidth: 200,
    paddingRight: 25
  },
  flexItem: {
    flexGrow: 1
  }
}));

const Project = (props) => {
  const classes = useStyles();
  let projectId = props.match.params.projectId

  return (
    <div
      className={classes.root}
    >
      <div className={classes.container}>
        <div className={classes.fixed}>
          <FileTray projectContents={projectData}/>
        </div>
        <div>
          <ContentEditor 
            data={projectData}
          />
        </div>
      </div>
    </div>
  );
};


Project.propTypes = {
  match: PropTypes.object
};

export default Project;
