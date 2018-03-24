import React, { Component } from 'react';
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const dialog = electron.remote.dialog;

export default class Search extends React.Component {
    render () {
        return (
            <div>
                <h1>Search Field</h1>
                <button
                    onClick={this.openFile}
                    color="#841584"
                >Open file</button>
            </div>
        );
    }

    openFile() {

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
}