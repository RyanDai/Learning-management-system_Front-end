import React from 'react';
import {Link} from 'react-router-dom';

export default function TopNav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="#">X Net</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarNavDropdown" className="navbar-collapse collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/courses">Courses</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/#">Lectures</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/#">Students</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/#">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/#">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}