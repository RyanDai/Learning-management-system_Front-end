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
		const { id } = this.props.match.params;
		return id === 'create';
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

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			course: {
				...this.state.course,
				[name]: value,
			},
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ isSaving: true });
		const { course } = this.state;
		const onSuccess = (response) => {
			this.setState({
				isEditing: false,
				isSaving: false,
				course: response.data,
			});
			this.loadCourse();
		};

		if (this.props.match.params.id === 'create') {
			axios.post('/api/course', course)
				.then(onSuccess);
		} else {
			axios.put(`/api/course/${course.ID}`, course)
				.then(onSuccess);
		}
	}

	handleCancel() {
		if (this.isNew()) {
			this.props.history.push('/course');
		} else {
			this.setState({
				isEditing: false,
			});
			this.loadCourse();
		}
	}

	handleConfirmDelete = () => {
		const { course } = this.state;

		this.setState({ isDeleting: true });
		axios.delete(`/api/course/${course.ID}`)
			.then(() => {
				this.props.history.push('/course');
			});
	}

	renderDisplay() {
		const { course } = this.state;

		return (
			<div className="details-card">
				<h1>{course.Name}</h1>
				<div className="row">
					<ul>
						<li>{course.CourseCode}</li>
						<li>{course.Description}</li>
					</ul>
				</div>
				<div className="row">
					<button className="btn btn-primary shadow-sm" onClick={() => this.setState({ isEditing: true })}>
						Edit
				</button>
					<button className="btn btn-danger shadow-sm" onClick={this.handleConfirmDelete}>Delete</button>
				</div>
			</div>
		);
	}

	renderForm = () => {
		const { course } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input
						type="text"
						className="form-control"
						placeholder="Name"
						value={course.Name || ''}
						name="Name"
						onChange={this.handleInputChange}
					/>
					<label>CourseCode</label>
					<input
						type="text"
						className="form-control"
						placeholder="CourseCode"
						value={course.CourseCode || ''}
						name="CourseCode"
						onChange={this.handleInputChange}
					/>
					<label>Description</label>
					<input
						type="text"
						className="form-control"
						placeholder="Description"
						value={course.Description || ''}
						name="Description"
						onChange={this.handleInputChange}
					/>
					<button type="submit" className="btn btn-primary shadow-sm">Save</button>
					<button className="btn btn-danger shadow-sm" onClick={() => this.handleCancel()}>Cancel</button>
				</div>
			</form>
		)
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
