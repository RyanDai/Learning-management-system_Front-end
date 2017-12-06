import React, { Component } from 'react';
import axios from 'axios';
import Button from '../UI/Button';
import { confirmAlert } from 'react-confirm-alert';
import Enrolment from "../UI/Enrolment";
import Dropcourse from "../UI/Dropcourse";
import Courselist from '../UI/Courselist';
import Highlight from '../UI/Highlight';
import Chart from '../UI/Chart';

export default class StudentDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      showError: false,
			error:null,
      showMark:false,
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
      isLoading: false,
      isEditing: false,
      isSaving: false
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

  sendRequest() {
    //var studentURL = 'http://lms-sep-gruopc.azurewebsites.net/api/student'+'/'+id;
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    axios.get(`/api/student/${id}`)
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
  }

  renderDisplay() {
    const { showError, student, error } = this.state;
    return (
      <Highlight id="main-body">

        <h1>Student details</h1>
        <div>
          <h1 className="display-3">{student.FirstName} {student.LastName}</h1>
          <p className="lead">Phone: {student.Phone}</p>
          <p>Email: {student.Email}</p>
          <Button primary onClick={() => {this.setState({showMark:true})}}>
            Show Marks
          </Button>
          <hr className="my-4"></hr>

          <div className="row" style={{ marginTop: "20px" }}>
            <Enrolment enrolment id={student.ID} onSuccess={this.loadStudent} onError={error=>this.displayDialog(error)} />
            <Dropcourse enrolment id={student.ID} courses={student.Enrollments} onSuccess={this.loadStudent} onError={error=>this.displayDialog(error)}/>
          </div>

          <div className="row" style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Courselist course={student.Enrollments} />
          </div>

          <hr className="my-4"></hr>

          <div className="row" style={{ marginTop: "20px" }}>
            <Button primary onClick={() => {this.setState({isEditing:true})}}>
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

	isNew() {
		const { id } = this.props.match.params;
		return id === 'create';
	}

	loadStudent = () => {
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

  renderChart(){
    return(
      <Chart />
    )
  }


  renderForm() {
    const { student } = this.state;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <div className="form-group">
            <label>FirstName</label>
            <input
              type="text"
              className="form-control"
              placeholder="FirstName"
              value={student.FirstName || ''}
              name="FirstName"
              onChange={e => this.handleInputChange(e, "p")}
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
              onChange={e => this.handleInputChange(e, "p")}
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
              onChange={e => this.handleInputChange(e, "p")}
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
              onChange={e => this.handleInputChange(e, "p")}
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
          </fieldset>
        </div>
      </form>
    )
  }

	render() {
		const { isLoading, isEditing, showMark } = this.state;
		if (isLoading)
			return <span>Loading student</span>;

    if(showMark)
      return this.renderChart()

    if(isEditing === true){
      return this.renderForm()
    } else {
      return this.renderDisplay()

    }

	}
}
