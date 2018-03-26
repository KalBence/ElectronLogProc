import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchLines } from "../actions/logActions";
import { bindActionCreators } from 'redux';
import Line from "./Line";
import * as actionCreators from '../actions/logActions';

class Log extends React.Component {
    render () {

        /*const Lines = [
            "line 1",
            "line 2",
            "line 3",
            "line 4"
        ].map((line,i) => <Line key={i} data={line}/> )*/

        const lines = this.props.lines.map((line,i) => <Line key={i} lineData={line}/> );

        return (
            <div>
                {lines}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { lines: state.lines.lines };
}
  
/*function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}*/

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Log);