import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigator = (props) =>  {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Central Park Explorer</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {props.currentuser ? <Nav.Link onClick={props.logout}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
          <Nav.Link onClick={props.goToIndex}>View All Locations</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default Navigator
