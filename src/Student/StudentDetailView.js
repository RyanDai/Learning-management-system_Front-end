import React, { Component } from 'react';
import axios from 'axios';
import Button from '../UI/Button';
import { confirmAlert } from 'react-confirm-alert';
import Enrolment from "../UI/Enrolment";
import Dropcourse from "../UI/Dropcourse";
import Courselist from '../UI/Courselist';
import Highlight from '../UI/Highlight';
import Chart from '../UI/Chart';
import Modal from "../Utils/Modal";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Spinner } from '../UI/Spinner';
import ErrorMsg from '../Utils/ErrorMsg';
import Request from '../Utils/Request';

export default class StudentDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      showError: false,
      error: null,
      showMark: false,
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
          Country: ""
        }
      },
      isLoading: false,
      isEditing: false,
      isSaving: false,
      chosenCourse: "",
      courseList: []
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
    Request("DELETE", `/api/student/${student.ID}`, null)
      // axios.delete(`/api/student/${student.ID}`)
      .then(() => {
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
    const errorMsg = <ErrorMsg error={error} />;
    this.displayDialog(errorMsg);
    if (error.response.status === 401) {
      this.setState({ redirect: true })
    }
  }

  renderDisplay() {
    const { showError, student, error } = this.state;

    return (
      <Highlight id="main-body">
        {showError && <Modal btnClick={this.hideDialog}>
          <div>{error}</div>
        </Modal>}
        <h1>Student details</h1>
        <div>
          <h1 className="display-3">{student.FirstName} {student.LastName}</h1>
          <p className="lead">Phone: {student.Phone}</p>
          <p>Email: {student.Email}</p>
          <hr className="my-4"></hr>

          <div className="row" style={{ marginTop: "20px" }}>
            <Enrolment enrolment id={student.ID} onSuccess={this.loadStudent} onError={error => this.displayDialog(error)} />
            <Dropcourse enrolment id={student.ID} courses={student.Enrollments} onSuccess={this.loadStudent} onError={error => this.displayDialog(error)} />
          </div>

          <div className="row" style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Courselist course={student.Enrollments} />
          </div>

          <hr className="my-4"></hr>

          <div className="row" style={{ marginTop: "20px" }}>
            <Button primary onClick={() => { this.setState({ isEditing: true }) }}>
              Edit student
            </Button>
            <Button danger onClick={this.confirmDelete}>
              Delete student
            </Button>
          </div>

          <hr className="my-4"></hr>

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


          <div className="row" style={{ marginTop: "20px" }}>

            <Button primary onClick={() => { this.setState({ showMark: true }) }}>
              Show Score
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
      Request("POST", `/api/student`, student)
        // axios.post('/api/student', student)
        .then(response => {
          this.props.history.push('/students');
        });
    } else {
      Request("PUT", `/api/student/${student.ID}`, student)
        // axios.put(`/api/student/${student.ID}`, student)
        .then(response => {
          this.setState({ isEditing: false, isLoading: false });
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

renderChart() {
  return (
    <Chart studentID={this.state.student.ID} courseID={this.state.chosenCourse} hideChart={() => this.hideChart()} />
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
      </div>

      <div className="form-group row">
        <Button primary type="submit" onClick={e => this.handleSubmit(e)}>
          Save
          </Button>
        <Button danger onClick={() => this.handleCancel()}>
          Cancel
          </Button>
      </div>
    </form>
  )
}

render() {
  const { isLoading, isEditing, showMark } = this.state;
  if (isLoading)
    return <Spinner />;

  if (showMark)
    return this.renderChart()

  if (isEditing === true) {
    return this.renderForm()
  } else {
    return this.renderDisplay()

  }

}
}
