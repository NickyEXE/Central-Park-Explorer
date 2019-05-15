import React, { Component } from 'react'

class Location extends Component {

  componentDidMount(){


  }

  render()
  {
    console.log(this.props.match.params.id)
    return "dogs"
  }


}



export default Location
