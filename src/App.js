import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Location from './containers/Location.js'
import LocationIndex from './containers/LocationIndex.js'
import Profile from './containers/Profile.js'
import LocationRequester from './components/LocationRequester.js'
import CreateUser from './components/CreateUser.js'
import SelectInterests from './components/SelectInterests.js'
import Login from './components/Login.js'
import Navigator from './components/Navigator.js'
import './App.css';
import image from './background.jpg'


const URL = "https://eac02862.ngrok.io/"
class App extends Component {



  state = {
    currentuser: null,
    latitude: null,
    longitude: null,
    currentLocation: null,
    nearestPlaces: []
  }


  componentDidMount(){
    // console.log(this.props.history.goBack())
		const token = localStorage.getItem("token")
		if (token){
			fetch(URL + "auto_login", {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.errors) {
					alert(response.errors, "Logout and try again")
				} else {
					this.setState({
						currentuser: response
					})
				}
			})
		}
    else {
      if (this.props.history.location.pathname !== "/users/create") {
      return this.props.history.push('/login')}}
	}

// app should only update when the user logs in or when current location changes
// edit, this is no longer true as we're tracking locations
  shouldComponentUpdate(nextProps, nextState){
    return !(this.state.currentuser && (this.state.latitude && this.state.currentLocation))
  }

  getCurrentAndNearestLocations = () => {
      fetch(URL+"locations/", {
        method: 'POST',
        body: JSON.stringify({latitude: this.state.latitude, longitude: this.state.longitude}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": localStorage.getItem("token")}
      })
      .then(response => response.json())
      .then(response => this.setStateFromLocationsResponse(response))
  }

  setStateFromLocationsResponse = (response) => {
    if (response.nearest_places){
      if (response.current_location){
        this.setState({currentLocation: response.current_location, nearestPlaces: response.nearest_places})
      }
      else {
        this.setState({currentLocation: "Outside Park", nearestPlaces: response.nearest_places})
      }
    }
  }

  setCurrentUser = (response) => {
    localStorage.removeItem("token")
    this.setState({
      currentuser: response.user
    }, () => {
      // to be replaced with "wherever they are"
      localStorage.setItem("token", response.jwt)
    })
  }

  logout = () => {
    localStorage.removeItem("token")
    this.setState(
      {
        currentuser: null
      }
    )
    this.props.history.push('/login')
  }

  goToIndex = () => {
    this.props.history.push('/locations')
  }

  goToProfile = () => {
    this.props.history.push('/profile')
  }

  goToLocation = (id) => {
    this.props.history.push(`/locations/${id}`)
  }

  goToAddInterests = () => {
    this.props.history.push('/interests')
  }


  getLocationData =(position) => {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
    this.getCurrentAndNearestLocations()
  }



  style = {
    maxWidth: '500px',
    height: '100%',
    textAlign: 'center',
    align: 'center',
    marginLeft: "auto",
    marginRight: "auto",
    opacity: '1.0',
    justifyContent:'center',
    alignItems: 'center',
    color: 'white',
    backgroundImage: `url(${image})`,
    backgroundPosition: 'center'
  }

  goToMyLocation = () => {
    if (this.state.latitude){
      fetch(URL+"locations/", {
        method: 'POST',
        body: JSON.stringify({latitude: this.state.latitude, longitude: this.state.longitude}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": localStorage.getItem("token")}
      })
      .then(response => response.json())
      .then(response => this.interpretGoToMyLocationResponse(response))
    }
    else {
      alert("We can't find your location. Try enabling it!")
    }
  }


  interpretGoToMyLocationResponse = (response) => {
    if (this.state.currentLocation !== "Outside Park"){
      this.goToLocation(this.state.currentLocation.id)
    }
    else if (this.state.currentLocation === "Outside Park"){
      alert("You're not in Central Park!")
    }
    else {
      console.log("Still loading location")
    }
  }

  background = {
   backgroundImage: `url(${image})`,
   backgroundColor: 'rgba(0,0,0,.25)',
   backgroundSize: `cover`,
   height: '100%',
   minHeight: `${window.innerHeight}px`,
   backgroundRepeat: `no-repeat`,
   backgroundPosition: 'bottom'
  }

  render(){
    console.log("the state of app", this.state)
    return (
      <div style={this.background}>
        <div style ={this.style}>
        <LocationRequester getLocationData={this.getLocationData} />
        <Navigator currentuser={this.state.currentuser} goToIndex={this.goToIndex} goToMyLocation={this.goToMyLocation} goToProfile={this.goToProfile} logout={this.logout} />
        <Switch>
          <Route path='/login' render={(routeProps) => <Login {...routeProps} setCurrentUser={this.setCurrentUser} />}/>
          <Route path='/profile' render={(routeProps) => <Profile {...routeProps} goToAddInterests={this.goToAddInterests} goToLocation={this.goToLocation} setCurrentUser={this.setCurrentUser}/>}/>
          <Route path='/interests' render={(routeProps) => <SelectInterests {...routeProps} setCurrentUser={this.setCurrentUser} />}/>
          <Route path='/users/create' render={(routeProps) => <CreateUser {...routeProps} setCurrentUser={this.setCurrentUser} /> } />
          <Route path='/locations/:id' render={(routeProps) => <Location {...routeProps} goToLocation={this.goToLocation} {...this.state} />} />
          <Route path='/locations' render={(routeProps) => <LocationIndex {...routeProps}  currentLocation={this.state.currentLocation} nearestPlaces={this.state.nearestPlaces} />}/>
          <Route exact path='/' render={(routeProps) => <Redirect {...routeProps} to='/locations'/>}/>
        </Switch>
        </div>
      </div>
    )}
}

export default App;
