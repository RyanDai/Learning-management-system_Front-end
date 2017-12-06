import React, { Component } from 'react';
import axios from 'axios';
import Button from './Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import ErrorMsg from '../Utils/ErrorMsg';

function Course(props) {
	const course = props.course;
	return (
		<option value={course.ID}>{course.Name}</option>
	)
}

export default class Dropcourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courseID: "0"
		}
	}

	handleDrop = () => {
		const courses = this.props.courses;
		console.log(courses);
		confirmAlert({
			title: 'Course Assign',                        // Title dialog
			message: 'Select a course from below',               // Message dialog
			childrenElement: () => (<div className="dialog-content">
				<select className="custom-select" onChange={(e) => this.setState({ courseID: e.target.value })}>
					<option value="0">Open this select menu</option>
					{
						courses.map(
							(course) => <Course key={`${course.Course.ID}`} course={course.Course} />)
					}
				</select>
			</div>),       // Custom UI or Component
			confirmLabel: 'Confirm',                           // Text button confirm
			cancelLabel: 'Cancel',                             // Text button cancel
			onConfirm: this.requestDrop,     // Action after Cancel
		})
	}

	requestDrop = () => {

		var url = "";
		if (this.props.teaching) {
			url = "/api/teaching/";
		} else {
			url = "/api/enrolment/"
		}
		url += `${this.props.id}/${this.state.courseID}`;
		console.log(url);
		axios.delete(url)
			.then(() => {
				this.setState({
					isLoading: false
				});
				this.props.onSuccess();
			})
			.catch(error => {
				const errorMsg = <ErrorMsg error={error} />;
				this.props.onError(errorMsg);
			});
	}
	render() {
		return (
			<Button danger onClick={this.handleDrop} className="fa fa-minus-circle" />
		)
	}
}
