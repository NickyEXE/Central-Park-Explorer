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


const URL = "https://294ae131.ngrok.io/"
class App extends Component {



  state = {
    currentuser: null,
    latitude: null,
    longitude: null
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
        console.log("logging in with this response", response)
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

  getLocationData =(position) => {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
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

  background = {
   backgroundImage: `url(${image})`,
   backgroundColor: 'rgba(0,0,0,.25)',
   backgroundSize: `cover`,
   height: '100%',
   backgroundRepeat: `no-repeat`,
   backgroundPosition: 'bottom'
  }

  render(){
    return (
      <div style={this.background}>
      <div style ={this.style}>
      <LocationRequester getLocationData={this.getLocationData} />
      <Navigator currentuser={this.state.currentuser} goToIndex={this.goToIndex} goToProfile={this.goToProfile} logout={this.logout} />
      <Switch>
        <Route path='/login' render={(routeProps) => <Login {...routeProps} setCurrentUser={this.setCurrentUser} />}/>
        <Route path='/profile' render={(routeProps) => <Profile {...routeProps} goToLocation={this.goToLocation} setCurrentUser={this.setCurrentUser}/>}/>
        <Route path='/interests' render={(routeProps) => <SelectInterests {...routeProps} setCurrentUser={this.setCurrentUser} />}/>
        <Route path='/users/create' render={(routeProps) => <CreateUser {...routeProps} setCurrentUser={this.setCurrentUser} /> } />
        <Route path='/locations/:id' render={(routeProps) => <Location {...routeProps} {...this.state} />} />
        <Route path='/locations' render={(routeProps) => <LocationIndex {...routeProps} setCurrentUser={this.setCurrentUser} />}/>
        <Route exact path='/' render={(routeProps) => <Redirect {...routeProps} to='/locations'/>}/>
      </Switch>
      </div>
      </div>
    );}
}

export default App;
