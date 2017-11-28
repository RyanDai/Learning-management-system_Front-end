import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

export default function CourseCard(props) {
	return (
		<div className="col-sm-6 col-md-3">
			<div className="thumbnail jr-course-card">
				<div className="course-card">
					<h4 className="course-card-name">{props.course.Name}</h4>
					<p className="course-card-code">{props.course.CourseCode}</p>
					<p className="course-card-description">{props.course.Description}</p>
				</div>
				<Link to={`/courses/${props.course.ID}`}>
					<Button>
						Details
					</Button>
				</Link>
			</div>
		</div>
	)
}
