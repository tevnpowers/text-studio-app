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
    //console.log('useEffect (after PROPS change) real: ', props)
    if (props.location.state) {
      setProjectInfo(props.location.state.projectInfo)
    }
  }, [props]);

  useEffect(() => {
    //console.log('useEffect (after MOUNT) real: ', projectId, ' initial: ', initialProjectId)
    //console.log('setting up ipc funcs...')
    setIpcFuncs(onProjectReceive);
    ipcRenderer.once(RETURN_DATASET, (event, arg) => {
      console.log('updating data upon return...', arg.id)
      console.log({
        ...datasets,
        [arg.id]: arg.data
      })
      setDatasets({
        ...datasets,
        [arg.id]: arg.data
      })
    });

    // Specify how to clean up after this effect:
    return function cleanup() {
      //console.log('inside effects for cleanup')
      removeListeners();
    };
  });

  const onProjectReceive = (redirect, info) => {
    //console.log('redirecting to...', redirect)
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
          console.log('requesting dataset ', id)
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

  // console.log('re-rendering project...')
  //console.log('Open Tabs: ', {openTabs})
  let elements = getProjectElements(projectInfo);
  // console.log('before return real: ', projectId, ' initial: ', props.match.params.projectId)
  // Project Info: {JSON.stringify(projectInfo)}
  // console.log('project info ', projectInfo)
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
