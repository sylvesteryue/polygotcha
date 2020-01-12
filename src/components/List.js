import React, { Component } from 'react';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import EmptyList from './EmptyList';
import Checkbox from "./Checkbox";
import WORDS from "./WORDS";

var OPTIONS = [
        {
          name: "apple",
          status: false
        },
        {
          name: "orange",
          status: false
        },
        {
          name: "banana",
          status: false
        }
      ]


class List extends Component {

  state = {
    // checkboxes: OPTIONS.reduce(
    //   (options, option) => ({
    //     ...options,
    //     [option]: false
    //   }),
    //   {}
    // )
    word_data: [],
    selectedOption: ""
  };

  componentDidMount() {
    this.fetchWords();
  }

  playerScore = 0;
  words = WORDS.arr

  calculatePlayerScore(){
    this.playerScore = 0;
    this.state.word_data.map((word) =>{
      if(word.correctness == true){
        this.playerScore += 1;
      }
    })
    return this.playerScore;
  }

  // selectAllCheckboxes = isSelected => {
  //   Object.keys(this.state.checkboxes).forEach(checkbox => {
  //     // BONUS: Can you explain why we pass updater function to setState instead of an object?
  //     this.setState(prevState => ({
  //       checkboxes: {
  //         ...prevState.checkboxes,
  //         [checkbox]: isSelected
  //       }
  //     }));
  //   });
  // };

  // selectAll = () => this.selectAllCheckboxes(true);

  // deselectAll = () => this.selectAllCheckboxes(false);

  // handleCheckboxChange = changeEvent => {
  //   const { name } = changeEvent.target;

  //   this.setState(prevState => ({
  //     checkboxes: {
  //       ...prevState.checkboxes,
  //       [name]: !prevState.checkboxes[name]
  //     }
  //   }));
  // };

  fetchWords() {
    // Where we're fetching data from
    fetch(`http://localhost:5000/words`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the words state
      .then(data =>
        this.setState({
          word_data: data,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    this.fetchWords();
    this.sendData();
  };

  //   console.log(this.word_data)
  //   Object.keys(this.state.checkboxes)
  //     .filter(checkbox => this.state.checkboxes[checkbox])
  //     .forEach(checkbox => {
  //       if (this.word_data.includes(checkbox)) {
  //         this.playerScore += 1
  //       } else {
  //         this.playerScore -= 1
  //       }
  //       console.log(checkbox, "is selected.");
  //     });
  //   this.deselectAll();
  // };


  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  setOption(event) {
    this.selectedOption = event.target.value;
    this.sendData()
  }

  sendData = () => {
    this.props.parentCallback(this.selectedOption);
}   

  // createCheckbox = word_data => (
  //   <Checkbox
  //     label={word_data.word}
  //     isSelected={this.state.checkboxes[word_data.word]}
  //     onCheckboxChange={this.handleCheckboxChange}
  //     key={word_data.word}
  //     disabled={this.state.checkboxes[word_data.correctness]}
  //   />
  // );

  // createCheckboxes = () => this.word_data.map(this.createCheckbox);

  render() {
    return (
      <>
      <h3 className="page-header">Vocabulary List</h3>
      <h2 className="score">Score is {this.calculatePlayerScore()}</h2>

      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {/* {this.createCheckboxes()} */}
              <div onChange={this.setOption.bind(this)}>
              {this.state.word_data.map((individual_word) => (
                 <div className="form-check">
                  <label>
                      <input
                      type="radio"
                      name="options"
                      value={individual_word._id.$oid}
                      //checked={true}
                      className="form-check-input"
                      // onChange={this.handleOptionChange}
                      disabled={individual_word.correctness}/>
                        {individual_word.translation}
                    </label>
                </div>
              ))}
              </div>

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
