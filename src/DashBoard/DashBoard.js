import React from 'react';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import Todo from "./Todo";
import '../styles/dashboard.css';
import CountDown from "./CountDown";

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
                        <Col xs={12} sm={12} md={12} lg={4}><Todo/></Col>
                        <Col xs={12} sm={12} md={12} lg={8}>
                            <Row className="show-grid">
                                <Col xs={6} lg={6}>Graph section</Col>
                                <Col xs={6} lg={6}>weather</Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={6} lg={6}><CountDown/></Col>
                                <Col xs={6} lg={6}>calendar</Col>
                            </Row>
                        </Col>
                    </Row>


                </Grid>
            </div>
        )
    }
}