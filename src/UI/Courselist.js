import React from 'react';
import { Link } from 'react-router-dom';

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
        <div class="col-12 course-list">
            <div class="d-flex flex-row flex-wrap">
                {
                    props.course.map(
                        (course) => <Course key={`${course.Course.ID}`} course={course} />)
                }
            </div>
        </div>

    )
}