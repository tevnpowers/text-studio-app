import React from 'react';
import Paper from '@material-ui/core/Paper';
import TabBrowser from '../TabBrowser'
import { datasets, extensions, projects } from './data'

export default function ProjectTab(props) {
/* 
  classes: PropTypes.object,
  endIndex: PropTypes.number,
  items: PropTypes.array,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  startIndex: PropTypes.number,
  total: PropTypes.number
*/
  let collection = null;
  if (props.type === 'projects') {
    collection = projects
  } else if (props.type === 'datasets') {
    collection = datasets
  } else if (props.type === 'extensions') {
    collection = extensions
  }

  console.log(collection)
  return (
    <TabBrowser
      endIndex={10}
      items={collection}
      startIndex={1}
      total={10}
    />
  );
}

ProjectTab.propTypes = {
};