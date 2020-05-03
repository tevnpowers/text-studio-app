/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ProjectTab, TabPanel } from './components';
import { SearchInput } from 'components';
import { removeListeners, setIpcFuncs } from '../../Redirect'

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
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
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
  const [redirectInfo, setRedirectInfo] = useState({});


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

  const onProjectReceive = (redirect, info) => {
    //console.log('redirecting to...', redirect)
    let obj = {
      projectInfo: info,
      redirect: '/projects/' + redirect
    }
    setRedirectInfo(obj)
  }

  useEffect(() => {
    setIpcFuncs(onProjectReceive);

    // Specify how to clean up after this effect:
    return function cleanup() {
      removeListeners();
    };
  });

  if (redirectInfo.redirect && redirectInfo.projectInfo) {
    console.log('Redirecting: ', redirectInfo)
    return (
      <Redirect
        to={{
          pathname: redirectInfo.redirect,
          state: { projectInfo: redirectInfo.projectInfo }
        }}
      />)
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder={'Search Text Studio items...'}
        />
      </div>
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
        <ProjectTab type="projects"/>
      </TabPanel>
      <TabPanel
        className={classes.tabPanel}
        index={1}
        value={value}
      >
        <ProjectTab type="datasets"/>
      </TabPanel>
      <TabPanel
        className={classes.tabPanel}
        index={2}
        value={value}
      >
        <ProjectTab type="extensions"/>
      </TabPanel>
    </div>
  );
};

Browse.propTypes = { };

export default Browse;