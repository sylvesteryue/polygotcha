import React from 'react';
import './index.css';
import App from './App';

import { ReactDOM, render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import listItems from './reducers/ListItems';
import ShoppingListContainer from './components/ShoppingListContainer';
import FileUpload from './components/FileUpload';

import * as serviceWorker from './serviceWorker';


const store = createStore(listItems, compose(window.devToolsExtension ? window.devToolsExtension() : f => f));

// ReactDOM.render(<App />, document.getElementById('root'));

render(
  <Provider store={store}>
    <ShoppingListContainer />
  </Provider>,
  document.querySelector('[data-react-application]')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
