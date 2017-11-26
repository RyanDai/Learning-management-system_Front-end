import React, { Component } from 'react';
import axios from 'axios';
import Gravatar from 'react-gravatar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Spinner } from '../UI/Spinner';
import Button from '../UI/Button';
import Highlight from '../UI/Highlight';


export default class LecturerDetailView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isEditing: false,
			isSaving: false,
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
					Country: ""
				}
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

	loadLecturer() {
		const { id } = this.props.match.params;
		this.setState({ isLoading: true });
		axios.get(`/api/lecturer/${id}`)
			.then(response => {
				console.log(response);
				this.setState({
					lecturer: response.data,
					isLoading: false
				});
			})
			.catch(error => console.log(error));
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
			console.log(name + "," + value);
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

	handleSubmit(event) {
		event.preventDefault(); // prevent default form submission
		this.setState({ isLoading: true });
		const { lecturer } = this.state;

		if (this.isNew()) {
			axios.post('/api/lecturer', lecturer)
				.then(response => {
					this.setState({ isEditing: false, isLoading: false });
					this.props.history.push('/lecturers');
					// dialog
				});
		} else {
			axios.put(`/api/lecturer/${lecturer.ID}`, lecturer)
				.then(response => {
					this.setState({ isEditing: false, isLoading: false });
					// dialog
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	handleCancel() {
		if (this.isNew()) {
			this.props.history.push('/lecturers');
		} else {
			this.setState({
				isEditing: false,
			});
			this.loadLecturer();
		}
	}

	confirmDelete = () => {
		const { lecturer } = this.state;
		confirmAlert({
			title: 'Really?',                        // Title dialog
			message: 'Are you sure to delete:',               // Message dialog
			childrenElement: () => (<div className="dialog-content">{lecturer.FirstName} {lecturer.LastName}</div>),       // Custom UI or Component
			confirmLabel: 'Confirm',                           // Text button confirm
			cancelLabel: 'Cancel',                             // Text button cancel
			onConfirm: this.handleDelete,     // Action after Cancel
		})
	}

	handleDelete = () => {
		const { lecturer } = this.state;
		this.setState({ isLoading: true });
		axios.delete(`/api/lecturer/${lecturer.ID}`)
			.then(() => {
				this.props.history.push('/lecturers');
				this.setState({ isLoading: false })
			});
	}

    renderDisplay(){
        const {lecturer} = this.state;
        return (
            <Highlight>
                <h1 className="name">{lecturer.FirstName} &nbsp; {lecturer.LastName}</h1>
                <div className="row">
                    <Gravatar email={lecturer.Email} size={150} className="shadow-sm"/>
                    <ul className="fa-ul">
                        <li><i className="fa-li fa fa-envelope" aria-hidden="true"></i>{lecturer.Email}</li>
                        <li><i className="fa-li fa fa-phone" aria-hidden="true"></i>{lecturer.Phone}</li>
                        <li><i className="fa-li fa fa-home" aria-hidden="true"></i>{lecturer.Address.City}.{lecturer.Address.Country}</li>
                    </ul>
                </div>
                <div className="row">
					<h2>Teaching Course</h2>
					<div id="exampleAccordion" data-children=".item">
						<div class="item">
							<a data-toggle="collapse" data-parent="#exampleAccordion" href="#exampleAccordion1" aria-expanded="true" aria-controls="exampleAccordion1">
								Toggle item
							</a>
							<div id="exampleAccordion1" class="collapse show" role="tabpanel">
								<p class="mb-3">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium lorem non vestibulum scelerisque. Proin a vestibulum sem, eget tristique massa. Aliquam lacinia rhoncus nibh quis ornare.
								</p>
							</div>
						</div>
						<div class="item">
							<a data-toggle="collapse" data-parent="#exampleAccordion" href="#exampleAccordion2" aria-expanded="false" aria-controls="exampleAccordion2">
								Toggle item 2
							</a>
							<div id="exampleAccordion2" class="collapse" role="tabpanel">
								<p class="mb-3">
									Donec at ipsum dignissim, rutrum turpis scelerisque, tristique lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus nec dui turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
								</p>
							</div>
						</div>
					</div>
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
        const {lecturer} = this.state;
        return (
            <Highlight>
                <form className="form-horizontal" role="form" id="needs-validation" onSubmit={(e)=> this.handleSubmit(e)}>
                    <fieldset>
                        <legend>Personal Details</legend>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">FirstName</label>
                            <div className="col-sm-4">
                                <input type="text" value={'' || lecturer.FirstName} placeholder="FirstName"
                                       className="form-control" name="FirstName"
                                       onChange={e=>this.handleInputChange(e,"p")} required/>
                                <div class="invalid-feedback">
                                    Please provide a valid name.
                                </div>
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">LastName</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.LastName} placeholder="LastName"
									className="form-control" name="LastName"
									onChange={e => this.handleInputChange(e, "p")} required />
								<div class="invalid-feedback">
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
								<div class="invalid-feedback">
									Please provide a valid email.
                                </div>
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Phone</label>
							<div className="col-sm-4">
								<input type="text" value={'' || lecturer.Phone} placeholder="+61412345678"
									className="form-control" name="Phone"
									pattern="\+61\d{9,9}" onChange={e => this.handleInputChange(e, "p")} required />
								<div class="invalid-feedback">
									Please provide a valid phone number.
                                </div>
							</div>
						</div>
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
		const { isLoading, isEditing } = this.state;
		if (isLoading)
			return <Spinner />;

		return isEditing ?
			this.renderForm() : this.renderDisplay();
	}

}
