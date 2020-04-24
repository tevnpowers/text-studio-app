/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AnnotatorEditor, DatasetEditor, TabPanel } from './components';
import { Dataset } from 'views';


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
  const { className, data, ...rest } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleTabClick = (event, tab) => {
    let tabId = event.target.getAttribute('id');
    event.stopPropagation();
  };

  const getTab = (title, id) => {
    return (
      <Tab
        component="div"
        label={
          <div
            className={classes.tabContainer}
          >
            {title}
            <IconButton
              id={id}
              onClick={handleTabClick}
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
          {getTab('HTML Parser', 1)}
          {getTab('Fanfiction Dataset', 2)}
        </Tabs>
      </AppBar>
      <TabPanel
        index={0}
        value={value}
      >
        <AnnotatorEditor
          data={data.annotators[0]}
          type={'annotator'}
        />
      </TabPanel>
      <TabPanel
        index={1}
        value={value}
      >
        <DatasetEditor data={data.data[0]}/>
      </TabPanel>
    </div>
  );
};

ContentEditor.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default ContentEditor;