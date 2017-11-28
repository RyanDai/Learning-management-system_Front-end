import React, {Component} from 'react';
import axios from 'axios';
import Button from '../UI/Button';
import { confirmAlert } from 'react-confirm-alert';

export default class StudentDetailView extends Component{
  constructor(props){
    super(props);
    this.state = {
      num:0,
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

  confirmDelete=()=> {
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

  handleDelete=()=>{
    const { student } = this.state;
    this.setState({isLoading:true});
    axios.delete(`/api/student/${student.ID}`)
        .then(() => {
            this.props.history.push('/students');
            this.setState({isLoading:false})
        });
  }

  sendRequest(id){
    var studentURL = 'http://lazebear.azurewebsites.net/api/student'+'/'+id;

    axios.get(studentURL)
      .then((response) => {
        this.setState({isLoading:false});
        const student = {
            ID: response.data.ID,
      			FirstName: response.data.FirstName,
            LastName: response.data.LastName,
      			Phone: response.data.Phone,
            Email:response.data.Email,
            Address:response.data.Address
        }
        this.setState({student});

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
    const id = this.props.match.params.id;
    this.setState({num:id});
    this.sendRequest(id);
  }

  renderDisplay(){
    return(
      <div className="detailContainer">
        <h1>Student details</h1>
        <div className="jumbotron">
          <h1 className="display-3">{this.state.student.FirstName} {this.state.student.LastName}</h1>
          <p className="lead">Phone: {this.state.student.Phone}</p>
          <hr className="my-4"></hr>
          <p>Email: {this.state.student.Email}</p>

            <Button primary onClick={() => {this.setState({isEditing:true})}}>Edit student</Button>

          <Button danger onClick={this.confirmDelete}>
              Delete student
          </Button>
        </div>
      </div>
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
					isLoading: false
				});
        const student = {
            ID: response.data.ID,
      			FirstName: response.data.FirstName,
            LastName: response.data.LastName,
      			Phone: response.data.Phone,
            Email:response.data.Email,
            Address:response.data.Address
        }
        this.setState({student});
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

  handleSubmit(event){
    event.preventDefault(); // prevent default form submission
		this.setState({ isLoading: true });
		const { student } = this.state;

		if (this.isNew()) {
			axios.post('/api/student', student)
				.then(response => {
          console.log("okokokokokokokokoko");
          this.setState({ isLoading: false,
                          isEditing: false });
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

  handleInputChange = (event) => {
    const target = event.target;
    const {name, value} = target;

    this.setState({
      student: {
        ...this.state.student,
        [name]: value
      }
    });
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
          onChange={e=>this.handleInputChange(e)}
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
          onChange={e=>this.handleInputChange(e)}
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
          onChange={e=>this.handleInputChange(e)}
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
          onChange={e=>this.handleInputChange(e)}
          />
        </div>

        <fieldset>
            <legend>Address Details</legend>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="textinput">Line 1</label>
                <div className="col-sm-10">
                    <input type="text" value={'' || student.Address.Line1} placeholder="Address Line 1"
                           className="form-control" name="Line1" onChange={e=>this.handleInputChange(e,"a")} required/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="textinput">Line 2</label>
                <div className="col-sm-10">
                    <input type="text" value={'' || student.Address.Line2} placeholder="Address Line 2"
                           className="form-control" name="Line2" onChange={e=>this.handleInputChange(e,"a")}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="textinput">State</label>
                <div className="col-sm-4">
                    <input type="text" value={'' || student.Address.State} placeholder="State"
                           className="form-control" name="State" onChange={e=>this.handleInputChange(e,"a")} required/>
                </div>
                <label className="col-sm-2 col-form-label" htmlFor="textinput">City</label>
                <div className="col-sm-4">
                    <input type="text" value={'' || student.Address.City} placeholder="City"
                           className="form-control" name="City" onChange={e=>this.handleInputChange(e,"a")} required/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="textinput">Postcode</label>
                <div className="col-sm-4">
                    <input type="text" value={'' || student.Address.PostCode} placeholder="Post Code"
                           className="form-control" pattern="\d+"
                           name="PostCode" onChange={e=>this.handleInputChange(e,"a")} required/>
                </div>
                <label className="col-sm-2 col-form-label" htmlFor="textinput">Country</label>
                <div className="col-sm-4">
                    <input type="text" value={'' || student.Address.Country} placeholder="Country"
                           className="form-control" name="Country" onChange={e=>this.handleInputChange(e,"a")} required/>
                </div>
            </div>
        </fieldset>

      <button type='submit' onClick={(e)=> this.handleSubmit(e)}>Save</button>
      <button type='submit' onClick={(e)=> this.handleCancel(e)}>Cancel</button>
      </div>
    </form>
  )

  }

  render(){
    const {isLoading, isEditing} = this.state;
    if (isLoading)
      return <span>Loading student</span>;

      return isEditing ?
       this.renderForm() : this.renderDisplay()
  }
}
