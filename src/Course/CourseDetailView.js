import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '../UI/Button';
import { Spinner } from '../UI/Spinner';
import Highlight from '../UI/Highlight';
import Teachinglist from '../UI/Teachinglist';
import Studentlist from '../UI/Studentlist';
import ErrorMsg from '../Utils/ErrorMsg';

class CourseDetailView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isEditing: false,
			isSaving: false,
			error: null,
			course: {
				Name: "",
				CourseCode: "",
				Description: "",
			},
		};
	}

	isNew() {
		const { id } = this.props.match.params;
		return id === 'create';
	}

	componentWillMount() {
		if (this.isNew()) {
			this.setState({ isEditing: true });
			return;
		}
		this.loadCourse()
	}

	displayDialog = (error) => {
		this.setState({ showError: true, error: error });
	}

	hideDialog = () => {
		this.setState({ showError: false });
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
			.catch(error => {
				const errorMsg = <ErrorMsg error={error} />;
				this.displayDialog(errorMsg);
			});
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

		this.setState({ isLoading: true });
		const { course } = this.state;

		if (this.props.match.params.id === 'create') {
			axios.post('/api/course', course)
				.then(response => {
					this.props.history.push('/courses');
				});
		} else {
			axios.put(`/api/course/${course.ID}`, course)
				.then(response => {
					this.setState({ isEditing: false, isLoading: false });
				})
				.catch(error => {
					const errorMsg = <ErrorMsg error={error} />;
					this.displayDialog(errorMsg);
				});
		}
	}

	handleCancel() {
		if (this.isNew()) {
			this.props.history.push('/courses');
		} else {
			this.setState({
				isEditing: false,
			});
			this.loadCourse();
		}
	}

	confirmDelete = () => {
		const { course } = this.state;
		confirmAlert({
			title: 'Really?',                        // Title dialog
			message: 'Are you sure to delete:',               // Message dialog
			childrenElement: () => (<div className="dialog-content">{course.Name}</div>),       // Custom UI or Component
			confirmLabel: 'Confirm',                           // Text button confirm
			cancelLabel: 'Cancel',                             // Text button cancel
			onConfirm: this.handleDelete,     // Action after Cancel
		})
	}

	handleDelete = () => {
		const { course } = this.state;
		this.setState({ isDeleting: true });
		axios.delete(`/api/course/${course.ID}`)
			.then(() => {
				this.props.history.push('/courses');
			})
			.catch(error => {
				const errorMsg = <ErrorMsg error={error} />;
				this.displayDialog(errorMsg);
			});
	}

	renderDisplay() {
		const { course } = this.state;

		return (
			<Highlight>
				<h1 className="name">{course.Name}</h1>
				<div className="row">
					<div className="col-sm-6">
						<h2>Course Code:</h2>
						<h2>{course.CourseCode}</h2>
					</div>
					<div className="col-sm-6">
						<h2>Description:</h2>
						<p className="modal-body">{course.Description}</p>
					</div>
				</div>
				<div className="row" style={{ marginTop: "20px" }}>
					<div className="col-sm-6">
						<h2>Lecturer:</h2>
						<Teachinglist lecturer={course.Teaching} />
					</div>
					<div className="col-sm-6">
						<h2>Student:</h2>
						<Studentlist student={course.Enrollments} />
					</div>
				</div>
				<div className="row" style={{ marginTop: "20px" }}>
					<Button primary onClick={() => this.setState({ isEditing: true })}>
						Edit
					</Button>
					<Button danger onClick={this.confirmDelete}>
						Delete
					</Button>
				</div>
			</Highlight>
		);
	}

	renderForm = () => {
		const { course } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="highlight shadow-lg">
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
					<p></p>
					<div className="form-group row">
						<Button primary type="submit">
							Save
						</Button>
						<Button danger onClick={() => this.handleCancel()}>
							Cancel
						</Button>
					</div>
				</div>
			</form>
		)
	}

	render() {
		const { isLoading, isEditing, course } = this.state;
		if (isLoading) {
			return <Spinner />;
		}

		return isEditing ?
			this.renderForm(course) : this.renderDisplay(course)
	}
}

export default CourseDetailView;
