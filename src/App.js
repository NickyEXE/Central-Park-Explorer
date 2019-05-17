import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Location from './containers/Location.js'
import LocationRequester from './components/LocationRequester.js'
import CreateUser from './components/CreateUser.js'
import logo from './logo.svg';
import './App.css';


const URL = "https://b6069cf8.ngrok.io/"
class App extends Component {



  state = {
    latitude: null,
    longitude: null
  }

  getLocationData =(position) => {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
  }

  onCreateUserSubmit = (state) => {
    console.log(state)
    fetch(URL+"users/create",{
      method: 'POST', // or 'PUT'
      body: JSON.stringify(state), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(console.log)
  }


  render(){
    return (
      <div>
      <LocationRequester getLocationData={this.getLocationData} />
      <Switch>
        <Route path='/users/create' render={(routeProps) => <CreateUser {...routeProps} onSubmit={this.onCreateUserSubmit} /> } />
        <Route path='/locations/:id' render={(routeProps) => <Location {...routeProps} {...this.state} />} />
      </Switch>
      </div>
    );}
}

export default App;
