import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


class LandmarkModal extends Component {


  render() {
    return (
      <Modal
        // {...this.props}
        show={!!this.props.modalData}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.modalData.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {this.props.modalData.description}
          </p>
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
export default LandmarkModal
