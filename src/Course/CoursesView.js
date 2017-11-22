import React, { Component } from 'react';

import CourseCard from './CourseCard';

class CoursesView extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="mainContainer">
                <h1>Courses</h1>
                    <div className="btn btn-primary btn-add">
                        Add course
                    </div>
                <div className="row">
                    <CourseCard />
                </div>
            </div>
        )
    }
}

export default CoursesView;