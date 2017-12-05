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
		<div className="list-group col-8 offset-2">
			{
				props.student.map(
					(student) => <Student key={`${student.Student.id}`} student={student} />)
			}
		</div>
	)
}