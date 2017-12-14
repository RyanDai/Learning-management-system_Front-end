import React from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatsCard from '../component/Card/StatsCard.jsx';


export default function DashCard({ student, lecturer, number }) {
    // calculate the css class name

    let text = 'Courses';
    let to = "/courses";
    let icon = <img src={require('../img/course.png')} height="100px" width="100px" alt="course" />;
    if (student) {
        text = 'Students';
        to = "/students";
        icon = <img src={require('../img/student.png')} height="100px" width="100px" alt="student" />;
    }
    if (lecturer) {
        text = 'Lecturers';
        to = "/lecturers"
        icon = <img src={require('../img/lecturer.png')} height="100px" width="100px" alt="lecturer" />;
    }

    // const title = `Total number of ${text} are:`;
    return (
        <div className={"dash-component-wrapper"}>
            <StatsCard
                bigIcon={icon}
                statsText={text + ":"}
                statsValue={number}
                statsIcon={<i className="fa fa-folder-open"></i>}
                statsIconText={<Link to={to}>View in details</Link>}
            />
        </div>
    )
}