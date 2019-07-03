import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid.js';
import * as serviceWorker from './serviceWorker';

//randomly select the turn order
//board size is good when going from 1 to 20
//1 250px

ReactDOM.render(<Grid playerX={true} boardSize={3}></Grid>, document.getElementById('root'));

serviceWorker.unregister();
