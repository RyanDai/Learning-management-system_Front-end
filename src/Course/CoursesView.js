import React, { Component } from 'react';
import Button from '../UI/Button';
import CourseCard from './CourseCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from '../UI/Spinner';

class CoursesView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			course: [],
		};
	}

	loadCourses() {
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
		const { isLoading } = this.state;
		if (isLoading)
			return <Spinner />;

		return (
			<div className="container">
				<h1 style={{ color: "white" }}>Courses</h1>
				<div className="row">
					{this.state.course.map(
						course => <CourseCard course={course} key={course.ID} />
					)}
				</div>
				<Link to="/courses/create">
					<Button danger>
						Add New Course
					</Button>
				</Link>
			</div>
		)
	}
}

export default CoursesView;
