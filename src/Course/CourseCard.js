import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard(props) {
	return (
		<div className="col-sm-6 col-md-4">
			<Link to={`/courses/${props.course.ID}`}>
				<div className="course-card">
					<h4 className="course-card-name">{props.course.Name}</h4>
					<p className="course-card-code">{props.course.CourseCode}</p>
					<p className="course-card-description">{props.course.Description}</p>
				</div>
			</Link>
		</div>
	)
}
