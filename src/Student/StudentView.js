import React, {Component} from 'react';
import StudentList from './StudentList';
import { Link } from 'react-router-dom';

export default class StudentView extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div className="mainContainer">
        <h1>Students</h1>
        <StudentList />
        <Link className="btn btn-danger shadow-sm" style={{marginTop:"10px"}} to={`/students/create`}>Add New Student</Link>

      </div>
    )

  }
}
