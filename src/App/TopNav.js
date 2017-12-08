import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Auth} from '../Utils/Auth';

export default class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
			isLogin:false
        }
    }

    logOut=()=>{
    	window.sessionStorage.clear();
    	this.setState({isLogin:false});
	}
    loggedIn=()=>{
    	let greeting = "";
        const d = new Date();
        const h = d.getHours();
    	if(d<12) {
    		greeting = "Morning, "
		} else if (d<18) {
            greeting = "Afternoon, "
		} else {
            greeting = "Evening, "
		}
    	return (
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{greeting}{Auth.getName()}
				</a>
				<div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
					<a className="dropdown-item" onClick={this.logOut}>Logout</a>
					<div className="dropdown-divider"></div>
				</div>
			</li>
		)
	}

	guest=()=>{
    	return (
			<div className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Account
				</a>
				<div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
					<li className="nav-item">
						<Link className="nav-link" to="/login">Login</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/register">Register</Link>
					</li>
					<div className="dropdown-divider"></div>
				</div>
			</div>
		)
	}

	render () {
    	return(
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link className="navbar-brand" to="/#">X Net</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div id="navbarNavDropdown" className="navbar-collapse collapse">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/courses">Courses</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/lecturers">Lectures</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/students">Students</Link>
					</li>
				</ul>
				<ul className="navbar-nav">
					{Auth.loggedIn()? this.loggedIn():this.guest()}
				</ul>
			</div>
		</nav>
		)
    }
}
