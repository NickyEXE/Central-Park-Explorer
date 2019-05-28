import React, { Component } from 'react'
import LocationCard from '../components/LocationCard.js'
import Spinner from 'react-bootstrap/Spinner'

const URL = "https://eac02862.ngrok.io/"

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

  doWeHaveACurrentLocation = () => {
    return (!!(this.props.currentLocation && this.props.currentLocation !=="Outside Park"))
  }

  sortLocations = () => {
    if (this.props.nearestPlaces){
    const nearestPlaceIds = this.props.nearestPlaces.map(place => place.id)
    const nearestPlaces = this.state.locations.filter(location => nearestPlaceIds.includes(location.id))
    const currentLocation = this.doWeHaveACurrentLocation() ? this.state.locations.filter(location => location.id === this.props.currentLocation.id) : null
    const allUsedLocationIds = currentLocation ? [...nearestPlaceIds, currentLocation.id] : nearestPlaceIds
    const allUnusedLocations = this.state.locations.filter(location => !allUsedLocationIds.includes(location.id))
    return({nearestPlaces: nearestPlaces, currentLocation: currentLocation, unusedLocations: allUnusedLocations})}
    else{
      // while loading, makes sure this doesn't break by just feeding all locations as Nearest Places
      return({unusedLocations: this.state.locations})
    }
  }

  allNearLocations = () => {
    console.log("wip")
  }


  render(){
    console.log(this.props)
    console.log("Do we have a current location", this.doWeHaveACurrentLocation())
    if (this.state.locations.length > 0){
      return (
        <div>
        {this.doWeHaveACurrentLocation() && <div><h3>Current location:</h3>{this.sortLocations().currentLocation.map(
          location => <LocationCard key={this.uuid()} {...location} locationCardOnClick={this.locationCardOnClick}/>)}</div> }
        <h3>Nearest locations:</h3>
        {this.sortLocations().nearestPlaces.map(location => <LocationCard key={this.uuid()} {...location} locationCardOnClick={this.locationCardOnClick}/>)}
        <h3>All other locations:</h3>
        {this.sortLocations().unusedLocations.map(location => <LocationCard key={this.uuid()} {...location} locationCardOnClick={this.locationCardOnClick}/>)}
        </div>
      )
    }
    else{
      return (
        <center><Spinner animation="grow" variant="success"></Spinner></center>)
    }
  }
}


export default LocationIndex
