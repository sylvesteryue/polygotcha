import React, { Component, useState } from 'react';
import List from './List';
import AddListItem from './AddListItem';
import FileUpload from './FileUpload'; 
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import WORDS from './WORDS'

// function UploadModal() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
class ShoppingList extends Component {
  constructor () {
    super();
    // this.handleInputChange = this.handleInputChange.bind(this);
  }
  state = {
    words: [""], // setting initial value of our name state
  }
  // handleInputChange(items) {
  //   // event.preventDefault();
  //   this.setState({ words=words.extends(items)})
  // }

  render() {
    return (
      <div className="container">
  
    <div className="row">
      <div className="col-sm-6">

        <AddListItem />
      

      </div>
      <div className="col-sm-6">

        <List />
        
      </div>
    </div>
  </div>
    )};
}

// const ShoppingList = ({
//   listItems,
//   addListItem,
//   removeListItem,
//   removeAllListItems
// }) => (
// // <UploadModal />
//   <div className="container">
  
//     <div className="row">
//       <div className="col-sm-6">

//         <AddListItem />

//       </div>
//       <div className="col-sm-6">

//         <List 
//           listItems={listItems} 
//           removeListItem={removeListItem} 
//           removeAllListItems={removeAllListItems}
//         />
        
      
//       </div>
//     </div>
//   </div>
//   );

export default ShoppingList;

