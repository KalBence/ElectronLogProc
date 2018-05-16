const electron = window.require('electron');
const fs = electron.remote.require('fs');
const dialog = electron.remote.dialog;
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
//const {Menu, shell, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

export default function reducer(state={
    lines: [{message : ""}],
    ogLines: [],
    level: "",
    message: ""
}, action) {
    switch (action.type) {
        case "FETCH_LINES":
        {
            /*
            var loader = new BrowserWindow({width: 500, height: 300})
            loader.loadURL(url.format({
              pathname: path.join(__dirname, 'newRegex.html'),
              protocol: 'file:',
              slashes: true
            }))
    
            loader.on('closed', function () {
                loader = null
            })*/

            var regex = action.payload.regex;
            console.log(regex);

            //var levelRgx = new RegExp(/\[INF\]|\[DBG\]|\[WRN\]/);
            //var dateRgx = new RegExp(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{7})/);
            //var dateRgx = new RegExp(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/);

            var lineObjects = [];
            //console.log(dataIn.split('\n'));
            var linesArray = action.payload.logLines.split('\n');
         
            for (var l in linesArray)
            {
                var line = {};
                //var words = linesArray[l].split(' ');
                var t = linesArray[l].match(regex.rgx);
                if (t == null) {
                    var invalid = {
                        time : null,
                        level : "",
                        message : "invalid regex"
                    }
                    lineObjects.push(invalid);
                    return {
                        ...state,
                        lines: lineObjects,
                        ogLines: lineObjects
                    }
                }
                //line.time = new Date(t[1], t[2], t[3], t[4], t[5], t[6]);
                line.time = new Date(t[regex.dateN]);
                line.level = t[regex.levelN];
                line.message = t[regex.msgN];
                //line.time = words[0];
                //line.pid = words[1];
                //line.level = words[2];
                //line.level = linesArray[l].match(levelRgx)[0];
                //line.message = words.slice((-1*words.length) + 3).join(" ");
                lineObjects.push(line);
            };

            return {
                ...state,
                lines: lineObjects,
                ogLines: lineObjects
            }
        }
        case "FILTER_LINES":
        {
            //console.log("-"+action.payload.message.toLowerCase()+"-");
            return {
                ...state,
                level: action.payload.level,
                message: action.payload.message,
                time: action.payload.time
            }
        }
    }

    return state;
}