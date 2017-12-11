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
    	if(h<12) {
    		greeting = "Morning, "
		} else if (h<18) {
            greeting = "Afternoon, "
		} else {
            greeting = "Evening, "
		}
    	return (
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className="fa fa-user" aria-hidden="true"/>{greeting}{Auth.getName()}
				</a>
				<div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
					<a className="dropdown-item" onClick={this.logOut}><i className="fa fa-sign-out" aria-hidden="true"/> Logout</a>
					<div className="dropdown-divider"></div>
				</div>
			</li>
		)
	}

	guest=()=>{
    	return (
			<div className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className="fa fa-user" aria-hidden="true"/> Account
				</a>
				<div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
					<li className="nav-item">
						<Link className="nav-link" to="/login"><i className="fa fa-sign-in" aria-hidden="true"/> Login</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/register"><i className="fa fa-user-plus" aria-hidden="true"/> Register</Link>
					</li>
					<div className="dropdown-divider"></div>
				</div>
			</div>
		)
	}

	render () {
    	return(
		<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
			<Link className="navbar-brand" to="/"><i className="fa fa-ioxhost" aria-hidden="true"/> JR COLLEGE</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div id="navbarNavDropdown" className="navbar-collapse collapse">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/courses"><i className="fa fa-book" aria-hidden="true"/> Courses</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/lecturers"><i className="fa fa-user-secret" aria-hidden="true"/> Lectures</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/students"><i className="fa fa-graduation-cap" aria-hidden="true"/> Students</Link>
					</li>
          <li className="nav-item">
						<Link className="nav-link" to="/calendar"><i className="fa fa-calendar" aria-hidden="true"/> Calendar</Link>
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
