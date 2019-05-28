import React, {Component} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Spinner from 'react-bootstrap/Spinner'

class LocationCarousel extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);


  }

  uuid = require('uuidv4');

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const imageStyle =
    {
    objectPosition: 'center',
    width: '100%',
    height: '250px'}
    if (this.props.images.length > 0) {
      return (
        <Carousel onSelect={this.handleSelect}>
        {this.props.images.map(image => {
          return(
          <Carousel.Item key={this.uuid()}>
            <img
              className="d-block w-100"
              src={image.url}
              alt={image.alt}
            style=
              {imageStyle}
            />
            <Carousel.Caption>
            <h3>Welcome to {this.props.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        )})}
        </Carousel>
      )}
    else {
      return (
        <center><Spinner animation="grow" variant="success"></Spinner></center>)
    }
  }
}


export default LocationCarousel
