import React, {Component} from 'react';
import axios from 'axios';

export default class StudentDetailView extends Component{
  constructor(props){
    super(props);
    this.state = {
      num:0,
      student:{
        FirstName:"",
        LastName:"",
        phone:"",
        Email:""
      },
      isLoading:false,
      isEditing:false,
      isSaving:false
    }
  }

  sendRequest(id){
    var studentURL = 'http://lazebear.azurewebsites.net/api/student'+'/'+id;

    axios.get(studentURL)
      .then((response) => {
        this.setState({isLoading:false});
        const student = {
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
          <p className="lead">
            <button className="btn btn-primary btn-lg" onClick={() => {this.setState({isEditing:true})}}>Edit student</button>
          </p>
        </div>
      </div>
    )
  }

  handleSubmit(){

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
    return(
    <form onSubmit={(e)=> this.handleSubmit(e)}>
      <div className="form-group">
        <div className="form-group">
          <label>FirstName</label>
          <input
          type="text"
          className="form-control"
          placeholder="FirstName"
          value={this.state.student.FirstName || ''}
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

      <button type='submit'>Save</button>
      <button type='submit'>Cancel</button>
      </div>
    </form>
  )

  }

  render(){
    const {isLoading, isEditing} = this.state;
    if (isLoading)
      return <span>Loading course</span>;

      return isEditing ?
       this.renderForm() : this.renderDisplay()
  }
}
