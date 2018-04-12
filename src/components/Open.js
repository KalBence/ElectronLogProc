import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchLines } from "../actions/logActions";
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/logActions';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const dialog = electron.remote.dialog;

function mapStateToProps(state) {
    return { lines: state.lines.lines };
}

class Open extends React.Component {
    render () {
        return (
            <div>
                <button
                    onClick={this.openFile.bind(this)}
                    color="#841584"
                >Open file</button>
            </div>
        );
    }

    openFile() {
        
        var data;
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

                //console.log(dataIn.split('\n'));
                var linesArray = dataIn.split('\n');
                var lineObjects = [];
                for (var l in linesArray)
                {
                    var line = {};
                    var words = linesArray[l].split(' ');
                    line.time = words[0];
                    line.pid = words[1];
                    line.level = words[2];
                    line.message = words.slice((-1*words.length) + 3).join(" ");
                    lineObjects.push(line);
                };
                console.log(lineObjects);

                this.props.dispatch(fetchLines(lineObjects));
            });
            
        }); 
        
    }
}

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Open);