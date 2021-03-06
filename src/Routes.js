import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Browse as BrowseView,
  Home as HomeView,
  Dataset as DatasetView,
  Project as ProjectView,
  Dashboard as DashboardView,
  Account as AccountView,
  Settings as SettingsView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/home"
      />
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MainLayout}
        path="/home"
      />
      <RouteWithLayout
        component={ProjectView}
        exact
        layout={MainLayout}
        path="/projects/:projectId"
      />
      <RouteWithLayout
        component={BrowseView}
        exact
        layout={MainLayout}
        path="/browse"
      />
      <RouteWithLayout
        component={DatasetView}
        exact
        layout={MainLayout}
        path="/dataset/:datasetId"
      />
      <RouteWithLayout
        component={BrowseView}
        exact
        layout={MainLayout}
        path="/bookmarks"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
