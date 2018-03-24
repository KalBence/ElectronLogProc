import React, { Component } from 'react';

export default class Line extends React.Component {
    render () {
        const { data } = this.props;

        return (
            <p> 
                {data} 
            </p>
        );
    }
}