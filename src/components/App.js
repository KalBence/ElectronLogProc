import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import Search from "./Search";
import Log from "./Log";

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Search/>
        <Log/>

      </div>
    );
  }
}

export default App;
