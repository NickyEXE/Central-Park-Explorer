import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import { Link } from 'react-router-dom';
const uuid = require('uuidv4');

const NearbyPlaces = (props) => {
  if(props.nearestPlaces.length> 0) {
    return(
    <CardDeck style={{display: 'flex', flexWrap: 'wrap'}}>
        {props.nearestPlaces.slice(0,3).map(place =>
          <Card key={uuid()} className="bg-dark text-white" onClick={()=> props.goToLocation(place.id)}>
            <Card.Img src={place.image} alt={place.alt} />
            <Card.ImgOverlay>
              <strong><Card.Title>{place.name}</Card.Title></strong>
            </Card.ImgOverlay>
        </Card>)}
    </CardDeck>
  )}
}

export default NearbyPlaces
