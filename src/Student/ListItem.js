import React from 'react';
import { Link } from 'react-router-dom';

function Item(props) {
	const student = props.student;
	return (
		<li className="list-group-item">
			<p className="listContext">{student.FirstName}  {student.LastName}</p>

			<Link to={`/students/${student.ID}`} className="detailButton">
				Details
        	</Link>
			<div className="clear"></div>
		</li>
	)
}



export default function ListItem(props) {
	// const students = props.students;
	return (
		props.students.map((student, i) => <Item key={i} student={student} />)
	)
}
