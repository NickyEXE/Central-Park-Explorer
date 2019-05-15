import React, { Component } from 'react'

const URL = "http://localhost:3001/"

class Location extends Component {

  state = {
    location: {}
  }

  componentDidMount(){
    fetch(URL+"locations/"+this.props.match.params.id)
    .then(response => response.json())
    .then(response => this.setState({location: response}))
  }

  render()
  {
    console.log(this.state)
    return "dogs"
  }


}



export default Location
