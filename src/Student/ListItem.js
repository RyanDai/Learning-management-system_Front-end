import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

function Item(props) {
	const student = props.student;
	return (
		<Link className="list-group-item" to={`/students/${student.ID}`}>
			<Gravatar email={student.Email} /> &nbsp;
			{student.FirstName}  {student.LastName}
		</Link>

	)
}

export default function ListItem(props) {
	// const students = props.students;
	return (
		<ul className="list-group people-list">
			{props.students.filter(
				(l) =>
					(props.search === "") || (l.FirstName.indexOf(props.search) !== -1) || (l.LastName.indexOf(props.search) !== -1)
			).map((student, i) => <Item key={i} student={student} />)}
		</ul>
	)
}
