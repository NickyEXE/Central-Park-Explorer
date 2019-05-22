import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
const URL = "https://294ae131.ngrok.io/"
const uuid = require('uuidv4')

class Profile extends Component {

  state = {
    id: null,
    username: null,
    interests: [],
    reviews: []
  }


  componentDidMount(){
    this.getProfile()
  }


  getProfile = () => {
    fetch(URL+"profile/", {
        method: 'GET',
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
      .then(response => response.json())
      .then(response => this.setState({...response}))}

  successfulDeleteFunction = (res) => {
    alert("Thanks for deleting!")
    this.setState({...res})
    }

  deleteReview = (id) => {
    fetch(URL+`locationtags/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(res => res.errors ? alert(res.errors) : this.successfulDeleteFunction(res))
  }

  style={
    marginTop: '.8em',
    textAlign: 'left',
    backgroundColor: '#00000699'
  }

  substyle={
    // fontSize: '.7em',
    fontStyle: 'italic',
    textAlign: 'right',
    marginBottom: '.5em'
  }

  time = () => this.state.reviews && new Date (this.state.reviews[0].time)

  render(){
    if (this.state.id){
    return(
    <Container style={this.style}>
    <h1 >Welcome {this.state.username}</h1>
    <h5>According to our records, you're interested in...</h5>
    <ul>
    {this.state.interests.map(interest => <li key={interest.id}>{interest.name}</li>)}
    </ul>
    <h5>You recently left tags at the following locations:</h5>
    {this.state.reviews.map(review => {return(
      <div key={review.id}>
      <div onClick={() => this.props.goToLocation(review.location.id)}>
        <Badge key={uuid()} variant="danger">
          {review.tag.tag}
        </Badge>
        <Badge key={uuid()} variant="info">
          {review.location.name}
        </Badge>
        {":  "}
      </div>
      {review.review}
      <div style={this.substyle}><Button key={uuid()} size="sm" variant="dark" onClick={() => this.deleteReview(review.id)}>Delete Comment</Button>
      [On {this.time().toLocaleDateString()}]</div></div>)})}
    </Container>
  )}
  else {
    return(
      <center><Spinner animation="grow" variant="success"></Spinner></center>
    )
  }

  }
}


export default Profile
