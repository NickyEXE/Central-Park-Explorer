import React, { Component } from 'react'
import LocationCarousel from '../components/LocationCarousel.js'
import LandmarkCarousel from '../components/LandmarkCarousel.js'
import LandmarkModal from '../components/LandmarkModal.js'
import GoogleMapsRender from '../components/GoogleMapsRender.js'
// import Title from '../components/Title.js'
import Tags from '../components/Tags.js'

import TagModal from '../components/TagModal.js'

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
    modalData: false,
    tagModalData: false,
    tagModalOpen: false
  }

  style = {
    backgroundColor: '#343a40',
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
    fetch(URL+"locations/"+this.props.match.params.id, {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(response => this.setState({...response}))
  }

  modalClose = () => this.setState({ modalData: false });

  modalOpen = (landmarkId) => this.setState({modalData: this.state.landmarks.find(landmark => landmark.id === landmarkId)})


  addTags = () => {
    fetch(URL+`tags/${this.state.id}`, {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res=>res.json())
    .then(res => this.setState({tagModalData: res}))
  }

  openTagModal = () => {
    this.addTags()
    this.setState({tagModalOpen: true})
  }
  tagModalClose = () => this.setState({tagModalOpen: false})
  tagModalSubmit = (tag_id, review) => {
    console.log(tag_id, review)
    fetch(URL+`tags/${this.state.id}`,{
      method: 'POST',
      body: JSON.stringify({tag_id: tag_id, review: review}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": localStorage.getItem("token")}
      })
    .then(res => res.json())
    .then(res => {
      if (res.errors){alert(res.errors)}
      else {alert("Thanks for your review!");
      this.setState({...res})
      this.tagModalClose()}
    })
  }

  render(){
    console.log(this.state)
    return (
      <div style={this.style}>
      <LocationCarousel name={this.state.name} images={this.state.locimages} key="Carousel"/>
      {this.state.description}
      <center style={this.tagStyle}>RECOMMENDED FOR:<br/> <Tags openTagModal={this.openTagModal} tags={this.state.tags}/></center><br/>
      {this.props.latitude && (<GoogleMapsRender lat={this.props.latitude} long={this.props.longitude} />)}
      <br />
      <div style={this.tagStyle}>LANDMARKS TO SEE:</div>
      <LandmarkCarousel modalOpen={this.modalOpen} landmarks={this.state.landmarks}/>
      <LandmarkModal
        modalData={this.state.modalData}
        onHide={this.modalClose}
      />
      <TagModal
        locationName={this.state.name}
        modalData={this.state.tagModalData}
        tagModalOpen={this.state.tagModalOpen}
        onHide={this.tagModalClose}
        onSubmit={this.tagModalSubmit}
      />
      </div>
    )
  }
}



export default Location
