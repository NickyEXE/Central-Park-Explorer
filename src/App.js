import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Location from './containers/Location.js'
import LocationRequester from './components/LocationRequester.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    latitude: null,
    longitude: null
  }

  getLocationData =(position) => {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
  }

  render(){
    return (
      <div>
      <LocationRequester getLocationData={this.getLocationData} />
      <Switch>
        <Route path='/locations/:id' render={(routeProps) => <Location {...routeProps} {...this.state} />} />
      </Switch>
      </div>
    );}
}

export default App;
