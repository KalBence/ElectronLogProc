import React, { Component } from 'react';
import { connect } from "react-redux";
import 'react-virtualized/styles.css'

import { Column, Table } from 'react-virtualized'
import { fetchLines } from "../actions/logActions";
import { bindActionCreators } from 'redux';

import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import styles from '../table.css'
import getFilteredLines from "../selectors/logSelector";

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
        

        function dateCellRenderer( {cellData} ){
            if (cellData == null || cellData == '') {
                return '';
            } else {
                var t = new Date(cellData);
                var month = t.getMonth() + 1;
                var lineTime =  t.getFullYear() + "-" + month + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
                return String(lineTime);
            }
        }
        
        return (
            <div>
            <AutoSizer disableHeight>
            {({width}) => (
                <Table
                    width={width}
                    height={640}
                    headerHeight={20}
                    rowHeight={30}
                    headerClassName={styles.headerColumn}
                    rowCount={this.props.lines.length}
                    rowGetter={({ index }) => this.props.lines[index]}
                >
                    <Column
                        label='Time'
                        dataKey='time'
                        width={150}
                        cellRenderer={dateCellRenderer}
                    />
                    <Column
                        width={150}
                        label='pID'
                        dataKey='pid'
                    />
                    <Column
                        width={60}
                        label='Level'
                        dataKey='level'
                    />
                    <Column
                        width={1000}
                        label='Message'
                        dataKey='message'
                    />
                </Table>
            )}
            </AutoSizer>    
               
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { lines: getFilteredLines(state)};
}
  
/*function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}*/

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Log);