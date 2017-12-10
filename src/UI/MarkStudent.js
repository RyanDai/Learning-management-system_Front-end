import React, { Component } from 'react';
import axios from 'axios';
import { Spinner } from '../UI/Spinner';
import ErrorMsg from '../Utils/ErrorMsg';
import Request from '../Utils/Request';
import Button from '../UI/Button';
import Highlight from './Highlight';

export default class MarkStudent extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      sID:0,
      cID:0,
      Marks:{
        A1:0,
        A2:0,
        A3:0
      }
    }
	}

  loadScore(studentID, courseID){
		this.setState({ isLoading: true });
    //axios.get(`/api/score/${studentID}/${courseID}`)
		console.log(studentID+","+courseID)
		Request("GET", `/api/score/${studentID}/${courseID}`, null)
      .then((response) => {
        this.setState({
          isLoading: false,
          Marks:{
            A1:response.data.Assignment1,
  					A2:response.data.Assignment2,
  					A3:response.data.Assignment3
          }
        });
      })
      .catch((error) => {
				console.log(error)
        this.handleErrorResponse(error);
      });
	}

  handleErrorResponse = (error) => {
    this.setState({ isLoading: false });
    const errorMsg = <ErrorMsg error={error} />;
    this.displayDialog(errorMsg);
    if (error.response.status === 401) {
      this.setState({ redirect: true })
    }
  }

	displayDialog = (error) => {
    this.setState({ showError: true, error: error });
  }

  componentWillMount() {
    const studentID = this.props.sID;
		const courseID = this.props.cID;
    this.setState({
      sID:studentID,
      cID:courseID
    });
		this.loadScore(studentID, courseID);
  }

  handleCancel() {
    this.props.cancelMarking();
  }

  handleSubmit(event) {
    event.preventDefault(); // prevent default form submission
    this.setState({ isLoading: true });
    const { Marks, sID, cID } = this.state;


    Request("POST", `/api/score/${sID}/${cID}`, Marks)
      // axios.put(`/api/student/${student.ID}`, student)
      .then(response => {
        this.setState({ isEditing: false, isLoading: false });
      })
      .catch(error => {
        this.handleErrorResponse(error);
    });

}

  handleInputChange = (event, field) => {
    const target = event.target;
    const { name, value } = target;

    if (field === "p") {
      this.setState({
        Marks: {
          ...this.state.Marks,
          [name]: value
        }
      })
    }
  };

  renderMarkForm(){
    return(
      <Highlight id="main-body">
        <h1>Update score</h1>
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <div className="form-group">
            <label>Assignment1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Assignment1"
              value={this.state.Marks.A1}
              name="A1"
              onChange={e => this.handleInputChange(e, "p")}
            />
          </div>
          <div className="form-group">
            <label>Assignment2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Assignment2"
              value={this.state.Marks.A2}
              name="A2"
              onChange={e => this.handleInputChange(e, "p")}
            />
          </div>
          <div className="form-group">
            <label>Assignment3</label>
            <input
              type="text"
              className="form-control"
              placeholder="Assignment3"
              value={this.state.Marks.A3}
              name="A3"
              onChange={e => this.handleInputChange(e, "p")}
            />
          </div>
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
    </Highlight>
    )
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading)
      return <Spinner />;

    return this.renderMarkForm()

  }
}
