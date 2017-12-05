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
		<div className="list-group col-8 offset-2">
			{
				props.lecturer.map(
					(lecturer) => <Lecture key={`${lecturer.Lecturer.id}`} lecturer={lecturer} />)
			}
		</div>
	)
}