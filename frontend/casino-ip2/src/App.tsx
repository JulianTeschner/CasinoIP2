import * as React from 'react';
import {Routes, Route, Link } from "react-router-dom";
import Home from "./views/home/Home";
import './App.css';

function App() {
  return (
    /*
    <div className="App">
      <header className="App-header">
        <h1>App</h1>
      </header>
    </div>
    */
   <div className="App">
     <Home />
   </div>
  );
}

export default App;
