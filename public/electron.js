const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Pomorodo",
    width: 400,
    height: 430,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, '../build/index.html'), //connect app to react
    protocol: 'file:',
    slashes: true,
  });

  mainWindow.loadURL(startUrl); //loaad app in electron window

}
app.whenReady().then(createMainWindow);