import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Location from './containers/Location.js'
import LocationRequester from './components/LocationRequester.js'
import CreateUser from './components/CreateUser.js'
import Login from './components/Login.js'
import logo from './logo.svg';
import './App.css';


const URL = "https://b6069cf8.ngrok.io/"
class App extends Component {



  state = {
    currentuser: null,
    latitude: null,
    longitude: null
  }


  componentDidMount(){
		const token = localStorage.getItem("token")
		if (token){
      console.log("Got a token, fam")
			// load up their shit
			// fetch("http://localhost:3001/auto_login", {
			// 	headers: {
			// 		"Authorization": token
			// 	}
			// })
			// .then(res => res.json())
			// .then((response) => {
			// 	if (response.errors) {
			// 		alert(response.errors)
			// 	} else {
			// 		this.setState({
			// 			currentUser: response
			// 		})
			// 	}
			// })
		}
	}

  setCurrentUser = (response) => {
    console.log("response", response)
    this.setState({
      currentuser: response.user
    }, () => {
      // to be replaced with "wherever they are"
      localStorage.setItem("token", response.jwt)
      this.props.history.push('/locations/1')
    })
  }

  getLocationData =(position) => {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
  }

  render(){
    console.log(this.state)
    return (
      <div>
      <LocationRequester getLocationData={this.getLocationData} />
      <Switch>
        <Route path='/login' render={(routeProps) => <Login {...routeProps} setCurrentUser={this.setCurrentUser} />}/>
        <Route path='/users/create' render={(routeProps) => <CreateUser {...routeProps} setCurrentUser={this.setCurrentUser} /> } />
        <Route path='/locations/:id' render={(routeProps) => <Location {...routeProps} {...this.state} />} />
      </Switch>
      </div>
    );}
}

export default App;
