import React, { Component } from 'react';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import EmptyList from './EmptyList';
import Checkbox from "./Checkbox";
import WORDS from "./WORDS";

var OPTIONS = [
        {
          name: "Apple",
          status: false
        },
        {
          name: "Orange",
          status: false
        },
        {
          name: "Banana",
          status: false
        }
      ]

const words = ['Apple', 'Banana']

class List extends Component {

  state = {
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };

  playerScore = 0;

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        if (WORDS.arr.includes(checkbox)) {
          this.playerScore += 1
        } else {
          this.playerScore -= 1
        }
        console.log(checkbox, "is selected.");
      });
    this.deselectAll();
  };


  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  createCheckbox = option => (
    <Checkbox
      label={option.name}
      isSelected={this.state.checkboxes[option.name]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option.name}
      disabled={this.state.checkboxes[option.status]}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    return (
      <>
      <h3 className="page-header">Vocabulary List</h3>
      <h2 className="score">Score is {this.playerScore}</h2>

      <div className="container">

        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}

              <div className="form-group mt-2">
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.deselectAll}
                >
                  Deselect All
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
    );
  }
}

//   getTotalNumberOfListItems() {
//     const { listItems } = this.props;

//     return Object.values(listItems).reduce((total, item) => (
//       total + item.quantity
//     ), 0);
//   }

//   createListItemElements(listItems) {
//     const {
//       removeListItem
//     } = this.props;

//     return (
//       Object
//       .values(listItems)
//       .map(item => {
//         return (<ListItem item={item} removeListItem={removeListItem} key={item.id} />);
//       })
//       .reverse()
//     );
//   }

//   render() {
//     const { listItems, removeAllListItems } = this.props;
//     const listItemElements = this.createListItemElements(listItems);

//     return (
//       <div>
//         <h3 className="page-header">

//           <ListHeader 
//             totalNumberOfListItems={this.getTotalNumberOfListItems(listItems)}
//             removeAllListItems={removeAllListItems}
//           />

//         </h3>
//         <ul>

//           {listItemElements.length > 0 ? listItemElements : <EmptyList />}

//         </ul>
//       </div>
//     );
//   }
// }

export default List;
