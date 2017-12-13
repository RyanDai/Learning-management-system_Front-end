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
import Toast, { showToast } from '../UI/Toast';
import swal from 'sweetalert2';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

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
				Address: {
					Line1: "",
					Line2: "",
					City: "",
					State: "",
					PostCode: "",
					Country: "",
					Title: "Mr",
					Sex: "Male",
				},
				Teaching: []
			}
		}
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
			// axios.get(`/api/lecturer/${id}`)
			.then(response => {
				console.log(response);
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

	handleToaster = () => {
		this.setState({ showToaster: false });
	}

	handleSubmit(event) {
		event.preventDefault(); // prevent default form submission
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
	}

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
	}

	renderDisplay() {
		const { lecturer } = this.state;
		return (
			<Highlight id="main-body">
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
						<Enrolment teaching id={lecturer.ID} onSuccess={this.loadLecturer} onError={error => this.handleErrorResponse(error)} />
						<Dropcourse teaching id={lecturer.ID} courses={lecturer.Teaching} onSuccess={this.loadLecturer} onError={error => this.handleErrorResponse(error)} />
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

	validation(event) {
		const form = document.getElementById('needs-validation');
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.classList.add('was-validated');
	}

	renderForm() {
		const { lecturer } = this.state;
		return (
			<Highlight id="main-body">
				<form className="form-horizontal" id="needs-validation" onSubmit={(e) => this.handleSubmit(e)}>
					<fieldset>
						<legend>Personal Details</legend>
						<Grid>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Title</label>
							<div className="col-sm-4">
								<select className="custom-select" name={"Title"} defaultValue={lecturer.Title} onChange={e => this.handleInputChange(e, "p")}>
									<option value="Mr">Mr</option>
									<option value="Mrs">Mrs</option>
									<option value="Professor">Professor</option>
									<option value="Doctor">Doctor</option>
								</select>
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Sex</label>
							<div className="col-sm-4">

								<select className="custom-select" name={"Sex"} defaultValue={lecturer.Sex} onChange={e => this.handleInputChange(e, "p")}>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>

							</div>
						</div>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">FirstName</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.FirstName} placeholder="FirstName"
									className="form-control" name="FirstName"
									onChange={e => this.handleInputChange(e, "p")} required />
								<div className="invalid-feedback">
									Please provide a valid name.
                                </div>
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">LastName</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.LastName} placeholder="LastName"
									className="form-control" name="LastName"
									onChange={e => this.handleInputChange(e, "p")} required />
								<div className="invalid-feedback">
									Please provide a valid last name.
                                </div>
							</div>
						</div>

						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Email</label>
							<div className="col-sm-4">
								<input type="email" value={'' || lecturer.Email} placeholder="example@example.com"
									className="form-control"
									name="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
									onChange={e => this.handleInputChange(e, "p")} required />
								<div className="invalid-feedback">
									Please provide a valid email.
                                </div>
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Phone</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.Phone} placeholder="+61412345678"
									className="form-control" name="Phone"
									pattern="\+61\d{9,9}" onChange={e => this.handleInputChange(e, "p")} required />
								<div className="invalid-feedback">
									Please provide a valid phone number.
                                </div>
							</div>
						</div>
						</Grid>
					</fieldset>
					<fieldset>
						<legend>Address Details</legend>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Line 1</label>
							<div className="col-sm-10">
								<input type="text" value={'' || lecturer.Address.Line1} placeholder="Address Line 1"
									className="form-control" name="Line1" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
						</div>

						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Line 2</label>
							<div className="col-sm-10">
								<input type="text" value={'' || lecturer.Address.Line2} placeholder="Address Line 2"
									className="form-control" name="Line2" onChange={e => this.handleInputChange(e, "a")} />
							</div>
						</div>

						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">State</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.Address.State} placeholder="State"
									className="form-control" name="State" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">City</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.Address.City} placeholder="City"
									className="form-control" name="City" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
						</div>

						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Postcode</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.Address.PostCode} placeholder="Post Code"
									className="form-control" pattern="\d+"
									name="PostCode" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Country</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.Address.Country} placeholder="Country"
									className="form-control" name="Country" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
						</div>
					</fieldset>

					<div className="form-group row">
						<Button primary type="submit" onClick={e => this.validation(e)}>
							Save
                        </Button>
						<Button danger onClick={() => this.handleCancel()}>
							Cancel
                        </Button>
					</div>
				</form>
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
