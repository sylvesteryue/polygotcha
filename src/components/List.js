import React, { Component } from 'react';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import EmptyList from './EmptyList';
import Checkbox from "./Checkbox";


const OPTIONS = ["Apple", "Orange", "Banana"];

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
        console.log(checkbox, "is selected.");
      });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    return (
      <>
      <h3 className="page-header">Vocabulary List</h3>

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
