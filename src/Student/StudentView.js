import React, { Component } from 'react';
import StudentList from './StudentList';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

export default class StudentView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: ""
		}
	}

	handleFilter = (e) => {
		this.setState({ key: e.target.value });
	}

	render() {
		return (
			<div className="page-wrapper">
				<h1 style={{ color: "white", padding: "10px" }}>Students</h1>
				<div className="row" style={{ margin: "10px auto" }}>
					<div className="col-sm-6">
						<Link to={`/students/create`}>
							<Button danger>
								Add New Student
							</Button>
						</Link>
					</div>
					<div className="col-sm-6">
						<input style={{ float: "right", margin: "5px auto" }} onChange={this.handleFilter} placeholder="Search by name" />
					</div>
					<div style={{ margin: "10px 15px", width: "100%" }}>
						<StudentList search={this.state.key} />
					</div>
				</div>
			</div>
		)
	}
}
