import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingListContainer from './components/ShoppingListContainer';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import listItems from './reducers/ListItems';
import ReactDOM from "react-dom";
import Dropdown from './components/NavBar';

const store = createStore(listItems, compose(window.devToolsExtension ? window.devToolsExtension() : f => f));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ShoppingListContainer />
      </div>
    </Provider>
  );
}

export default App;

var displayDropdown = (
  <div style={{display: 'flex', justifyContent: 'center'}} >
    <Dropdown />
  </div>
  );

ReactDOM.render(displayDropdown, document.getElementById('root'));
