import React, { Component } from 'react';

export default class Line extends React.Component {
    render () {
        const { lineData } = this.props;
        
        if (lineData.time) {
            var t = new Date(lineData.time);
            var lineTime =  t.getFullYear() + "-" + t.getMonth() + "-" + t.getDay() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
        }

        return (
            <p>
                <font size="2">
                {lineTime} {lineData.pid} {lineData.level} - {lineData.message}
                </font>
            </p>
        );
    }
}