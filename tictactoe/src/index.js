import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Grid />, document.getElementById('root'));

serviceWorker.unregister();
