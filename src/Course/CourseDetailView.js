import React, { Component } from 'react';
import axios from 'axios';

class CourseDetailView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isEditing: false,
			isSaving: false,
			error: null,
			course: null,
		};
	}

	isNew() {
		const { ID } = this.props.match.params;
		return ID === 'create';
	}

	componentWillMount() {
		if (this.isNew()) {
			this.setState({ course: {}, isEditing: true });
			return;
		}
		this.loadCourse()
	}

	loadCourse() {
		const { id } = this.props.match.params;
		this.setState({ isLoading: true });

		axios.get(`/api/course/${id}`)
			.then(response => {
				this.setState({
					course: response.data,
					isLoading: false
				});
			})
	}

	renderDisplay() {
		const { course } = this.state;

		return (
			<h1>{course.Name}</h1>

		);
	}

	render() {
		const { isLoading, isEditing, course } = this.state;
		if (isLoading) {
			return <h3>Loading details...</h3>;
		}

		return isEditing ?
			this.renderForm(course) : this.renderDisplay(course)
	}
}

export default CourseDetailView;
