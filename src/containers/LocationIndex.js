import React, { Component } from 'react'
import LocationCard from '../components/LocationCard.js'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

const URL = "https://eac02862.ngrok.io/"

class LocationIndex extends Component {

  state = {
    locations: [],
    sortByRecommended: false
  }

  uuid = require('uuidv4');

  componentDidMount(){
    this.seeAllPlaces()
  }

  seeAllPlaces = () => {
    fetch(URL+"locations/", {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(response => this.setState({locations: response}))
  }

  recommendPlaces = () => {
    this.recommendedLocations()
  }

  locationCardOnClick = (id) => {
    this.props.history.push(`/locations/${id}`)
  }

  doWeHaveACurrentLocation = () => {
    return (!!(this.props.currentLocation && this.props.currentLocation !=="Outside Park"))
  }

  sortLocations = () => {
    if (this.props.nearestPlaces && !this.state.sortByRecommended){
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

  recommendedLocations = () => {
    this.setState({sortByRecommended: true})
  }

  render(){
    if (this.state.locations.length > 0){
      if (!this.state.sortByRecommended){
      return (
        <div>
        <Button variant="secondary" onClick={this.recommendPlaces}>Recommend me some places</Button>
        {this.doWeHaveACurrentLocation() && <div><h3>Current location:</h3>{this.sortLocations().currentLocation.map(
          location => <LocationCard key={this.uuid()} {...location} locationCardOnClick={this.locationCardOnClick}/>)}</div> }
        <h3>Nearest locations:</h3>
        {this.sortLocations().nearestPlaces.map(location => <LocationCard key={this.uuid()} {...location} locationCardOnClick={this.locationCardOnClick}/>)}
        <h3>All other locations:</h3>
        {this.sortLocations().unusedLocations.map(location => <LocationCard key={this.uuid()} {...location} locationCardOnClick={this.locationCardOnClick}/>)}
        </div>
      )}
      else{
        return (<div>
          <Button variant="secondary" onClick={() => this.setState({sortByRecommended: false})} >Show me the places nearest me.</Button>
          {this.state.locations.sort((location1, location2) => location2.interests.length - location1.interests.length).map(location => <LocationCard key={this.uuid()} {...location} locationCardOnClick={this.locationCardOnClick}/>)}</div>)
      }
    }
    else{
      return (
        <center><Spinner animation="grow" variant="success"></Spinner></center>)
    }
  }
}


export default LocationIndex
