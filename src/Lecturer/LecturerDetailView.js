import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Spinner } from '../UI/Spinner';
import Button from '../UI/Button';
import Highlight from '../UI/Highlight';
import Courselist from '../UI/Courselist';
import Enrolment from "../UI/Enrolment";
import Dropcourse from "../UI/Dropcourse";
import Request from '../Utils/Request';
import Dialog from '../Utils/Dialog';
import Toast from '../UI/Toast';
import swal from 'sweetalert2';
import { Grid, Row, Col } from 'react-bootstrap';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

// const muiTheme = getMuiTheme({
//     palette: {
//         accent1Color:"#ff4081",
//         accent2Color:
// "#f50057",
// accent3Color
//     :
//     "#ff80ab",
// alternateTextColor
//     :
//     "#303030",
// borderColor
//     :
//     "rgba(255, 255, 255, 0.3)",
// canvasColor
//     :
//     "#303030",
// clockCircleColor
//     :
//     "rgba(255, 255, 255, 0.12)",
// disabledColor
//     :
//     "rgba(255, 255, 255, 0.3)",
// pickerHeaderColor
//     :
//     "rgba(255, 255, 255, 0.12)",
// primary1Color
//     :
//     "#DD403A",
// primary2Color
//     :
//     "#DD403A",
// primary3Color
//     :
//     "#fff",
// secondaryTextColor
//     :
//     "rgba(0, 0, 0, 0.7)",
// shadowColor
//     :
//     "rgba(0, 0, 0, 1)",
// textColor
//     :
//     "rgba(255, 255, 255, 1)"
//     },
// });




