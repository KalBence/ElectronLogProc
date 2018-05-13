import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../logo.svg';
import '../App.css';

import { fetchLines } from "../actions/logActions";
import Search from "./Search";
import Log from "./Log";

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
  constructor(props) {
    super(props);

    var a = new Array;
    var dotnet = {
      name : "ASP .Net Core Serilog",
      rgx : "/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}).\d*\+\d{2}:\d{2} .{0,13} (\[INF\]|\[DBG\]|\[WRN\]) (.*)/",
      levelN : 2,
      dateN : 1,
      msgN : 3
    }
    a.push(dotnet);

    localStorage.setItem('regexArray', JSON.stringify(a));
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
