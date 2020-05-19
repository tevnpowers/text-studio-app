import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { removeListeners, setIpcFuncs } from '../../Redirect'
import { v4 as uuidv4 } from 'uuid';
const { ipcRenderer } = require('electron');
const {
  EXECUTE_MODULE,
  EXECUTION_STATUS,
  GET_DATASET,
  RETURN_DATASET,
} = require('../../../utils/constants')

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

const projectItemsToSkip = [
  'metadata',
  'path',
]

const Project = (props) => {
  const classes = useStyles();
  let initialProjectInfo = null;
  if (props.location.state && props.location.state.projectInfo) {
    initialProjectInfo = props.location.state.projectInfo;
  }

  const [projectInfo, setProjectInfo] = useState(initialProjectInfo);
  const [openTabs, setOpenTabs] = useState([]);
  const [datasets, setDatasets] = useState({});
  const [executionStatus, setExecutionStatus] = useState({});

  useEffect(() => {
    if (props.location.state) {
      setProjectInfo(props.location.state.projectInfo)
    }
  }, [props]);

  useEffect(() => {
    setIpcFuncs(onProjectReceive);
    ipcRenderer.once(RETURN_DATASET, (event, arg) => {
      console.log('received dataset info!')
      setDatasets({
        ...datasets,
        [arg.id]: arg.data
      })
    });

    ipcRenderer.on(EXECUTION_STATUS, (event, arg) => {
      // console.log('Received execution status: ', arg)
      setExecutionStatus({
        ...executionStatus,
        [arg.moduleId]: {
          [arg.id]: arg.status
        }
      })
    });

    // Specify how to clean up after this effect:
    return function cleanup() {
      ipcRenderer.removeAllListeners(EXECUTION_STATUS);
      removeListeners();
    };
  });

  const onProjectReceive = (redirect, info) => {
    info.metadata.id = redirect
    setProjectInfo(info)
    //setProjectId(redirect)
  }

  const openProjectItem = (id) => {
    let tabs = openTabs.slice()
    if (!tabs.includes(id)) {
      tabs.push(id)
      for (var i in elements) {
        if (id === elements[i].id && elements[i].type == 'data') {
          ipcRenderer.send(GET_DATASET, id);
        }
      }
      setOpenTabs(tabs)
    }
  }

  const runModule = (id, settings) => {
    let executionInfo = { }
    if (projectInfo.actions.some((action) => id === action.id)) {
      executionInfo[id] = -1
    } else if (projectInfo.annotators.some((annotator) => id === annotator.id)) {
      executionInfo[id] = -1
    } else {
      for (var i in projectInfo.pipelines) {
        var pipeline = projectInfo.pipelines[i];
        if (pipeline.id === id) {
          for (var j in pipeline.components) {
            executionInfo[pipeline.components[j]] = -1
          }
        }
      }
    }

    let executionId = uuidv4();
    setExecutionStatus({
      ...executionStatus,
      [id]: {
        ...executionStatus[id],
        [executionId] : executionInfo
      }
    })

    ipcRenderer.send(EXECUTE_MODULE, {
      id: executionId,
      input: settings.input,
      moduleId: id,
      output: settings.output,
      projectId: projectInfo.metadata.id,
      status: executionInfo
    });
  }

  const closeProjectItem = (id) => {
    let tabs = []
    for (var openId of openTabs) {
      if (openId !== id) {
        tabs.push(openId)
      }
    }

    setOpenTabs(tabs)
  }

  const getProjectNodes = (node, type) => {
    let elements = [];
    if (Array.isArray(node)) {
      for (var i in node) {
        let childNode = node[i];
        childNode.type = type;
        if (typeof childNode === 'object' && childNode !== null) {
          elements.push(childNode)
        }
      }
    }
    return elements;
  }

  const getProjectElements = (project) => {
    let elements = [];
    for (var key in project) {
      if (!projectItemsToSkip.includes(key)) {
        elements = elements.concat(getProjectNodes(project[key], key))
      }
    }
    return elements
  }

  let elements = getProjectElements(projectInfo);
  return (
    <div
      className={classes.root}
    >
      <div className={classes.container}>
        <div className={classes.fixed}>
          <FileTray
            onNodeClick={openProjectItem}
            projectContents={projectInfo}
          />
        </div>
        <div>
          <ContentEditor 
            datasets={datasets}
            elements={elements}
            executionStatus={executionStatus}
            onRunModule={runModule}
            onTabClose={closeProjectItem}
            tabs={openTabs}
          />
        </div>
      </div>
    </div>
  );
};


Project.propTypes = {
  location: PropTypes.object
};

export default Project;
