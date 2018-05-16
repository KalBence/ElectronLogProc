import React, { Component } from 'react';
import { connect } from "react-redux";
import { filterLines } from "../actions/logActions";
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/logActions';
import Open from "./Open";
import Regex from "./Regex"

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "",
            level: "",
            message: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        var filter = {
            time: this.state.time,
            level: this.state.level,
            message: this.state.message
        }
        //console.log('was submitted: ' + filter.time);
        this.props.dispatch(filterLines(filter));
        event.preventDefault();
    }

    render () {
        return (
            <div>
                <div>
                    <Regex/>
                    <Open/>
                </div>
                <br/>
                
                <div class="form-style-5" >
                    <form onSubmit={this.handleSubmit}>
                        <label class="left-date">
                            Time (from)
                            <input type="datetime-local" step="1" name="time" onChange={this.handleInputChange}/>
                        </label>
                        <label class="right-level">
                            Level
                            <select name="level" onChange={this.handleInputChange}>
                                <option value="">ANY</option>
                                <option value="dbg">Debug</option>
                                <option value="inf">Information</option>
                                <option value="err">Error</option>
                                <option value="war">Warning</option>
                            </select>
                        </label>
                        <label class="left-msg">
                            Message
                            <input type="text" name="message" onChange={this.handleInputChange}/>
                        </label>
                        <input class="btn-filter" type="submit" value="Filter" />
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Search);