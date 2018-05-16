import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../logo.svg';
import '../App.css';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fetchLines } from "../actions/logActions";
import Search from "./Search";
import Log from "./Log";

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <Search/>
        </header>
            
        <Log/>

      </div>
    );
  }
}

export default App;
