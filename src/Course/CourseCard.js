import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseCard extends Component {
    render() { 
        return (
            <div className="col-sm-6 col-md-3">
            
            <Link to={`/Courses/CourseDetailView`}>
            
                <div className="course-card">
                    <h4 className="course-card-name">Course name</h4>
                    <p className="course-card-code">Course code</p>
                    <p className="course-card-description">Course description</p>
                </div>
            </Link>

            </div>
        )
    }
}

export default CourseCard;