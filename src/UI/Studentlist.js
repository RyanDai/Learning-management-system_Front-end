import React from 'react';
import { Link } from 'react-router-dom';

function Student(props) {
	const student = props.student;
	return (
		<Link className="list-group-item" to={`/students/${student.Student.ID}`}>
			{student.Student.FirstName} / {student.Student.LastName}
		</Link>
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