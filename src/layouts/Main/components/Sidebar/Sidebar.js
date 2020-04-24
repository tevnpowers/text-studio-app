import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Typography as MuiTypography } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import FolderOpenRoundedIcon from '@material-ui/icons/FolderOpenRounded';
import WidgetsOutlinedIcon from '@material-ui/icons/WidgetsOutlined';
import ExtensionIcon from '@material-ui/icons/Extension';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { SidebarNav, TreeNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    marginTop: 0,
    height: '100%'
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Home',
      href: '/home',
      icon: <HomeOutlinedIcon />
    },
    {
      title: 'Browse',
      href: '/browse',
      icon: <WidgetsOutlinedIcon />
    },
    {
      title: 'Bookmarks',
      href: '/bookmarks',
      icon: <BookmarksOutlinedIcon />
    }
  ]
  const otherPages = [
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsOutlinedIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={classes.toolbar} />
      <Divider />
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        <Divider />
        <TreeNav />
        <SidebarNav
          className={classes.nav}
          pages={otherPages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
