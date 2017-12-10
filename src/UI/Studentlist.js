import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import MarkStudent from './MarkStudent';

class Student extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	markStudent(sID, cID){
	 this.props.mark(sID, cID);
 }

	render(){
		const student = this.props.student;
		return (
			<div className="list-group-item">
				<Link to={`/students/${student.Student.ID}`}>
					<Gravatar style={{ height: "1.5rem", width: "1.5rem" }} email={student.Student.Email} /> &nbsp;
					{student.Student.FirstName} / {student.Student.LastName}
				</Link>

				<a>
					<i className="fa fa-edit" style={{ float: "right", color:"blue" }} onClick={() => this.markStudent(student.Student.ID, this.props.id)}></i>
				</a>

			</div>
		)
	}


}

class Studentlist extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	mark(sID, cID){
		
		//{console.log(this.props)}
		this.props.giveScore(sID, cID);
	}


	 render() {
		const courseID = this.props.courseID;
		return (
			<div className="list-group">
				{
					this.props.student.map(
						(student) => <Student key={`${student.Student.ID}`} student={student} id={courseID} mark={(sID, cID)=>this.mark(sID, cID)}/>)
				}
			</div>
		)
	}

}

export default Studentlist;
