import { Component } from 'react'

class LocationRequester extends Component {

  componentDidMount() {
    navigator.geolocation.watchPosition(this.geo_success, this.geo_error, this.geo_options);
  }
  geo_success = (position) => {
    this.props.getLocationData(position)
  }

  geo_error = () => {
    alert("Please whitelist this app to use your device's location.")
  }

  geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

  render() {
    return null
  }
}

export default LocationRequester
