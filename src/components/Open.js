import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchLines } from "../actions/logActions";
import { getSelected } from "../actions/regexActions";
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/logActions';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const dialog = electron.remote.dialog;

function mapStateToProps(state) {
    return { lines: state.lines.lines, selectedRegex: state.regex.selectedRegex };
}

class Open extends React.Component {
    render () {
        return (
            <div class="form-style-5"> 
                <input type="button"
                    onClick={this.openFile.bind(this)}
                    color="#841584"
                    value="Open file"
                />
            </div>
        );
    }

    openFile() {

        this.props.dispatch(getSelected());
        //console.log(this.props.selectedRegex);
        
        var data;
        dialog.showOpenDialog((fileNames) => {
            // fileNames is an array that contains all the selected
            if(fileNames === undefined){
                console.log("No file selected");
                return;
            }
            
            //nagybb olvasás melyik szálon / node-ba és vissz adom
            //olvasás közben is respnsive
            //regex
            //virtual table
            //redux selector
            fs.readFile(fileNames[0], 'utf-8', (err, dataIn) => {
                if(err){
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }

                this.props.dispatch(fetchLines(dataIn,this.props.selectedRegex));
            });
            
        }); 
        
    }
}

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Open);