import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

function Student(props) {
	const student = props.student;
	return (
		<div className="list-group-item">
			<Link to={`/students/${student.Student.ID}`}>
				<Gravatar style={{ height: "1.5rem", width: "1.5rem" }} email={student.Student.Email} /> &nbsp;
				{student.Student.FirstName} / {student.Student.LastName}
			</Link>
			<Link to="/#">
				<div className="fa fa-pencil-square-o" style={{ float: "right" }}></div>
			</Link>
		</div>
	)
}

export default function Studentlist(props) {
	return (
		<div className="list-group">
			{
				props.student.map(
					(student) => <Student key={`${student.Student.ID}`} student={student} />)
			}
		</div>
	)
}