import React from 'react';
import { Link } from 'react-router-dom';

function Lecture(props) {
	const lecturer = props.lecturer;
	return (
		<Link className="list-group-item" to={`/lecturers/${lecturer.Lecturer.ID}`}>
			{lecturer.Lecturer.FirstName} / {lecturer.Lecturer.LastName}
		</Link>
	)
}

export default function Teachinglist(props) {
	return (
		<div className="list-group">
			{
				props.lecturer.map(
					(lecturer) => <Lecture key={`${lecturer.Lecturer.ID}`} lecturer={lecturer} />)
			}
		</div>
	)
}