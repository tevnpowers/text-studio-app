import React from 'react';
import TextForm from './Form';
import './index.css';

const { ipcRenderer } = require('electron');
const {
  OPEN_PROJECT
} = require('../../utils/constants.js')

class Project extends React.Component {
    constructor(props) {
      super(props);
      this.setIpcFuncs = this.setIpcFuncs.bind(this);

      this.state = {
          info: null,
      };
      this.setIpcFuncs();
    }

    render() {
      return (
        <div>
          <TextForm />
          <label>
          Project Info: {this.state.info}
          </label>
        </div>
      );
    };

    setIpcFuncs() {
        ipcRenderer.on(OPEN_PROJECT, (event, arg) => {
            this.setState({info: arg});
            console.log(this.state.info['author'])
        });
    }
}

export default Project;