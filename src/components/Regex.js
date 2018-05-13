import React, { Component } from 'react';
import { connect } from "react-redux";
import { addRegex, selectRegex } from "../actions/regexActions";
import * as actionCreators from '../actions/regexActions';
import { bindActionCreators } from 'redux';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


class Regex extends React.Component {

    constructor(props) {
        super(props);

        ipcRenderer.on('new-regex', (event, arg) => {
            console.log(arg);
            var rgx = {
                name : arg.name,
                rgx : new RegExp(arg.rgx),
                levelN : arg.levelN,
                dateN : arg.dateN,
                msgN : arg.msgN
            }
            console.log(rgx);
            this.props.dispatch(addRegex(rgx));
        })

        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }

    

    createSelectItems() {
        var rlist = this.props.regexes.regex;
        
        let items = [];         
        for (let i = 0; i < rlist.length; i++) {             
             items.push(<option key={i} value={i}>{rlist[i].name}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    };
   
   onDropdownSelected(e) {
       //console.log("THE VAL", e.target.value);
       this.props.dispatch(selectRegex(e.target.value));
       //here you will see the current selected value of the select input
   };

    render () {

        return (
            <div>
                <select onChange={this.onDropdownSelected} >
                    <option value="" selected disabled hidden>Choose here</option>
                    {this.createSelectItems()}
                </select>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { regexes: state.regex };
}
export default connect(mapStateToProps/*, mapDispatchToProps*/)(Regex);