export default class LecturerDetailView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isEditing: false,
			isSaving: false,
			redirect: false,
			showToaster: false,
			toaster: "",
			lecturer: {
				FirstName: "",
				LastName: "",
				Email: "",
				Phone: "",
				Title: "Mr",
				Sex: "Male",
				Address: {
					Line1: "",
					Line2: "",
					City: "",
					State: "",
					PostCode: "",
					Country: "",
				},
				Teaching: []
			},
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
		// console.log(getMuiTheme(darkBaseTheme));
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
		this.loadLecturer()
	}

	handleErrorResponse = (error) => {
		this.setState({ isLoading: false });
		Dialog(false, error);
		if (error.response.status === 401) {
			this.props.history.push('/login');
		}
	}

	loadLecturer = () => {
		const { id } = this.props.match.params;
		this.setState({ isLoading: true });
		Request("GET", `/api/lecturer/${id}`, null)
			.then(response => {
				this.setState({
					lecturer: response.data,
					isLoading: false
				});
			})
			.catch(error => {
				this.handleErrorResponse(error);
			});
	}

	handleInputChange(event, field) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		if (field === "p") {
			this.setState({
				lecturer: {
					...this.state.lecturer,
					[name]: value
				}
			});
		} else {
			this.setState({
				lecturer: {
					...this.state.lecturer,
					Address: {
						...this.state.lecturer.Address,
						[name]: value
					}
				}
			})
		}
	}

	handleTitleChange = (event, index, value) => this.setState({
		lecturer: {
			...this.state.lecturer,
			["Title"]: value
		}
	});
	handleSexChange = (event, index, value) => this.setState({
		lecturer: {
			...this.state.lecturer,
			["Sex"]: value
		}
	});

	handleEnrolResponse=(enrol)=>{
		this.loadLecturer();
        this.setState({
            isLoading: false,
            showToaster: true,
            toaster: enrol?`Enrol course succeeded`:`Drop course succeeded`
        });
	};

	handleToaster = () => {
		this.setState({ showToaster: false });
	};

	handleSubmit() {
		this.setState({ isLoading: true });
		const { lecturer } = this.state;
		if (this.isNew()) {
			Request("POST", `/api/lecturer`, lecturer)
				.then(response => {
					Dialog(true, `Lecturer [${lecturer.FirstName} ${lecturer.LastName}] has been created`);
					this.props.history.push('/lecturers');
				})
				.catch(error => this.handleErrorResponse(error));
		} else {
			Request("PUT", `/api/lecturer/${lecturer.ID}`, lecturer)
				// axios.put(`/api/lecturer/${lecturer.ID}`, lecturer)
				.then(response => {
					this.setState({
						isEditing: false,
						isLoading: false,
						showToaster: true,
						toaster: `Lecturer [${lecturer.FirstName} ${lecturer.LastName}] has bee updated`
					});
				})
				.catch(error => this.handleErrorResponse(error));
		}
	}

	handleCancel() {
		if (this.isNew()) {
			this.props.history.push('/lecturers');
		} else {
			this.setState({
				isEditing: false,
				showToaster: true,
				toaster: "Edit action has been cancelled"
			});
			this.loadLecturer();
		}
	}

	confirmDelete = () => {
		const { lecturer } = this.state;
		swal({
			title: 'Are you sure?',
			html: `You are deleting <b>${lecturer.FirstName} ${lecturer.LastName}</b></br>You won't be able to revert this!`,
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
	};

	handleDelete = () => {
		const { lecturer } = this.state;
		this.setState({ isLoading: true });
		Request("DELETE", `/api/lecturer/${lecturer.ID}`, null)
			// axios.delete(`/api/lecturer/${lecturer.ID}`)
			.then(() => {
				Dialog(true, `Lecturer [${lecturer.FirstName} ${lecturer.LastName}] has been deleted`)
				this.props.history.push('/lecturers');
			})
			.catch(error => this.handleErrorResponse(error)
			);
	};

	renderDisplay() {
		const { lecturer } = this.state;
		return (
			<Highlight>
				<h1 className="name">{lecturer.FirstName} &nbsp; {lecturer.LastName}</h1>
				<div className="row">
					<Gravatar email={lecturer.Email} size={150} className="shadow-sm" />
					<ul className="fa-ul">
						<li><i className="fa-li fa fa-id-card" aria-hidden="true" />{lecturer.Title} {lecturer.LastName}</li>
						<li><i className="fa-li fa fa-male" aria-hidden="true" />{lecturer.Sex}</li>
						<li><i className="fa-li fa fa-envelope" aria-hidden="true" />{lecturer.Email}</li>
						<li><i className="fa-li fa fa-phone" aria-hidden="true" />{lecturer.Phone}</li>
						<li><i className="fa-li fa fa-home" aria-hidden="true" />{lecturer.Address.City}.{lecturer.Address.Country}</li>
					</ul>
				</div>
				<div className="row" style={{ marginTop: "20px" }}>
					<div className="col-sm-6">
						<h2>Teaching Course</h2>
					</div>
					<div className="col-sm-6" style={{ display: "inherit" }}>
						<Enrolment teaching id={lecturer.ID} onSuccess={()=>this.handleEnrolResponse(true)} onError={error => this.handleErrorResponse(error)} />
						<Dropcourse teaching id={lecturer.ID} courses={lecturer.Teaching} onSuccess={()=>this.handleEnrolResponse(false)} onError={error => this.handleErrorResponse(error)} />
					</div>
				</div>
				<div className="row" style={{ marginTop: "10px", marginBottom: "20px" }}>
					<Courselist course={lecturer.Teaching} />
				</div>
				<div className="row">
					<Button primary onClick={() => this.setState({ isEditing: true })}>
						Edit
					</Button>
					<Button danger onClick={this.confirmDelete}>
						Delete
					</Button>
				</div>
			</Highlight>
		)
	}

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

	renderForm() {
		const { FNameError, LNameError, EmailError, PhoneError, lecturer, L1Error, StateError, CityError, PostError, CountryError } = this.state;
		const { Address } = this.state.lecturer;
		return (
			<Highlight>
				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<fieldset>
						<legend>Personal Details</legend>
						<Grid>
							<Row lg={12} xs={12}>
								<Col lg={4} md={4}>
									<SelectField
										floatingLabelText="Title"
										value={lecturer.Title}
										name={"Title"}
										onChange={this.handleTitleChange}
									>
										<MenuItem value={"Mr"} primaryText="Mr" />
										<MenuItem value={"Mrs"} primaryText="Mrs" />
										<MenuItem value={"Professor"} primaryText="Professor" />
										<MenuItem value={"Doctor"} primaryText="Doctor" />
									</SelectField>
								</Col>
								<Col lg={4} md={4}>
									<TextField
										hintText="John"
										floatingLabelText="FirstName"
										defaultValue={lecturer.FirstName}
										fullWidth={true}
										name={"FirstName"}
										onChange={event => this.handleInputChange(event, "p")}
										errorText={FNameError}
									/>
								</Col>
								<Col lg={4} md={4}>
									<TextField
										hintText="Doe"
										defaultValue={lecturer.LastName}
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
										value={lecturer.Sex}
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
										defaultValue={lecturer.Email}
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
										defaultValue={lecturer.Phone}
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
			</Highlight>
		)
	}

	render() {
		const { showToaster, toaster, isLoading, isEditing } = this.state;
		if (isLoading)
			return <Spinner />;

		return (
			<div>
				{showToaster && <Toast Msg={toaster} onKill={this.handleToaster} />}
				{isEditing ?
					this.renderForm() : this.renderDisplay()}
			</div>
		)
	}

}
