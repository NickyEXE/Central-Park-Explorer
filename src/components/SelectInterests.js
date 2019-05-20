import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const URL = "https://b6069cf8.ngrok.io/"
class SelectInterests extends Component {

  state = {
    idArray: []
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    fetch(URL + "interests", {
      headers: {
        "Authorization": token
      }
    })
    .then(res => res.json())
    .then(console.log)
  }

  onClick = (e) => {
    console.log(e)
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
        <Button variant="primary" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    )
  }

}

export default SelectInterests
