import React, { Component } from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import MapContainer from './MapContainer'
import Home from './Home'
export class App extends Component {
  
  render() {
    return(
      <Router>
      <Route exact path="/" component={Home}  />
      <Route exact path="/location" component={MapContainer} />
      <Route path="/capture" component={MapContainer} />
    </Router>
    )
  }
  }

export default App