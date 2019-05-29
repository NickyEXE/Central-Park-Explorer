import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const LocationCenter = (props) => <div>{props.name}</div>;
const YouLocation = (props) => <div>You</div>;



class GoogleMap extends Component {
  state = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 16
  }

  componentDidMount() {
    this.setState({
      center: {
        lat: this.props.lat,
        lng: this.props.long
      }
    })
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <center><div style={{ height: '40vh', width: '100%', color: '#343a40' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDKFuNQt2_3uU5gvoGs-CdH1D3r_g51CLk" }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <LocationCenter name={this.props.name}
            lat={this.props.lat}
            lng={this.props.long}
            // picture={this.props.picture}
            text={this.props.name}
          />
          <YouLocation
            lat={this.props.userLat}
            lng={this.props.userLong}
            // picture={this.props.picture}
            text="You"
          />
        </GoogleMapReact>
      </div></center>
    );
  }
}

export default GoogleMap;
