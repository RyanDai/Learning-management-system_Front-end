import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/course-list.css'
function Course(props) {
    const course = props.course;
    return (
        <Link className="border p-2 w-50" to={`/courses/${course.Course.ID}`}>
            {course.Course.Name}
        </Link>
    )
}

export default function Courselist(props) {
    return (
        <div className="col-10 offset-1 course-list">
            <div className="d-flex flex-row flex-wrap">
                {
                    props.course.map(
                        (course) => <Course key={`${course.Course.ID}`} course={course} />)
                }
            </div>
        </div>

    )
}