import React, { Component } from 'react';
import StudentList from './StudentList';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

export default class StudentView extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="container">
				<h1 style={{ color: "white" }}>Students</h1>
				<StudentList />
				<Link to={`/students/create`}>
					<Button danger style={{ margin: "10px 0 10px 0" }}>
						Add New Student
					</Button>
				</Link>

			</div>
		)

	}
}
