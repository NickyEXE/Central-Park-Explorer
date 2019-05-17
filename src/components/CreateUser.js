import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const URL = "https://b6069cf8.ngrok.io/"
class CreateUser extends Component {

  state = {
    username: "",
    password: ""
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = () => {
    fetch(URL+"users/create",{
      method: 'POST', // or 'PUT'
      body: JSON.stringify(this.state), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => this.props.setCurrentUser(res))
  }

  render(){
    return(
      <Form>
        <Form.Group controlId="formGroupUser" >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" />
        </Form.Group>
        <Button variant="primary" onClick={() => this.onSubmit(this.state)}>
          Submit
        </Button>
      </Form>
    )
  }

}

export default CreateUser
