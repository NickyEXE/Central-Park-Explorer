import React, { Component } from 'react'
import LocationCarousel from '../components/LocationCarousel.js'
import LandmarkCarousel from '../components/LandmarkCarousel.js'
import LandmarkModal from '../components/LandmarkModal.js'
import GoogleMapsRender from '../components/GoogleMapsRender.js'
// import Title from '../components/Title.js'
import Tags from '../components/Tags.js'

const URL = "https://b6069cf8.ngrok.io/"

class Location extends Component {

  state = {
    facts: [],
    id: parseInt(this.props.match.params.id),
    landmarks: [],
    locimages: [],
    tags: [],
    name: null,
    description: null,
    modalData: false
  }

  style = {
    backgroundColor: '#1d1e22',
    color: 'white'
  }
  tagStyle = {
    backgroundColor: '#379683',
    color: 'white',
    paddingTop: '8px',
    paddingBottom: '8px',
    textAlign: 'center',
    align: 'center'
  }

  componentDidMount(){
    fetch(URL+"locations/"+this.props.match.params.id)
    .then(response => response.json())
    .then(response => this.setState({...response}))
  }

  modalClose = () => this.setState({ modalData: false });

  modalOpen = (landmarkId) => this.setState({modalData: this.state.landmarks.find(landmark => landmark.id === landmarkId)})



  render(){
    console.log(this.state)
    return (
      <div style={this.style}>
      <LocationCarousel name={this.state.name} images={this.state.locimages} key="Carousel"/>
      <center style={this.tagStyle}>RECOMMENDED FOR:<br/> <Tags tags={this.state.tags}/></center><br/>
      {this.props.latitude && (<GoogleMapsRender lat={this.props.latitude} long={this.props.longitude} />)}
      <br />
      <div style={this.tagStyle}>LANDMARKS TO SEE:</div>
      <LandmarkCarousel modalOpen={this.modalOpen} landmarks={this.state.landmarks}/>
      <LandmarkModal
        modalData={this.state.modalData}
        onHide={this.modalClose}
      />
      </div>
    )
  }
}



export default Location
