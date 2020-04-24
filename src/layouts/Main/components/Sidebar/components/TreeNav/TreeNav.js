import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StyledTreeItem } from './components';

const useStyles = makeStyles({
  root: {
    height: '100%',
    flexGrow: 1,
    maxWidth: 200,
    marginLeft: 10,
    marginBottom: 0,
  },
});

export default function TreeNav() {
  const classes = useStyles();

  const projects = [
    { 
      title: 'Demo Project',
      unsavedItems: 1,
      id: '1',
      href: '/projects',
    },
    {
      title: 'Exploratory Data Analysis',
      unsavedItems: 4,
      id: '2',
      href: '/projects',
    },
    {
      title: 'Thesis',
      unsavedItems: 0,
      id: '3',
      href: '/projects',
    }
  ]

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={['0']}
      defaultExpandIcon={<ArrowRightIcon />}
    >
      <StyledTreeItem
        labelText="Your Projects"
        nodeId="0"
        id="0"
        rootNode
      >
        {projects.map(project => (
          <StyledTreeItem
            bgColor="#e8f0fe"
            color="#1a73e8"
            href={project.href}
            id={project.id}
            key={project.id}
            labelInfo={project.unsavedItems}
            labelText={project.title}
            nodeId={project.id}
            rootNode={false}
          />
        ))}
      </StyledTreeItem>
    </TreeView>
  );
}
