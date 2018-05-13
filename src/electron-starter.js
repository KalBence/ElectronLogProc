//import { DEFAULT_ENCODING } from 'crypto';

const electron = require('electron');
const {Menu, shell, dialog, ipcMain} = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

var fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const template = [
    {
      label: 'File',
      submenu: [{
          label: 'Open',
          click: function (item, focusedWindow) {

            dialog.showOpenDialog((fileNames) => {
                // fileNames is an array that contains all the selected
                if(fileNames === undefined){
                    console.log("No file selected");
                    return;
                }
            
                fs.readFile(fileNames[0], 'utf-8', (err, dataIn) => {
                    if(err){
                        alert("An error ocurred reading the file :" + err.message);
                        return;
                    }
            
                    // Change how to handle the file content
                    console.log("The file content is : " + dataIn);
                });
            });  

          }
        }]
    },
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    },
    {
      label: 'Parsing',
      submenu : [{
          label: 'New Regex',
          click: function (item, focusedWindow) {
            if (focusedWindow) {
      
              addWindow = new BrowserWindow({width: 500, height: 300})
              addWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'newRegex.html'),
                protocol: 'file:',
                slashes: true
              }))
      
              addWindow.on('closed', function () {
                addWindow = null
              })
            }
          }
        }]
    }
  ]

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1400, height: 900});

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('new-regex', (event, arg) => {
  mainWindow.webContents.send('new-regex', arg)
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.