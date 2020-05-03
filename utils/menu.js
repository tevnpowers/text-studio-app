const { BrowserWindow, dialog, Menu } = require('electron')
const { openProject, tokenizeText } = require('../renderer.js')
const { OPEN_PROJECT, RETURN_DATASET } = require('../utils/constants.js')

// Menu
function setMainMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: "Text Studio",
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        { label: 'New Project' },
        { label: 'New Dataset' },
        { type: 'separator' },
        {
          label: 'Open Project',
          accelerator: 'CmdOrCtrl+O',
          click: openProjectFromMenu
        },
        {
          label: 'Open Dataset',
          click: openDatasetFromMenu
        },
        { type: 'separator' },
        { label: 'Save' },
        { type: 'separator' },
        { role: isMac ? 'close' : 'quit' }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ]
    
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function openProjectFromMenu(event, focusedWindow, focusedWebContents) {
  let path = dialog.showOpenDialog({
    title: 'Open Project',
    filters: [
      {name: 'JSON', extensions: ['json']}
    ],
    properties: ['openFile']
  })

  //console.log('Opening: ', path)

  if (path !== undefined && path.length == 1) {
    path = path[0]
    openProject(path).then(response => {
      let window = BrowserWindow.getFocusedWindow()
      //console.log('Sending response: ', response)
      window.webContents.send(OPEN_PROJECT, response);
    });
  }
}

function openDatasetFromMenu(event, focusedWindow, focusedWebContents) {
  // TO DO: redirect to dataset view
  let path = dialog.showOpenDialog({
    title: 'Open Dataset',
    filters: [
      {name: 'csv', extensions: ['csv']},
      {name: 'tsv', extensions: ['tsv']}
    ],
    properties: ['openFile']
  })

  if (path !== undefined && path.length == 1) {
    path = path[0]
    openProject(path).then(response => {
      let window = BrowserWindow.getFocusedWindow()
      window.webContents.send(RETURN_DATASET, response);
    });
  }
}

module.exports = {
  setMainMenu
}