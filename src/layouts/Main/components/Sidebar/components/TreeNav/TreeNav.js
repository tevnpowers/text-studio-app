import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StyledTreeItem } from './components';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    marginLeft: 10,
  },
});

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

const datasets = [
  { 
    title: 'Student Dataset',
    unsavedItems: 0,
    id: '1',
    href: '/projects',
  },
  {
    title: 'Fanfiction Stories (Clean)',
    unsavedItems: 0,
    id: '2',
    href: '/projects',
  },
  {
    title: 'Fanfiction Fandoms',
    unsavedItems: 0,
    id: '3',
    href: '/projects',
  }
]

const extensions = [
  { 
    title: 'HTML Parser',
    unsavedItems: 0,
    id: '1',
    href: '/projects',
  }
]

export default function TreeNav(props) {
  const { type, ...rest } = props;
  const classes = useStyles();

  let items;
  let labelText;
  if (type === 'projects') {
    items = projects;
    labelText = 'Your Projects';
  } else if (type === 'data') {
    items = datasets;
    labelText = 'Your Data';
  } else if (type === 'extensions') {
    items = extensions;
    labelText = 'Your Extensions';
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={['0']}
      defaultExpandIcon={<ArrowRightIcon />}
    >
      <StyledTreeItem
        id="0"
        labelText={labelText}
        nodeId="0"
        rootNode
      >
        {items.map(item => (
          <StyledTreeItem
            bgColor="#e8f0fe"
            color="#1a73e8"
            href={item.href}
            id={item.id}
            key={item.id}
            labelInfo={item.unsavedItems}
            labelText={item.title}
            nodeId={item.id}
            rootNode={false}
          />
        ))}
      </StyledTreeItem>
    </TreeView>
  );
}
