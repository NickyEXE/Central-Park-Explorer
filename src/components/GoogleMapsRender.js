import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = (props) => <div>X</div>;

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
      <center><div style={{ height: '40vh', width: '90%', color: '#343a40' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDKFuNQt2_3uU5gvoGs-CdH1D3r_g51CLk" }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.long}
            // picture={this.props.picture}
            text="X"
          />
        </GoogleMapReact>
      </div></center>
    );
  }
}

export default GoogleMap;
