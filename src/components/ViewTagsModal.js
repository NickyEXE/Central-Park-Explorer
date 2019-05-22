import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'

const uuid = require('uuidv4');
class ViewTagsModal extends React.Component {


  state ={
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
    console.log("modal info", this.props)
    return (
      <Modal
        // {...this.props}
        show={!!this.props.viewModalOpen}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.locationName} {this.props.modalData[0] ? `is marked great for ${this.props.modalData[0].tag}.` : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Here's what users have said about {this.props.locationName}:</h5>
          {(this.props.modalData[0]) ? this.props.modalData.map(lt => {
            return <div key={uuid()}><Badge key={uuid()} variant="info">{lt.username}:</Badge> {lt.review}<br/></div>}) : <center><Spinner animation="grow" variant="success"></Spinner></center>}
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
export default ViewTagsModal
