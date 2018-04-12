import React, { Component } from 'react';

export default class Line extends React.Component {
    render () {
        const { lineData } = this.props;

        return (
            <p>
                {lineData.time} {lineData.pid} {lineData.level} - {lineData.message}
            </p>
        );
    }
}