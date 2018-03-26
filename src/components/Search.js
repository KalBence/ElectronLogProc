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
  
/*function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}*/

class Search extends React.Component {
    render () {
        return (
            <div>
                <h1>Search Field</h1>
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

                console.log(dataIn.split('\n'));

                this.props.dispatch(fetchLines(dataIn.split('\n')));
            });
            
        }); 
        
    }
}

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Search);