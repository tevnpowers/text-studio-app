import React from 'react';
import Paper from '@material-ui/core/Paper';
import TabBrowser from '../TabBrowser'
import mockData from './data'

export default function ProjectTab() {
/* 
  classes: PropTypes.object,
  endIndex: PropTypes.number,
  items: PropTypes.array,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  startIndex: PropTypes.number,
  total: PropTypes.number
*/


  return (
    <TabBrowser
      endIndex={10}
      items={mockData}
      startIndex={1}
      total={10}
    />
  );
}

ProjectTab.propTypes = {
};