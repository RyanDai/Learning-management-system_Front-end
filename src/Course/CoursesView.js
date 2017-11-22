import React, { Component } from 'react';

import CourseCard from './CourseCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CoursesView extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            course: [],
        };
    }

    loadCourses () {
        this.setState({ isLoading: true });
        axios.get('/api/course').then((response) => {
          this.setState({
            course: response.data,
            isLoading: false
          });
        });
      }

    componentWillMount() {
        this.loadCourses();
      }

    render() {

        
        const {isLoading} = this.state;
        if (isLoading)
        return <span>Loading course</span>;

        return (
            <div className="mainContainer">
                <h1>Courses</h1>
                <Link to="/courses/create" className="btn btn-lg btn-primary " >
                    Add new course
                </Link>
                <div className="row">
                {this.state.course.map(
                    course => <CourseCard course={course} key={course.ID} />
                    )}
                </div>
            </div>
        )
    }
}

export default CoursesView;
