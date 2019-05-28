import React, {Component} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Spinner from 'react-bootstrap/Spinner'

class LandmarkCarousel extends Component {
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
    if (this.props.landmarks.length > 0) {
      return (
        <Carousel
          onSelect={this.handleSelect}
        >
        {this.props.landmarks.map(landmark => {
          return(
          <Carousel.Item onClick={() => this.props.modalOpen(landmark.id)} key={this.uuid()}>
            <img
              className="d-block w-100"
              src={landmark.image}
              alt={landmark.name}
            style=
              {imageStyle}
            />
            <Carousel.Caption>
            <h3>{landmark.name}</h3>
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


export default LandmarkCarousel
