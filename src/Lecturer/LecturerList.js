import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

function Lecture(props) {
    const lecturer = props.lecturer;
    console.log(lecturer.ID);
    return (
        <Link className="list-group-item" to={`/lecturers/${lecturer.ID}`}>
            <Gravatar email={lecturer.Email} /> &nbsp;
            {lecturer.FirstName} / {lecturer.LastName}
        </Link>
    )
}

export default function LectureList(props) {
    return (
        <ul className="list-group">
            {
                props.ls.filter(
                    (l) =>
                        (props.search === "") || (l.FirstName.indexOf(props.search) !== -1) || (l.LastName.indexOf(props.search) !== -1)
                ).map(
                    (lecturer) => <Lecture key={`${lecturer.ID}`} lecturer={lecturer} />)
            }
        </ul>
    )
}

