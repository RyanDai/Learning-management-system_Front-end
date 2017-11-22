import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import './styles.js';
import App from './App/App';

ReactDOM.render(
    <Router>
    	<App />
    </Router>,
	document.getElementById('root'),
);
