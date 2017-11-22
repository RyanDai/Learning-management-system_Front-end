import React, {Component} from 'react';
import StudentList from './StudentList';

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
        <button>Add student</button>
        <button>Remove student</button>
      </div>
    )

  }
}