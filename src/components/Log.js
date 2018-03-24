import React, { Component } from 'react';

import Line from "./Line";

export default class Log extends React.Component {
    render () {

        const Lines = [
            "line 1",
            "line 2",
            "line 3",
            "line 4"
        ].map((line,i) => <Line key={i} data={line}/> )

        return (
            <div>
                {Lines}
            </div>
        );
    }
}