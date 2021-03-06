import React, { Component } from 'react';
// import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '../UI/Button';
import { Spinner } from '../UI/Spinner';
import Highlight from '../UI/Highlight';
import Teachinglist from '../UI/Teachinglist';
import Studentlist from '../UI/Studentlist';
import Request from '../Utils/Request';
import Dialog from '../Utils/Dialog';
import Toast from '../UI/Toast';
import swal from 'sweetalert2';
import { Grid, Row, Col } from 'react-bootstrap';
import MarkStudent from '../UI/MarkStudent';
import DatePicker from 'material-ui/DatePicker';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';

export default class CourseDetailView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isEditing: false,
			isSaving: false,
			isMarking: false,
			showToaster: false,
			sID: 0,
			cID: 0,
			course: {
				Name: "",
				CourseCode: "",
				Description: "",
				StartTime: "2017-01-01",
				EndTime: "2017-01-01",
			},
		};
		console.log(getMuiTheme(darkBaseTheme));
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

	handleErrorResponse = (error) => {
		this.setState({ isLoading: false });
		Dialog(false, error);
		if (error.response.status === 401) {
			this.props.history.push('/login');
		}
	}

	loadCourse() {
		const { id } = this.props.match.params;
		this.setState({ isLoading: true });
		Request("GET", `/api/course/${id}`)
			// axios.get(`/api/course/${id}`)
			.then(response => {
				this.setState({
					course: response.data,
					isLoading: false
				});
			})
			.catch(error => {
				this.handleErrorResponse(error);
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
	};

	handleStartTimeChange = (event, date) => {
		this.setState({
			course: {
				...this.state.course,
				["StartTime"]: this.convertDate(date.toLocaleString().substring(0, 10))
			},
		});
	}
	handleEndTimeChange = (event, date) => {
		this.setState({
			course: {
				...this.state.course,
				["EndTime"]: this.convertDate(date.toLocaleString().substring(0, 10)),
			},
		});
	}

	convertDate = (date) => {
		let d = date.split("/");
		let result = "";
		result += d[2] + "-" + d[1] + "-" + d[0];
		return result;
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({ isLoading: true });
		const { course } = this.state;
		if (this.isNew()) {
			Request("POST", `/api/course`, course)
				// axios.post('/api/course', course)
				.then(response => {
					Dialog(true, `course ${course.Name} has been created`);
					this.props.history.push('/courses');
				});
		} else {
			Request("PUT", `/api/course/${course.ID}`, course)
				// axios.put(`/api/course/${course.ID}`, course)
				.then(response => {
					this.setState({
						isEditing: false,
						isLoading: false,
						showToaster: true,
						toaster: `course ${course.Name} has bee updated`
					});
				})
				.catch(error => {
					this.handleErrorResponse(error);
				});
		}
	}

	handleCancel() {
		if (this.isNew()) {
			this.props.history.push('/courses');
		} else {
			this.setState({
				isEditing: false,
				showToaster: true,
				toaster: "Edit action has been cancelled"
			});
			this.loadCourse();
		}
	}

	confirmDelete = () => {
		const { course } = this.state;
		swal({
			title: 'Are you sure?',
			html: `You are deleting <b>${course.Name}</b></br>You won't be able to revert this!`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#4717F6',
			cancelButtonColor: '#A239CA',
			confirmButtonText: 'Delete',
			animation: false,
			customClass: 'animated pulse'
		}).then((result) => {
			if (result.value) {
				this.handleDelete();
			}
		})
	}

	handleDelete = () => {
		const { course } = this.state;
		this.setState({ isDeleting: true });
		Request("DELETE", `/api/course/${course.ID}`, null)
			// axios.delete(`/api/course/${course.ID}`)
			.then(() => {
				Dialog(true, `Lecturer ${course.Name} has been deleted`)
				this.props.history.push('/courses');
			})
			.catch(error => {
				this.handleErrorResponse(error);
			});
	}

	giveScore(sID, cID) {
		this.setState({
			sID: sID,
			cID: cID,
			isMarking: true
		});
	}

	cancelMarking() {
		this.setState({ isMarking: false });
	}

	renderDisplay() {
		const { course } = this.state;

		return (
			<Highlight>
				<h1 className="name">{course.Name}</h1>
				<Grid>
					<Row>
						<Col sm={6}>
							<h2>Course Code:</h2>
							<div style={{ textAlign: "center" }}>{course.CourseCode}</div>
							<div style={{ textAlign: "center" }}>{course.StartTime} - {course.EndTime}</div>
						</Col>
						<Col sm={6}>
							<h2>Description:</h2>
							<p style={{ margin: "0 20px" }}>{course.Description}</p>
						</Col>
					</Row>
					<Row style={{ marginTop: "20px" }}>
						<Col sm={6}>
							<h2>Lecturer:</h2>
							<Teachinglist lecturer={course.Teaching} />
						</Col>
						<Col sm={6}>
							<h2>Student:</h2>
							<Studentlist student={course.Enrollments} courseID={course.ID} giveScore={(sID, cID) => this.giveScore(sID, cID)} />
						</Col>
					</Row>
					<Row style={{ marginTop: "20px" }}>
						<Button primary onClick={() => this.setState({ isEditing: true })}>
							Edit
					</Button>
						<Button danger onClick={this.confirmDelete}>
							Delete
					</Button>
					</Row>
				</Grid>
			</Highlight>
		);
	}

	renderForm = () => {
		const { course } = this.state;

		return (
			<Highlight>
				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<fieldset>
						<legend>Course Details</legend>
						<Grid>
							<Row>
								<Col xs={12} sm={3}>
									<TextField
										hintText="Course Name"
										floatingLabelText="Course Name"
										defaultValue={course.Name}
										fullWidth={true}
										name={"Name"}
										onChange={event => this.handleInputChange}

									/>
								</Col>
								<Col xs={12} sm={3}>
								</Col>
								<Col xs={12} sm={3}>
									<TextField
										hintText="Course Code"
										floatingLabelText="Course Code"
										defaultValue={course.CourseCode}
										fullWidth={true}
										name={"CourseCode"}
										onChange={event => this.handleInputChange}

									/>
								</Col>
								<Col xs={12} sm={3}>
								</Col>
							</Row>
							<Row>
								<Col xs={12} sm={6}>
									<DatePicker
										hintText="Start Time"
										floatingLabelText="Start Time"
										defaultDate={new Date(this.state.course.StartTime)}
										onChange={this.handleStartTimeChange}
									/>
								</Col>
								<Col xs={12} sm={6}>
									<DatePicker
										hintText="End Time"
										floatingLabelText="End Time"
										defaultDate={new Date(this.state.course.EndTime)}
										onChange={this.handleEndTimeChange}
									/>
								</Col>
							</Row>
							<Row>
								<Col xs={12} sm={12}>
									<TextField
										hintText="Description"
										floatingLabelText="Description"
										defaultValue={course.Description}
										fullWidth={true}
										multiLine={true}
										rows={3}
										name={"Description"}
										onChange={event => this.handleInputChange}

									/>
								</Col>
							</Row>
						</Grid>
						<div className="form-group row" style={{ marginTop: "20px" }}>
							<Button primary type="submit" onClick={this.handleSubmit}>
								Save
								</Button>
							<Button danger onClick={() => this.handleCancel()}>
								Cancel
								</Button>
						</div>
					</fieldset>
				</MuiThemeProvider>
			</Highlight>
		)
	}

	render() {
		const { showToaster, toaster, isLoading, isEditing, course, isMarking, sID, cID } = this.state;
		if (isLoading) {
			return <Spinner />;
		}

		if (isMarking) {
			return <MarkStudent sID={sID} cID={cID} cancelMarking={() => this.cancelMarking()} />
		}

		return (
			<MuiThemeProvider>
				{showToaster && <Toast Msg={toaster} onKill={this.handleToaster} />}
				{isEditing ?
					this.renderForm(course) : this.renderDisplay(course)}
			</MuiThemeProvider>
		)
	}
}
