import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'


const URL = "https://294ae131.ngrok.io/"
class SelectInterests extends Component {

  state = {
    interests: []
  }

  uuid = require('uuidv4');
  componentDidMount(){
    const token = localStorage.getItem("token")
    fetch(URL + "interests", {
      headers: {
        "Authorization": token
      }
    })
    .then(res => res.json())
    .then(res => this.setState({interests: res}))
    // .then(res => this.setState({interests: res.map(item => Object.assign(item, {checked: false}))}))
  }

  onChange = (e) => {
    this.setState(
      {interests: this.state.interests.map(interest =>
        {
          if (interest.id === parseInt(e.target.id)){
            return Object.assign(interest, {checked: !interest.checked})
          }
          else {
            return interest
          }
        }
      )}
    )
  }

  onSubmit = () => {
    const token = localStorage.getItem("token")
    fetch(URL+"interests/",{
      method: 'POST', // or 'PUT'
      body: JSON.stringify({interest_ids: this.state.interests.filter(interest => interest.checked).map(interest => interest.id)}), // data can be `string` or {object}!
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      this.props.setCurrentUser(res)
      this.props.history.push(`/locations/`)
    })
  }

  render(){
    console.log(this.state)
    if (this.state.interests.length>0){
    return(
      <div>
      <h2>Tell us what you're interested in!</h2>
      <Form>
        {this.state.interests.map(interest =>
          <div key={this.uuid()} className="mb-3">
            <Form.Check
              type="checkbox"
              id={interest.id}
              checked={interest.checked}
              label={interest.name}
              onChange={this.onChange}
            />
            </div>
        )}
        <Button variant="primary" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
      </div>
    )}
    else {
      return (
        <center><Spinner animation="grow" variant="success"></Spinner></center>)
    }
  }

}

export default SelectInterests
