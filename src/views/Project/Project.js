import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { removeListeners, setIpcFuncs } from '../../Redirect'
const { ipcRenderer } = require('electron');
const { GET_DATASET, RETURN_DATASET } = require('../../../utils/constants')

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

  useEffect(() => {
    if (props.location.state) {
      setProjectInfo(props.location.state.projectInfo)
    }
  }, [props]);

  useEffect(() => {
    setIpcFuncs(onProjectReceive);
    ipcRenderer.once(RETURN_DATASET, (event, arg) => {
      setDatasets({
        ...datasets,
        [arg.id]: arg.data
      })
    });

    // Specify how to clean up after this effect:
    return function cleanup() {
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
