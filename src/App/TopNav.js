import React from 'react';
import {Link} from 'react-router-dom';

export default function TopNav() {
    return (
        <nav>
            <ul className="nav navbar-nav">
                <li>
                    <Link to="/courses">Courses</Link>
                </li>
                <li>
                    <Link to="/students">Students</Link>
                </li>
                <li>
                    <Link to="/lecturers">Lecturers</Link>
                </li>
            </ul>
    </nav>
    );
    }