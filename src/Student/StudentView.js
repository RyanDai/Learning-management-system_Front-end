import React, { Component } from 'react';
import StudentList from './StudentList';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

export default class StudentView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key:""
		}
	}

    handleFilter=(e)=>{
        this.setState({key:e.target.value});
    }

	render() {
		return (
			<div className="container">
				<h1 style={{ color: "white" }}>Students</h1>
				<input onChange={this.handleFilter}/>
				<StudentList search={this.state.key}/>
				<Link to={`/students/create`}>
					<Button danger style={{ margin: "10px 0 10px 0" }}>
						Add New Student
					</Button>
				</Link>

			</div>
		)

	}
}
