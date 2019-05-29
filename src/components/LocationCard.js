import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

const uuid = require('uuidv4');

const LocationCard = (props) => {
  return(
    <div>
    <br/>
    <Card onClick={() => props.locationCardOnClick(props.id)} style={{ width: '18rem', marginLeft: "auto", marginRight: "auto", backgroundColor: '#343a40' }}>
      <Card.Img variant="top" src={props.image} alt={props.alt} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
        {props.description}
        </Card.Text>
        {props.interests.length > 0 &&
          <Card.Footer>
          <div>
            <div style={{lineHeight: "1.2em", textAlign:'center', fontSize: '.8em'}}>
              Recommended based on your interest in:
            </div>
            <div>
              {props.interests.map(interest => <Badge key={uuid()} variant="info">{interest.name}</Badge>)}
            </div>
        </div>
        </Card.Footer>}
      </Card.Body>
    </Card>
  </div>)
}

export default LocationCard
