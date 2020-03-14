import React, { Component } from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import MapContainer from './MapContainer'
import Home from './Home'
import Capture from './Capture'
export class App extends Component {
  
  render() {
    return(
      <Router>
      <Route exact path="/" component={Home}  />
      <Route exact path="/location/:senderID" component={MapContainer} />
      <Route exact path="/capture" component={Capture} />
    </Router>
    )
  }
  }

export default App