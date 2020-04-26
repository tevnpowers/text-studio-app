/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ProjectTab, TabPanel } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    height: '100%',
  },
  header: {
    color: '#969696'
  },
  icon: {
    height: '12px',
    width: '12px',
    padding: 0
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  tabPanel: {
    // backgroundColor: '#DEE6E7',
  }
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Browse = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTab = (title, id) => {
    return (
      <Tab
        component="div"
        label={title}
        {...a11yProps(id-1)}
      />
    )
  }


  return (
    <div className={classes.root}>
      <AppBar
        color="default"
        elevation={0}
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
          {getTab('Projects', 1)}
          {getTab('Datasets', 2)}
          {getTab('Extensions', 2)}
        </Tabs>
      </AppBar>
      <TabPanel
        className={classes.tabPanel}
        index={0}
        value={value}
      >
        <ProjectTab />
      </TabPanel>
      <TabPanel
        className={classes.tabPanel}
        index={1}
        value={value}
      >
        <ProjectTab />
      </TabPanel>
      <TabPanel
        className={classes.tabPanel}
        index={2}
        value={value}
      >
        <ProjectTab />
      </TabPanel>
    </div>
  );
};

Browse.propTypes = { };

export default Browse;