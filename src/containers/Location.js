import React, { Component } from 'react'
import LocationCarousel from '../components/LocationCarousel.js'
import LandmarkCarousel from '../components/LandmarkCarousel.js'
import LandmarkModal from '../components/LandmarkModal.js'
import ViewTagsModal from '../components/ViewTagsModal.js'
import GoogleMapsRender from '../components/GoogleMapsRender.js'
import NearbyPlaces from '../components/NearbyPlaces.js'
// import Title from '../components/Title.js'
import Tags from '../components/Tags.js'

import NewTagModal from '../components/NewTagModal.js'
const uuid = require('uuidv4');
const URL = "https://eac02862.ngrok.io/"

class Location extends Component {

  state = {
    facts: [],
    id: parseInt(this.props.match.params.id),
    landmarks: [],
    locimages: [],
    center: {latitude: null, longitude: null},
    tags: [],
    name: null,
    description: null,
    modalData: false,
    tagModalData: false,
    tagModalOpen: false,
    viewTagModalOpen: false,
    nearby_places: [],
    viewTagModalData: {}
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
    this.updateWholePage()
  }
  //forces an update if they change the url
   componentDidUpdate(prevProps){
    if (prevProps.match.params.id !== this.props.match.params.id){
    this.updateWholePage()}
  }

  updateWholePage = () => {
    fetch(URL+"locations/"+this.props.match.params.id, {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(response => this.setState({...response}))
  }


// landmark modal
  modalClose = () => this.setState({ modalData: false });
  modalOpen = (landmarkId) => this.setState({modalData: this.state.landmarks.find(landmark => landmark.id === landmarkId)})

// Modal for adding a new tag
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
  openNewTagModal = () => {
    // consider switching order and debugging
    this.addTags()
    this.setState({tagModalOpen: true})
  }
  tagModalClose = () => this.setState({tagModalOpen: false})
  tagModalSubmit = (tag_id, review) => {
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

  // modal for viewing reviews
  openViewTagsModal = (id) => {
    this.setState({viewTagModalOpen: id})
    fetch(URL+`locationtags/${this.state.id}/${id}`, {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res=>res.json())
    .then(res => this.setState({viewTagModalData: res}))
  }
  viewModalClose = () => {
    this.setState({viewTagModalOpen: false, viewTagModalData: {}})
  }


  render(){
    console.log(this.state)
    return (
      <div style={this.style} key={uuid()}>
      <LocationCarousel name={this.state.name} images={this.state.locimages} key={uuid()}/>
      {this.state.description}
      <center style={this.tagStyle}>RECOMMENDED FOR:<br/> <Tags openViewTagsModal={this.openViewTagsModal} openNewTagModal={this.openNewTagModal} tags={this.state.tags} key={uuid()}/></center><br/>
      <div style={this.tagStyle}>LOCATION:</div>
      {this.state.center.latitude && this.state && (<GoogleMapsRender name={this.state.name} userLat={this.props.latitude} userLong={this.props.longitude} lat={this.state.center.latitude} long={this.state.center.longitude} />)}
      <br />
      {this.state.facts.length > 0 && <div>
      <div style={this.tagStyle}>FUN FACT:</div>
      {this.state.facts[0].factoid}</div>}

      <br />
      <div style={this.tagStyle}>LANDMARKS TO SEE:</div>
      <LandmarkCarousel modalOpen={this.modalOpen} landmarks={this.state.landmarks}/>
      <div style={this.tagStyle}>NEARBY PLACES:</div>
      {this.state.nearby_places.nearest_places && <NearbyPlaces goToLocation={this.props.goToLocation} nearestPlaces={this.state.nearby_places.nearest_places}/>}
      <LandmarkModal
        modalData={this.state.modalData}
        onHide={this.modalClose}
      />
      <NewTagModal
        locationName={this.state.name}
        modalData={this.state.tagModalData}
        tagModalOpen={this.state.tagModalOpen}
        onHide={this.tagModalClose}
        onSubmit={this.tagModalSubmit}
      />
      <ViewTagsModal
        locationName={this.state.name}
        modalData={this.state.viewTagModalData}
        viewModalOpen={this.state.viewTagModalOpen}
        onHide={this.viewModalClose}
      />
      </div>
    )
  }
}



export default Location
