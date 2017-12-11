import React from 'react';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import Todo from "./Todo";
import Calendar from 'rc-calendar';
import '../styles/dashboard.css';

export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return (
            <div className={"page-wrapper"}>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={4}>Course section</Col>
                        <Col xs={12} md={4}>Lecturer section</Col>
                        <Col xs={12} md={4}>Student section</Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={12} md={4}><Todo/></Col>
                        <Col xs={12} md={8}>
                            <Row className="show-grid">
                                <Col xs={6} lg={6}>Graph section</Col>
                                <Col xs={6} lg={6}>weather</Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={6} lg={6}>progress section</Col>
                                <Col xs={6} lg={6}><Calendar /></Col>
                            </Row>
                        </Col>
                    </Row>


                </Grid>
            </div>
        )
    }
}
