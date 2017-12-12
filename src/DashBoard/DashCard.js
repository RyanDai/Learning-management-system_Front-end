import React from 'react';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function DashCard({ student, lecturer, number}) {
    // calculate the css class name

    let text = 'Courses';
    let to = "/courses";
    let icon = <i className="fa fa-book" aria-hidden="true"/>;
    if (student) {
        text = 'Students';
        to="/students";
        // replace icon
    }
    if (lecturer) {
        text = 'Lecturers';
        to="/lecturers"
        // replace icon
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
                        <h3>{number}</h3>
                    </Col>
                </Row>
                <Row>
                    <Link to={to}>View in details</Link>
                </Row>
            </Grid>

        </div>
    )
}