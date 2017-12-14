import React from 'react';
import { Link } from 'react-router-dom';
const colorList = [
	'#226ed2', "#d2226e", "#6ed222", "#f2fd3d"
];
export default function CourseCard(props) {
	return (
		<div className="col-sm-6 col-md-4">
			<Link to={`/courses/${props.course.ID}`}>
				<div className="course-card" style={{ border: "3px solid", borderColor: `${colorList[Math.floor(Math.random() * 3)]}` }}>
					<h4 className="course-card-name">{props.course.Name}</h4>
					<p className="course-card-code">{props.course.CourseCode}</p>
					<p className="course-card-description">{`${props.course.Description.slice(0, 90)}...`}</p>
				</div>
			</Link>
		</div>
	)
}
