import React, {Component} from 'react';
import axios from 'axios';
import '../styles/detail.css';
import Gravatar from 'react-gravatar';

export default class LecturerDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isEditing: false,
            isSaving: false,
            lecturer: {}

        }
    }

    isNew() {
        const { id } = this.props.match.params;
        return id === 'create';
    }

    componentWillMount() {
        if (this.isNew()) {
            this.setState({lecturer: {}, isEditing: true});
            return;
        }
        this.loadLecturer()
    }

    loadLecturer() {
        const { id } = this.props.match.params;
        this.setState({isLoading: true});
        axios.get(`/api/lecturer/${id}`)
            .then(response => {
                console.log(response.data);
                this.setState({
                lecturer: response.data,
                isLoading: false
                });
            })
            .catch(error => console.log(error));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    renderDisplay(lecturer) {
        return (
            <div className="highlight shadow-lg">
                <h1 className="name">{lecturer.FirstName} &nbsp; {lecturer.LastName}</h1>
                <div className="row">
                    <Gravatar email={lecturer.Email} size={150} className="shadow-sm"/>
                    <ul className="fa-ul">
                        <li><i class="fa-li fa fa-envelope" aria-hidden="true"></i>{lecturer.Email}</li>
                        <li><i class="fa-li fa fa-phone" aria-hidden="true"></i>{lecturer.Phone}</li>
                    </ul>
                </div>
                <div className="row">
                    <p>Morbi laoreet ipsum sem, eu condimentum ante efficitur vel.
                        Donec at nibh risus. Nam mollis nulla eget scelerisque facilisis.
                        Suspendisse sit amet condimentum dolor. Vestibulum euismod congue mi
                        pulvinar dignissim. </p>
                    <button className = "btn btn-primary shadow-sm" onClick={()=>this.setState({isEditing: true})}>Edit</button>
                    <button className = "btn btn-danger shadow-sm" >Delete</button>
                </div>
            </div>
        )
    }

    validation(event) {
        var form = document.getElementById('needs-validation');
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }

    renderForm(lecturer) {
        return (
            <div className="highlight shadow-lg">
                <form className="form-horizontal" role="form" id="needs-validation" noValidate>
                    <fieldset>
                        <legend>Personal Details</legend>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">FirstName</label>
                            <div className="col-sm-4">
                                <input type="text" placeholder="FirstName" className="form-control" name="FirstName" required/>
                                <div class="invalid-feedback">
                                    Please provide a valid name.
                                </div>
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">LastName</label>
                            <div className="col-sm-4">
                                <input type="text" placeholder="LastName" className="form-control" name="LastName" required/>
                                <div class="invalid-feedback">
                                    Please provide a valid last name.
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">Email</label>
                            <div className="col-sm-4">
                                <input type="email" placeholder="example@example.com" className="form-control" name="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" required/>
                                <div class="invalid-feedback">
                                    Please provide a valid email.
                                </div>
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">Phone</label>
                            <div className="col-sm-4">
                                <input type="text" placeholder="+61412345678" className="form-control" name="Phone" pattern="\+61\d{9,9}" required/>
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
                                <input type="text" placeholder="Address Line 1" className="form-control" required/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">Line 2</label>
                            <div className="col-sm-10">
                                <input type="text" placeholder="Address Line 2" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">State</label>
                            <div className="col-sm-4">
                                <input type="text" placeholder="State" className="form-control" required/>
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">City</label>
                            <div className="col-sm-4">
                                <input type="text" placeholder="City" className="form-control" required/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">Postcode</label>
                            <div className="col-sm-4">
                                <input type="text" placeholder="Post Code" className="form-control" pattern="\d+" required/>
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="textinput">Country</label>
                            <div className="col-sm-4">
                                <input type="text" placeholder="Country" className="form-control" required/>
                            </div>
                        </div>
                    </fieldset>

                    <div className="form-group">
                        <button type="submit" className="btn btn-default">Cancel</button>
                        <button type="submit" className="btn btn-primary" onClick={e=>this.validation(e)}>Save</button>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        const {isLoading, isEditing, lecturer} = this.state;
        if (isLoading)
            return <span>Loading lecture</span>;

        return isEditing ?
            this.renderForm(lecturer) : this.renderDisplay(lecturer);
    }

}
