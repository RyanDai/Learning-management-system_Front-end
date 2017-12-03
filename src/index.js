import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import './styles.js';
import App from './App/App';

// axios.defaults.baseURL = 'http://lazebear.azurewebsites.net';
axios.defaults.baseURL = 'http://lms-sep-gruopc.azurewebsites.net';
ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root'),
);
