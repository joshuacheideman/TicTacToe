import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid.js';
import * as serviceWorker from './serviceWorker';

//randomly select the turn order
const turnOrder= Math.floor(Math.random()*2)===0?false: true;
ReactDOM.render(<Grid firstTurn={turnOrder} playerX={true}></Grid>, document.getElementById('root'));

serviceWorker.unregister();
