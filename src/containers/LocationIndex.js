import React, { Component } from 'react'
import LocationCard from '../components/LocationCard.js'
import Spinner from 'react-bootstrap/Spinner'

const URL = "https://b6069cf8.ngrok.io/"

class LocationIndex extends Component {

  state = {
    locations: []
  }

  uuid = require('uuidv4');

  componentDidMount(){
    fetch(URL+"locations/", {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(response => this.setState({locations: response}))
  }

  locationCardOnClick = (id) => {
    this.props.history.push(`/locations/${id}`)
  }


  render(){
    if (this.state.locations.length > 0){
      return (
        this.state.locations.map(location => <LocationCard key={this.uuid()} {...location} locationCardOnClick={this.locationCardOnClick}/>)
      )
    }
    else{
      return (
        <center><Spinner animation="grow" variant="success"></Spinner></center>)
    }
  }
}


export default LocationIndex
