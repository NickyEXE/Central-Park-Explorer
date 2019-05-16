import React, { Component } from 'react'
import ControlledCarousel from '../components/ControlledCarousel.js'
import GoogleMapsRender from '../components/GoogleMapsRender.js'
// import Title from '../components/Title.js'
import Tags from '../components/Tags.js'

const URL = "http://localhost:3001/"

class Location extends Component {

  state = {
    facts: [],
    id: parseInt(this.props.match.params.id),
    landmarks: [],
    locimages: [],
    tags: [],
    name: null,
    description: null
  }

  style = {
    backgroundColor: 'white',
    color: 'black'
  }
  altStyle = {
    backgroundColor: '#379683',
    color: 'white'
  }

  componentDidMount(){
    fetch(URL+"locations/"+this.props.match.params.id)
    .then(response => response.json())
    .then(response => this.setState({...response}))
  }

  render(){
    return (
      <div style={this.style}>
      <ControlledCarousel name={this.state.name} images={this.state.locimages} key="Carousel"/>
      <center style={this.altStyle}>Recommended for:<br/> <Tags tags={this.state.tags}/></center><br/>
      {this.props.latitude && (<GoogleMapsRender lat={this.props.latitude} long={this.props.longitude} />)}
      </div>
    )
  }


}



export default Location
