import React, { Component } from 'react'
import ControlledCarousel from '../components/ControlledCarousel.js'
import Title from '../components/Title.js'

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

  componentDidMount(){
    fetch(URL+"locations/"+this.props.match.params.id)
    .then(response => response.json())
    .then(response => this.setState({...response}))
  }

  render(){
    return (
      <div style={this.style}>
      <Title name={this.state.name}/>
      <ControlledCarousel name={this.state.name} images={this.state.locimages} key="Carousel"/>)
      </div>
    )
  }


}



export default Location
