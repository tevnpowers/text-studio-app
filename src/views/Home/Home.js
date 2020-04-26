import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { BrowserToolbar, Carousel } from './components';

import mockData from './data';

const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

const VISIBLE_ITEMS = 3

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: mockData,
      datasetsStart: 0,
      extensionsStart: 0,
      projectsStart: 0,
    }

    this.totalDatasets = mockData.length;
    this.totalExtensions = mockData.length;
    this.totalProjects = mockData.length;
    this.createNew = this.createNew.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.searchDatasets = this.searchDatasets.bind(this);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <div>
          <BrowserToolbar
            buttonText={'New Project'}
            heading={'Recent Projects'}
            onChange={this.searchDatasets}
            onNewClick={() => this.createNew(0)}
            searchPlaceholder="Search projects..."
          />
          <Carousel
            endIndex={this.state.projectsStart + VISIBLE_ITEMS}
            items={this.state.datasets.slice(this.state.projectsStart, this.state.projectsStart + VISIBLE_ITEMS)}
            newText="New Project"
            nextPage={() => this.nextPage(0)}
            previousPage={() => this.previousPage(0)}
            startIndex={this.state.projectsStart + 1}
            total={this.totalProjects}
            type="project"
          />
        </div>
        <div>
          <BrowserToolbar
            buttonText={'New Dataset'}
            heading={'Recent Datasets'}
            onChange={this.searchDatasets}
            onNewClick={() => this.createNew(1)}
            searchPlaceholder="Search datasets..."
          />
          <Carousel
            endIndex={this.state.datasetsStart + VISIBLE_ITEMS}
            items={this.state.datasets.slice(this.state.datasetsStart, this.state.datasetsStart + VISIBLE_ITEMS)}
            newText="New Dataset"
            nextPage={() => this.nextPage(1)}
            previousPage={() => this.previousPage(1)}
            startIndex={this.state.datasetsStart + 1}
            total={this.totalDatasets}
            type="dataset"
          />
        </div>
        <div>
          <BrowserToolbar
            buttonText={'New Extension'}
            heading={'Recent Extensions'}
            onChange={this.searchDatasets}
            onNewClick={() => this.createNew(2)}
            searchPlaceholder="Search extensions..."
          />
          <Carousel
            endIndex={this.state.extensionsStart + VISIBLE_ITEMS}
            items={this.state.datasets.slice(this.state.extensionsStart, this.state.extensionsStart + VISIBLE_ITEMS)}
            newText="New Extension"
            nextPage={() => this.nextPage(2)}
            previousPage={() => this.previousPage(2)}
            startIndex={this.state.extensionsStart + 1}
            total={this.totalDatasets}
            type="extension"
          />
        </div>
      </div>
    );
  }

  searchDatasets(event) {
    // TO DO: Replace with dataset search!
    console.log(event.target.value);
  }

  createNew(caller) {
    // TO DO: Replace with new project item!
    if (caller === 0) {
      console.log('Create new project!');
    } else if (caller === 1) {
      console.log('Create new dataset!');
    } else if (caller === 2) {
      console.log('Create new extension!');
    }
  }

  nextPage(caller) {
    let nextStart;
    if (caller === 0) {
      nextStart = Math.min(this.totalProjects - VISIBLE_ITEMS, this.state.projectsStart + VISIBLE_ITEMS)
      this.setState(state => ({
        projectsStart: nextStart
      }));
    } else if (caller === 1) {
      nextStart = Math.min(this.totalDatasets - VISIBLE_ITEMS, this.state.datasetsStart + VISIBLE_ITEMS)
      this.setState(state => ({
        datasetsStart: nextStart
      }));
    } else if (caller === 2) {
      nextStart = Math.min(this.totalExtensions - VISIBLE_ITEMS, this.state.extensionsStart + VISIBLE_ITEMS)
      console.log('next start', nextStart)
      this.setState(state => ({
        extensionsStart: nextStart
      }));
    }
  }

  previousPage(caller) {
    let nextStart;
    if (caller === 0) {
      nextStart = Math.max(0, this.state.projectsStart - VISIBLE_ITEMS)
      this.setState(state => ({
        projectsStart: nextStart
      }));
    } else if (caller === 1) {
      nextStart = Math.max(0, this.state.datasetsStart - VISIBLE_ITEMS)
      this.setState(state => ({
        datasetsStart: nextStart
      }));
    } else if (caller === 2) {
      nextStart = Math.max(0, this.state.extensionsStart - VISIBLE_ITEMS)
      this.setState(state => ({
        extensionsStart: nextStart
      }));
    }
  }
}

Home.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Home);
