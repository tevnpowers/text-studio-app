/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { StyledTreeItem } from './components';
import TreeView from '@material-ui/lab/TreeView';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white,
    padding: 20
  },
  divider: {
    marginTop: 10
  }
}));

const projectItemsToSkip = [
  'metadata'
]

function MinusSquare(props) {
  return (
    <SvgIcon
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}
  
function PlusSquare(props) {
  return (
    <SvgIcon
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function crawlProjectTree(node)  {
  let elements = [];
  if (Array.isArray(node)) {
    for (var i in node) {
      let childNode = node[i];
      if (typeof childNode === 'object' && childNode !== null) {
        elements.push(
          <StyledTreeItem
            key={childNode.name}
            label={childNode.name}
            nodeId={childNode.name}
          />
        )
      }
    }
  }
  return elements;
}

function getTreeItems(project) {
  let elements = [];
  for (var key in project) {
    if (!projectItemsToSkip.includes(key)) {
      elements.push(
        <StyledTreeItem
          key={key}
          label={key}
          nodeId={key}
        >
          {crawlProjectTree(project[key])}
        </StyledTreeItem>
      )
    }
  }
  return elements
}

export default function FileTray(props) {
  const { projectContents } = props;
  const classes = useStyles();

  return (
    <Paper 
      className={classes.root}
      elevation={5}
    >
      <TreeView
        defaultCollapseIcon={<MinusSquare />}
        defaultExpanded={['1']}
        defaultExpandIcon={<PlusSquare />}
      >
        <StyledTreeItem
          label="Main"
          nodeId="1"
        >
          {getTreeItems(projectContents)}
        </StyledTreeItem>
      </TreeView>
      <Divider className={classes.divider} />
    </Paper>
  );
}

FileTray.propTypes = {
  projectContents: PropTypes.object.isRequired
};