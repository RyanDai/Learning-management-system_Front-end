import React, { Component } from 'react';
import axios from 'axios';
import Button from './Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Spinner } from '../UI/Spinner';
import ErrorMsg from '../Utils/ErrorMsg';
import Request from '../Utils/Request';

function Course(props) {
	const course = props.course;
	return (
		<option value={course.ID}>{course.Name}</option>
	)
}

export default class Enrolment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			course: {},
			courseID: "0",
			isLoading: false
		}
	}

	handleAssign = () => {
		const { course } = this.state;
		confirmAlert({
			title: 'Course Assign',                        // Title dialog
			message: 'Select a course from below',               // Message dialog
			childrenElement: () => (<div className="dialog-content">
				<select className="custom-select" onChange={(e) => this.setState({ courseID: e.target.value })}>
					<option value="0">Open this select menu</option>
					{
						course.map(
							(course) => <Course key={`${course.ID}`} course={course} />)
					}
				</select>
			</div>),       // Custom UI or Component
			confirmLabel: 'Confirm',                           // Text button confirm
			cancelLabel: 'Cancel',                             // Text button cancel
			onConfirm: this.requestEnrol,     // Action after Cancel
		})
	}


	loadCourse = () => {
		this.setState({ isLoading: true });
		Request("GET", `/api/course`, null)
		// axios.get(`/api/course`)
			.then(response => {
				console.log(response.data);
				this.setState({
					course: response.data,
					isLoading: false
				});
				this.handleAssign();
			})
			.catch(error => {
				const errorMsg = <ErrorMsg error={error} />;
				this.props.onError(errorMsg);
			});
	}

	requestEnrol = () => {

		var url = "";
		if (this.props.teaching) {
			url = "/api/teaching/";
		} else {
			url = "/api/enrolment/"
		}
		url += `${this.props.id}/${this.state.courseID}`;
		// console.log(url);
		Request("POST", url, null)
		// axios.post(url)
			.then(response => {
				this.setState({
					isLoading: false
				});
				this.props.onSuccess();
			})
			.catch(error => {
				this.setState({
					courseID: "0"
				});
				const errorMsg = <ErrorMsg error={error} />;
				this.props.onError(errorMsg);
			});
	}
	render() {
		const { isLoading } = this.state;
		if (isLoading)
			return <Spinner />;

		return (
			<Button primary onClick={this.loadCourse} className="fa fa-plus-circle" style={{ width: "20%" }} />
		)
	}
}