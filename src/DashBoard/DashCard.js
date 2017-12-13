import React from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function DashCard({ student, lecturer, number }) {
    // calculate the css class name

    let text = 'Courses';
    let to = "/courses";
    let icon = <img src={require('../img/course.png')} height="80px" width="80px" />;
    if (student) {
        text = 'Students';
        to = "/students";
        icon = <img src={require('../img/student.png')} height="80px" width="80px" />;
    }
    if (lecturer) {
        text = 'Lecturers';
        to = "/lecturers"
        icon = <img src={require('../img/lecturer.png')} height="80px" width="80px" />;
    }

    // const title = `Total number of ${text} are:`;
    return (
        <div className={"dash-component-wrapper"}>
            <Grid>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        {icon}
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <h2>{text}</h2>
                        <h3>{number} in total</h3>
                    </Col>
                </Row>
                <Row>
                    <Link to={to}>View in details</Link>
                </Row>
            </Grid>

        </div>
    )
}