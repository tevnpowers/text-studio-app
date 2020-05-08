const { ipcRenderer } = require('electron');
const { OPEN_PROJECT, RETURN_DATASET } = require('../utils/constants');
///import projectData from './views/Project/data';


const setIpcFuncs = (onProjectReceive) => {
  ipcRenderer.on(OPEN_PROJECT, (event, arg) => {
    let info = JSON.parse(arg)
    console.log('Received new project!', info)
    onProjectReceive('543534', info)
  })
}

const removeListeners = () => {
  // console.log('removing all listeners!')
  ipcRenderer.removeAllListeners(OPEN_PROJECT);
  ipcRenderer.removeAllListeners(RETURN_DATASET);
}

module.exports = {
  setIpcFuncs,
  removeListeners
}