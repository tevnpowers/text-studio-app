/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AnnotatorEditor, DatasetEditor, PipelineEditor, TabPanel } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#DEE6E7',
  },
  icon: {
    height: '12px',
    width: '12px',
    padding: 0
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const ContentEditor = props => {
  const { className, elements, tabs, onTabClose, ...rest } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleTabClick = (id) => {
    console.log('ID clicked: ', id)
    onTabClose(id)
    event.stopPropagation();
  };

  const getTab = (title, id) => {
    return (
      <Tab
        component="div"
        key={id}
        label={
          <div
            className={classes.tabContainer}
          >
            {title}
            <IconButton
              id={id}
              onClick={() => handleTabClick(id)}
            >
              <CloseRoundedIcon
                className={classes.icon}
              />
            </IconButton>
          </div>
        }
        {...a11yProps(id-1)}
      />
    )
  }

  const getTabs = (components, ids) => {
    let tabs = []
    for (var id of ids) {
      for (var component of components) {
        if (id === component.id) {
          tabs.push(getTab(component.name, component.id))
        }
      }
    }
    return tabs;
  }

  const getAnnotationEditor = (idx, obj) => {
    return (
      <TabPanel
        index={idx}
        key={obj.id}
        value={value}
      >
        <AnnotatorEditor
          data={obj}
          type={obj.type}
        />
      </TabPanel>)
  }

  const getPipelineEditor = (idx, obj, components) => {
    return (
      <TabPanel
        index={idx}
        key={obj.id}
        value={value}
      >
        <PipelineEditor
          components={components}
          data={obj}
        />
      </TabPanel>)
  }

  const getDatasetEditor = (idx, obj) => {
    return (
      <TabPanel
        index={idx}
        key={obj.id}
        value={value}
      >
        <DatasetEditor data={obj}/>
      </TabPanel>)
  }

  const getEditors = (components, ids) => {
    let editors = []
    for (var i = 0; i < ids.length; i++) {
      for (var component of components) {
        if (component.id === ids[i]) {
          if (component.type === 'annotators' ||
              component.type === 'loaders' ||
              component.type === 'actions') {
            editors.push(getAnnotationEditor(i, component))
          } else if (component.type === 'data') {
            editors.push(getDatasetEditor(i, component))
          } else if (component.type === 'pipelines') {
            editors.push(getPipelineEditor(i, component, components))
          }
        }
      }
    }
    return editors;
  }

  return (
    <div className={classes.root}>
      <AppBar
        color="default"
        position="static"
      >
        <Tabs
          aria-label="scrollable auto tabs example"
          indicatorColor="primary"
          onChange={handleChange}
          scrollButtons="auto"
          textColor="primary"
          value={value}
          variant="scrollable"
        >
          {getTabs(elements, tabs)}
        </Tabs>
      </AppBar>
      {getEditors(elements, tabs)}
    </div>
  );
};

ContentEditor.propTypes = {
  className: PropTypes.string,
  elements: PropTypes.array.isRequired,
  onTabClose: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired
};

export default ContentEditor;