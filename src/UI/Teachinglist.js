import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

function Lecture(props) {
	const lecturer = props.lecturer;
	return (
		<div className="list-group-item">
			<Link to={`/lecturers/${lecturer.Lecturer.ID}`}>
				<Gravatar style={{ height: "1.5rem", width: "1.5rem" }} email={lecturer.Lecturer.Email} /> &nbsp;
				{lecturer.Lecturer.FirstName} / {lecturer.Lecturer.LastName}
			</Link>
		</div>
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