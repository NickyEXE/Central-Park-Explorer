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

  onSubmit = (e) => {
    console.log("signing up")
    e.preventDefault()
    fetch(URL+"users/create",{
      method: 'POST', // or 'PUT'
      body: JSON.stringify(this.state), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
    this.props.setCurrentUser(res)
    this.props.history.push('/interests')})
  }

  onLogin = () => {
    this.props.history.push('/login')
  }

  render(){
    return(
      <div>
      <h2>Sign Up To Explore Central Park!</h2>
      <Form>
        <Form.Group controlId="formGroupUser" >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" />
          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Sign Up!
          </Button>
        </Form.Group>
        or <br/><br/>
        <Button variant="danger" onClick={this.onLogin}>
          Login
        </Button>
      </Form>
      </div>
    )
  }

}

export default CreateUser
