import React, { Component } from 'react';
// import axios from 'axios';
import Button from '../UI/Button';
import swal from 'sweetalert2';
import Enrolment from "../UI/Enrolment";
import Dropcourse from "../UI/Dropcourse";
import Courselist from '../UI/Courselist';
import Highlight from '../UI/Highlight';
import Chart from '../UI/Chart';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Spinner } from '../UI/Spinner';
import Request from '../Utils/Request';
import Dialog from '../Utils/Dialog';
import Toast, { showToast } from '../UI/Toast';
import { Grid, Row, Col } from 'react-bootstrap';
import Gravatar from 'react-gravatar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class StudentDetailView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 0,
			showError: false,
			error: null,
			showMark: false,
			showToaster: false,
			toaster: "",
			student: {
				ID: 0,
				FirstName: "",
				LastName: "",
				phone: "",
				Email: "",
				Address: {
					Line1: "",
					Line2: "",
					City: "",
					State: "",
					PostCode: "",
					Country: "",
					Sex: "Male",
				}
			},
			isLoading: false,
			isEditing: false,
			isSaving: false,
			chosenCourse: "",
			courseList: [],
            FNameError: "",
            LNameError: "",
            EmailError: "",
            PhoneError: "",
            L1Error: "",
            StateError: "",
            CityError: "",
            CountryError: "",
            PostError: ""

		}
	}

	confirmDelete = () => {
		const { student } = this.state;
		swal({
			title: 'Are you sure?',
			html: `You are deleting <b>${student.FirstName} ${student.LastName}</b></br>You won't be able to revert this!`,
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
		const { student } = this.state;
		this.setState({ isLoading: true });
		Request("DELETE", `/api/student/${student.ID}`, null)
			// axios.delete(`/api/student/${student.ID}`)
			.then(() => {
				Dialog(true, `Student [${student.FirstName} ${student.LastName}] has been deleted`)
				this.props.history.push('/students');
				this.setState({ isLoading: false })
			});
	}

	sendRequest() {
		//var studentURL = 'http://lms-sep-gruopc.azurewebsites.net/api/student'+'/'+id;
		const id = this.props.match.params.id;
		this.setState({ isLoading: true });
		Request("GET", `/api/student/${id}`, null)
			// axios.get(`/api/student/${id}`)
			.then((response) => {
				this.setState({
					isLoading: false,
					student: response.data,
					num: id
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleToaster = () => {
		this.setState({ showToaster: false });
	}

	componentWillMount() {
		if (this.isNew()) {
			this.setState({ isEditing: true });
			return;
		}
		this.sendRequest();

	}

	displayDialog = (error) => {
		this.setState({ showError: true, error: error });
	}

	hideDialog = () => {
		this.setState({ showError: false });
		if (this.state.redirect) {
			this.props.history.push('/login');
		}
	}

	handleErrorResponse = (error) => {
		this.setState({ isLoading: false });
		Dialog(false, error);
		if (error.response.status === 401) {
			this.props.history.push('/login');
		}
	}

    handleSexChange = (event, index, value) => this.setState({
        lecturer: {
            ...this.state.lecturer,
            ["Sex"]: value
        }
    });

	renderDisplay() {
		const { student } = this.state;

		return (
			<Highlight>

				<h1 className="name">{student.FirstName} &nbsp; {student.LastName}</h1>
				<div>
					<div className="row">
						<Gravatar email={student.Email} size={150} className="shadow-sm" />
						<ul className="fa-ul">
							<li><i className="fa-li fa fa-male" aria-hidden="true" />{student.Sex}</li>
							<li><i className="fa-li fa fa-envelope" aria-hidden="true" />{student.Email}</li>
							<li><i className="fa-li fa fa-phone" aria-hidden="true" />{student.Phone}</li>
							<li><i className="fa-li fa fa-home" aria-hidden="true" />{student.Address.City}.{student.Address.Country}</li>
						</ul>

					</div>

					<div className="row" style={{ marginTop: "20px" }}>
						<div className="col-sm-6">
							<h2>Learning Course</h2>
						</div>
						<div className="col-sm-6" style={{ display: "inherit" }}>
							<Enrolment enrolment id={student.ID} onSuccess={this.loadStudent} onError={error => this.displayDialog(error)} />
							<Dropcourse enrolment id={student.ID} courses={student.Enrollments} onSuccess={this.loadStudent} onError={error => this.displayDialog(error)} />
						</div>
					</div>


					<div className="row" style={{ marginTop: "10px", marginBottom: "20px" }}>
						<Courselist course={student.Enrollments} />
					</div>

					<div className="col-10" style={{ margin: "20px auto" }}>

						{this.changeEnrollmentsToArray()}

						<Select
							placeholder="Select a course to view score"
							name="singleSelect"
							value={this.state.chosenCourse}
							options={this.state.courseList}
							onChange={(value) => {
								if (value == undefined) {
									this.setState({ chosenCourse: value })
								} else {
									this.setState({ chosenCourse: value.value })
								}
							}}
						/>
					</div>
					<div className="row" style={{ marginTop: "20px" }}>
						<Button primary onClick={() => { this.setState({ showMark: true }) }}>
							Show Score
            </Button>
					</div>

					<div className="row" style={{ marginTop: "20px" }}>
						<Button primary onClick={() => { this.setState({ isEditing: true }) }}>
							Edit student
            			</Button>
						<Button danger onClick={this.confirmDelete}>
							Delete student
            			</Button>
					</div>
				</div>
			</Highlight>
		)
	}

	changeEnrollmentsToArray() {
		this.state.courseList = [];
		const { student, courseList } = this.state;
		const enrollments = student.Enrollments;
		enrollments.map(
			(course) => { if (courseList.length < enrollments.length) courseList.push({ value: course.Course.ID, label: course.Course.Name }) }
		)
	}

	hideChart() {
		this.setState({ showMark: false });
	}

	isNew() {
		const { id } = this.props.match.params;
		return id === 'create';
	}

	loadStudent = () => {
		const { id } = this.props.match.params;
		this.setState({ isLoading: true });
		Request("GET", `/api/student/${id}`, null)
			// axios.get(`/api/student/${id}`)
			.then(response => {
				console.log(response);
				this.setState({
					isLoading: false,
					student: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	handleCancel() {
		if (this.isNew()) {
			this.props.history.push('/students');
		} else {
			this.setState({
				isEditing: false,
				showToaster: true,
				toaster: "Edit action has been cancelled"
			});
			this.loadStudent();
		}
	}

	handleSubmit(event) {
		event.preventDefault(); // prevent default form submission
		this.setState({ isLoading: true });
		const { student } = this.state;

		if (this.isNew()) {
			Request("POST", `/api/student`, student)
				// axios.post('/api/student', student)
				.then(response => {
					Dialog(true, `Student [${student.FirstName} ${student.LastName}] has been created`);
					this.props.history.push('/students');
				});
		} else {
			Request("PUT", `/api/student/${student.ID}`, student)
				// axios.put(`/api/student/${student.ID}`, student)
				.then(response => {
					this.setState({
						isEditing: false,
						isLoading: false,
						showToaster: true,
						toaster: `Student [${student.FirstName} ${student.LastName}] has bee updated`
					});
				})
				.catch(error => {
					this.handleErrorResponse(error);
				});
		}
	}

	handleInputChange = (event, field) => {
		const target = event.target;
		const { name, value } = target;

		if (field === "p") {
			this.setState({
				student: {
					...this.state.student,
					[name]: value
				}
			});
		} else {
			this.setState({
				student: {
					...this.state.student,
					Address: {
						...this.state.student.Address,
						[name]: value
					}
				}
			})
		}

	};

    validation = () => {
        const { Email, Phone, FirstName, LastName } = this.state.lecturer;

        const { Line1, State, City, PostCode, Country } = this.state.lecturer.Address;

        const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        email.test(Email) === false ? this.setState({ EmailError: (<p>Email is required and format should be john@doe.com</p>) }) : this.setState({ EmailError: null });

        const phone = /\d{9,10}$/;
        phone.test(Phone) === false ? this.setState({ PhoneError: (<p> Phone number is required</p>) }) : this.setState({ PhoneError: null });

        const name = /^[a-zA-Z]{2,}$/;
        name.test(FirstName) === false ? this.setState({ FNameError: (<p> Name must contains at least two characters</p>) }) : this.setState({ FNameError: null });
        name.test(LastName) === false ? this.setState({ LNameError: (<p> Name must contains at least two characters</p>) }) : this.setState({ LNameError: null });
        name.test(Country) === false ? this.setState({ CountryError: (<p> Please provide a valid country</p>) }) : this.setState({ CountryError: null });
        name.test(State) === false ? this.setState({ StateError: (<p> Please provide a valid state</p>) }) : this.setState({ StateError: null });

        const post = /\d{3,6}$/;
        post.test(PostCode) === false ? this.setState({ PostError: (<p> Please provide a valid postcode</p>) }) : this.setState({ PostError: null });

        const line = /.+$/;
        line.test(Line1) === false ? this.setState({ L1Error: (<p> Please provide a valid address</p>) }) : this.setState({ L1Error: null });
        line.test(City) === false ? this.setState({ CityError: (<p> Please provide a valid city</p>) }) : this.setState({ CityError: null });

        const valid = email.test(Email) && phone.test(Phone) && name.test(FirstName) && name.test(LastName)
            && name.test(Country) && name.test(State) && line.test(City) && post.test(PostCode) && line.test(Line1);
        if (valid) {
            this.handleSubmit();
        }
    }

	renderChart() {
		return (
			<Chart studentID={this.state.student.ID} courseID={this.state.chosenCourse} hideChart={() => this.hideChart()} />
		)
	}


	renderForm() {
        const { FNameError, LNameError, EmailError, PhoneError, student, L1Error, StateError, CityError, PostError, CountryError } = this.state;
        const { Address } = this.state.student;
		return (
			<Highlight>
				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<fieldset>
						<legend>Personal Details</legend>
						<Grid>
							<Row lg={12} xs={12}>
								<Col lg={6} md={6}>
									<TextField
										hintText="John"
										floatingLabelText="FirstName"
										defaultValue={student.FirstName}
										fullWidth={true}
										name={"FirstName"}
										onChange={event => this.handleInputChange(event, "p")}
										errorText={FNameError}
									/>
								</Col>
								<Col lg={6} md={6}>
									<TextField
										hintText="Doe"
										defaultValue={student.LastName}
										floatingLabelText="LastName"
										fullWidth={true}
										name={"LastName"}
										onChange={event => this.handleInputChange(event, "p")}
										errorText={LNameError}
									/>
								</Col>
							</Row>
							<Row lg={12} xs={12}>
								<Col lg={4} md={4}>
									<SelectField
										floatingLabelText="Sex"
										value={student.Sex}
										name={"Sex"}
										onChange={this.handleSexChange}
									>
										<MenuItem value={"Male"} primaryText="Male" />
										<MenuItem value={"Female"} primaryText="Female" />
									</SelectField>
								</Col>
								<Col lg={4} md={4}>
									<TextField
										hintText="john.doe@example.com"
										floatingLabelText="Email"
										defaultValue={student.Email}
										fullWidth={true}
										name={"Email"}
										onChange={event => this.handleInputChange(event, "p")}
										errorText={EmailError}
									/>
								</Col>
								<Col lg={4} md={4}>
									<TextField
										hintText="0412345678"
										floatingLabelText="Phone"
										defaultValue={student.Phone}
										fullWidth={true}
										name={"Phone"}
										onChange={event => this.handleInputChange(event, "p")}
										errorText={PhoneError}
									/>
								</Col>
							</Row>
						</Grid>
					</fieldset>
				</MuiThemeProvider>
				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<fieldset>
						<legend>Address Details</legend>
						<Grid>
							<Row>
								<Col md={12} lg={12} sm={12}>
									<TextField
										hintText="123 ABC Street"
										floatingLabelText="Line 1"
										defaultValue={Address.Line1}
										fullWidth={true}
										name={"Line1"}
										onChange={event => this.handleInputChange(event, "a")}
										errorText={L1Error}
									/>
								</Col>
							</Row>
							<Row>
								<Col md={12} lg={12} sm={12}>
									<TextField
										hintText="..."
										floatingLabelText="Line 2"
										defaultValue={Address.Line2}
										fullWidth={true}
										name={"Line2"}
										onChange={event => this.handleInputChange(event, "a")}
									/>
								</Col>
							</Row>
							<Row>
								<Col md={6} lg={6} sm={6}>
									<TextField
										hintText="Brisbane"
										floatingLabelText="City"
										defaultValue={Address.City}
										fullWidth={true}
										name={"City"}
										onChange={event => this.handleInputChange(event, "a")}
										errorText={CityError}
									/>
								</Col>
								<Col md={6} lg={6} sm={6}>
									<TextField
										hintText="4000"
										floatingLabelText="Postcode"
										defaultValue={Address.PostCode}
										fullWidth={true}
										name={"PostCode"}
										onChange={event => this.handleInputChange(event, "a")}
										errorText={PostError}
									/>
								</Col>
							</Row>
							<Row>
								<Col md={6} lg={6} sm={6}>
									<TextField
										hintText="QLD"
										floatingLabelText="State"
										defaultValue={Address.State}
										fullWidth={true}
										name={"State"}
										onChange={event => this.handleInputChange(event, "a")}
										errorText={StateError}
									/>
								</Col>
								<Col md={6} lg={6} sm={6}>
									<TextField
										hintText="Australia"
										floatingLabelText="Country"
										defaultValue={Address.Country}
										fullWidth={true}
										name={"Country"}
										onChange={event => this.handleInputChange(event, "a")}
										errorText={CountryError}
									/>
								</Col>
							</Row>
						</Grid>
					</fieldset>
				</MuiThemeProvider>
				<div className="form-group row">
					<Button primary type="submit" onClick={this.validation}>
						Save
					</Button>
					<Button danger onClick={() => this.handleCancel()}>
						Cancel
					</Button>
				</div>
			</Highlight >
		)
	}

	render() {
		const { isLoading, isEditing, showMark, showToaster, toaster } = this.state;
		if (isLoading)
			return <Spinner />;

		if (showMark)
			return this.renderChart();

		return (
			<div>
				{showToaster && <Toast Msg={toaster} onKill={this.handleToaster} />}

				{isEditing ?
					this.renderForm() : this.renderDisplay()}

			</div>
		)

	}
}
