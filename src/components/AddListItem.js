import React, { Component } from 'react';
import uuid from 'node-uuid';
import WORDS from './WORDS';
import List from './List';



const styleRequired = {
  color: '#ffaaaa'
};

class AddListItem extends Component {
  constructor(props) {
    super();

    this.state = {
      data: "sad days",
      listItemName: '',
      listItemDescription: '',
      listItemQuantity: 0,
      imageURL: ''
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitEvent = this.handleSubmitEvent.bind(this);

    this.handleUploadImage = this.handleUploadImage.bind(this);

    this.wordsArray = [];
  }

  handleUploadImage(ev) {
      ev.preventDefault();

      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data,
      }).then(results => results.json())
      .then(data => this.setState({ data })
    )
      WORDS.arr = this.state.data
      console.log(this.state.data)
  }

  refreshPage(){ 
    window.location.reload(); 
  }

  // handleInputChange(event) {
  //   const inputName = event.target.name;
  //   const inputValue = event.target.value;

  //   this.setState(currentState => {
  //     return {
  //       ...currentState,
  //       [inputName]: inputValue
  //     };
  //   });
  // }

  handleSubmitEvent(event) {
    event.preventDefault();

    const { addListItem } = this.props;
    const {
      listItemName,
      listItemDescription,
      listItemQuantity
    } = this.state;

    const listItem = {
      id: uuid.v4(),
      date: new Date(),
      name: listItemName.trim(),
      description: listItemDescription.trim(),
      quantity: parseInt(listItemQuantity, 10)
    };

    addListItem(listItem);
  }

  render() {
    const {
      listItemName,
      listItemDescription,
      listItemQuantity
    } = this.state;

    return (

      <div className="col-sm-6">

          <form onSubmit={this.handleUploadImage}>
            <h3 className="page-header">Level Up Your Vocabulary</h3>

            <div className="form-group">
              <label htmlFor="imageURL">Take a picture of your selected item! <span style={styleRequired}>*</span></label>
              <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </div>

            <br />
            <button type="submit" className="btn btn-primary">Check your picture</button>
            <button type="reset" className="btn btn-link">Cancel</button>

          </form>

      </div>

      <div className="col-sm-6">

          <List />
            
      </div>


    );
  }
}

export default AddListItem;



        // <div className="form-group">
        //   <label htmlFor="listItemName">Name <span style={styleRequired}>*</span></label>
        //   <input 
        //     type="text"
        //     className="form-control"
        //     id="listItemName"
        //     name="listItemName"
        //     placeholder="Enter name"
        //     required
        //     value={listItemName}
        //     onChange={this.handleInputChange} />
        // </div>

        // <div className="form-group">
        //   <label htmlFor="listItemDescription">Description</label>
        //   <textarea
        //     className="form-control"
        //     rows="3"
        //     id="listItemDescription"
        //     name="listItemDescription"
        //     placeholder="Enter description"
        //     ref="description"
        //     value={listItemDescription}
        //     onChange={this.handleInputChange}
        //   ></textarea>
        // </div>

        // <div className="form-group">
        //   <label htmlFor="listItemQuantity">Quantity <span style={styleRequired}>*</span></label>
        //   <div className="row">
        //     <div className="col-xs-5 col-sm-6 col-md-4">
        //       <input
        //         type="number"
        //         min="1"
        //         max="9999"
        //         step="1"
        //         className="form-control"
        //         id="listItemQuantity"
        //         name="listItemQuantity"
        //         required
        //         value={listItemQuantity}
        //         onChange={this.handleInputChange} />
        //     </div>
        //   </div>
        // </div>