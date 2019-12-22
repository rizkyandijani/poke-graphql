import React, { Component, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './landing'
import Detail from './detail'

function App() {
  
  useEffect(() => {
    console.log("checkkkkk app")
  },[])

  return (
    <Router>
      <Route exact path="/" component={Landing}></Route>
      <Route path="/:name" component={Detail}></Route>
    </Router>
  )
}

export default App;
