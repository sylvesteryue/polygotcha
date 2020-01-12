import React from 'react';
import './index.css';
import App from './App';

import { ReactDOM, render } from 'react-dom';

import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

render(
  <App />,
  document.querySelector('[data-react-application]')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
