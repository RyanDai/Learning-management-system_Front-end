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
			key: ""
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

	handleFilter = (e) => {
		this.setState({ key: e.target.value });
	}

	render() {
		const { isLoading, key } = this.state;
		if (isLoading)
			return <Spinner />;

		return (
			<div className="page-wrapper">
				<h1 style={{ color: "white", padding: "10px" }}>Courses</h1>
				<div className="row" style={{ margin: "10px auto" }}>
					<div className="col-sm-6">
						<Link to="/courses/create">
							<Button danger>
								Add New Course
							</Button>
						</Link>
					</div>
					<div className="col-sm-6">
						<input style={{ float: "right", margin: "5px auto" }} onChange={this.handleFilter} placeholder="Search by name" />
					</div>
				</div>
				<div className="row" style={{ margin: "10px auto" }}>
					{this.state.course.filter(
						(c) =>
							(key === "") || (c.CourseCode.indexOf(key) !== -1) || (c.Name.indexOf(key) !== -1)
					).map(
						course => <CourseCard course={course} key={course.ID} />
						)}
				</div>

			</div>
		)
	}
}

export default CoursesView;
