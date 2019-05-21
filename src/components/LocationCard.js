import React from 'react'
import Card from 'react-bootstrap/Card'

const LocationCard = (props) => {
  return(
    <div>
    <br/>
    <Card onClick={() => props.locationCardOnClick(props.id)} style={{ width: '18rem', marginLeft: "auto", marginRight: "auto" }}>
      <Card.Img variant="top" src={props.locimages[0].url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
        {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
  </div>)
}

export default LocationCard
