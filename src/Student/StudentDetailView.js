import React, { Component } from 'react';
import axios from 'axios';
import Button from '../UI/Button';
import { confirmAlert } from 'react-confirm-alert';
import Enrolment from "../UI/Enrolment";
import Dropcourse from "../UI/Dropcourse";
import Courselist from '../UI/Courselist';
import Highlight from '../UI/Highlight';

export default class StudentDetailView extends Component{
  constructor(props){
    super(props);
    this.state = {
      num:0,
      showError: false,
			error:null,
      student:{
        ID:0,
        FirstName:"",
        LastName:"",
        phone:"",
        Email:"",
        Address:{
            Line1:"",
            Line2:"",
            City:"",
            State:"",
            PostCode:"",
            Country:""
        }
      },
      isLoading:false,
      isEditing:false,
      isSaving:false
    }
  }

	confirmDelete = () => {
		const { student } = this.state;
		confirmAlert({
			title: 'Really?',                        // Title dialog
			message: 'Are you sure to delete:',               // Message dialog
			childrenElement: () => (<div className="dialog-content">{student.FirstName} {student.LastName}</div>),       // Custom UI or Component
			confirmLabel: 'Confirm',                           // Text button confirm
			cancelLabel: 'Cancel',                             // Text button cancel
			onConfirm: this.handleDelete     // Action after Cancel
		})
	}

	handleDelete = () => {
		const { student } = this.state;
		this.setState({ isLoading: true });
		axios.delete(`/api/student/${student.ID}`)
			.then(() => {
				this.props.history.push('/students');
				this.setState({ isLoading: false })
			});
	}

  sendRequest(){
    //var studentURL = 'http://lms-sep-gruopc.azurewebsites.net/api/student'+'/'+id;
    const id = this.props.match.params.id;
    this.setState({isLoading:true});
    axios.get(`/api/student/${id}`)
      .then((response) => {
        this.setState({isLoading:false,
          student:response.data,
        num:id});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillMount(){
    if (this.isNew()) {
        this.setState({isEditing: true});
        return;
    }
    this.sendRequest();
  }

  displayDialog=(error) =>{
    this.setState({showError:true, error:error});
  }

  hideDialog=()=>{
    this.setState({showError:false});
  }

  renderDisplay(){
    const {showError,student, error} = this.state;
    return(
      <Highlight id="main-body">

        <h1>Student details</h1>
        <div className="jumbotron">
          <h1 className="display-3">{student.FirstName} {student.LastName}</h1>
          <p className="lead">Phone: {student.Phone}</p>
          <p>Email: {student.Email}</p>
          <hr className="my-4"></hr>

          <Enrolment enrolment id={student.ID} onSuccess={this.loadStudent} onError={error=>this.displayDialog(error)} />
          <Dropcourse enrolment id={student.ID} courses={student.Enrollments} onSuccess={this.loadStudent} onError={error=>this.displayDialog(error)}/>

          <div className="row" style={{marginTop:"10px", marginBottom:"20px"}}>
  					<Courselist course={student.Enrollments}/>
  				</div>

          <hr className="my-4"></hr>

          <Button primary onClick={() => {this.setState({isEditing:true})}}>
            Edit student
          </Button>
          <Button danger onClick={this.confirmDelete}>
              Delete student
          </Button>
        </div>

      </Highlight>
    )
  }

	isNew() {
		const { id } = this.props.match.params;
		return id === 'create';
	}

	loadStudent() {
		const { id } = this.props.match.params;
		this.setState({ isLoading: true });
		axios.get(`/api/student/${id}`)
			.then(response => {
				console.log(response);
				this.setState({
					isLoading: false,
          student:response.data
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
				isEditing: false
			});
			this.loadStudent();
		}
	}

	handleSubmit(event) {
		event.preventDefault(); // prevent default form submission
		this.setState({ isLoading: true });
		const { student } = this.state;

		if (this.isNew()) {
			axios.post('/api/student', student)
				.then(response => {
					this.props.history.push('/students');
				});
		} else {
			axios.put(`/api/student/${student.ID}`, student)
				.then(response => {

					this.setState({ isEditing: false, isLoading: false });
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

  handleInputChange = (event, field) => {
    const target = event.target;
    const {name, value} = target;

    if(field === "p"){
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


  renderForm(){
    const { student } = this.state;
    return(
    <form onSubmit={(e)=> this.handleSubmit(e)}>
      <div className="form-group">
        <div className="form-group">
          <label>FirstName</label>
          <input
          type="text"
          className="form-control"
          placeholder="FirstName"
          value={student.FirstName || ''}
          name="FirstName"
          onChange={e=>this.handleInputChange(e, "p")}
          />
        </div>
        <div className="form-group">
          <label>LastName</label>
          <input
          type="text"
          className="form-control"
          placeholder="LastName"
          value={this.state.student.LastName || ''}
          name="LastName"
          onChange={e=>this.handleInputChange(e, "p")}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={this.state.student.Email || ''}
          name="Email"
          onChange={e=>this.handleInputChange(e, "p")}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
          type="text"
          className="form-control"
          placeholder="Phone"
          value={this.state.student.Phone || ''}
          name="Phone"
          onChange={e=>this.handleInputChange(e, "p")}
          />
        </div>

					<fieldset>
						<legend>Address Details</legend>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Line 1</label>
							<div className="col-sm-10">
								<input type="text" value={'' || student.Address.Line1} placeholder="Address Line 1"
									className="form-control" name="Line1" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
						</div>

						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Line 2</label>
							<div className="col-sm-10">
								<input type="text" value={'' || student.Address.Line2} placeholder="Address Line 2"
									className="form-control" name="Line2" onChange={e => this.handleInputChange(e, "a")} />
							</div>
						</div>

						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">State</label>
							<div className="col-sm-4">
								<input type="text" value={'' || student.Address.State} placeholder="State"
									className="form-control" name="State" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">City</label>
							<div className="col-sm-4">
								<input type="text" value={'' || student.Address.City} placeholder="City"
									className="form-control" name="City" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
						</div>

						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Postcode</label>
							<div className="col-sm-4">
								<input type="text" value={'' || student.Address.PostCode} placeholder="Post Code"
									className="form-control" pattern="\d+"
									name="PostCode" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
							<label className="col-sm-2 col-form-label" htmlFor="textinput">Country</label>
							<div className="col-sm-4">
								<input type="text" value={'' || student.Address.Country} placeholder="Country"
									className="form-control" name="Country" onChange={e => this.handleInputChange(e, "a")} required />
							</div>
						</div>
					</fieldset>

					<button type='submit' onClick={(e) => this.handleSubmit(e)}>Save</button>
					<button type='submit' onClick={(e) => this.handleCancel(e)}>Cancel</button>
				</div>
			</form>
		)

	}

	render() {
		const { isLoading, isEditing } = this.state;
		if (isLoading)
			return <span>Loading student</span>;

		return isEditing ?
			this.renderForm() : this.renderDisplay()
	}
}
