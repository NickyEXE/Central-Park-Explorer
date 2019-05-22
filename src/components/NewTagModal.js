import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'

class NewTagModal extends React.Component {


  state ={
    selectedTag: {id: 0},
    userReview: ""
  }

  onTagSelect = (e) => {
    const tag = this.props.modalData.find(tag => tag.id == e.target.value)
    this.setState({selectedTag: tag, userReview: tag.user_review})
  }

  onTextChange = (e) => {
    this.setState({userReview: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.selectedTag.id, this.state.userReview)
  }

  render() {
    return (
      <Modal
        // {...this.props}
        show={!!this.props.tagModalOpen}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.locationName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Add a tag</Form.Label>
            <Form.Control onChange={this.onTagSelect} placeholder="select" value={this.state.selectedTag.id} as="select">
              <option disabled value={0} key={0}>Select a tag to review {this.props.locationName} for</option>
              {this.props.modalData && this.props.modalData.map(tag => <option key={tag.id} value={tag.id}>{tag.tag}</option>)}
            </Form.Control>
          </Form.Group>
          {this.state.selectedTag.id > 0 && <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Why is {this.props.locationName} good for {this.state.selectedTag.tag}</Form.Label>
            <Form.Control as="textarea" rows="3" value={this.state.userReview} onChange={this.onTextChange} />
          </Form.Group>}
          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
//
// class App extends React.Component {
//   constructor(...args) {
//     super(...args);
//
//     this.state = { modalShow: false };
//   }
//
//   render() {
//     let modalClose = () => this.setState({ modalShow: false });
//
//     return (
//       <ButtonToolbar>
//         <Button
//           variant="primary"
//           onClick={() => this.setState({ modalShow: true })}
//         >
//           Launch vertically centered modal
//         </Button>
//
//         <LandmarkModal
//           show={this.state.modalShow}
//           onHide={modalClose}
//         />
//       </ButtonToolbar>
//     );
//   }
// }
//
export default NewTagModal
