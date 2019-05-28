import React from 'react'
import Button from 'react-bootstrap/Button'


import { Link } from 'react-router-dom';
const uuid = require('uuidv4');

const NearbyPlaces = (props) => {
  return(
    <div>
  {props.nearestPlaces.map(place => <div key={uuid()}><Button key={uuid()} onClick={()=> props.goToLocation(place.id)}>{place.name}</Button></div>)}
    </div>
  )
}

export default NearbyPlaces
