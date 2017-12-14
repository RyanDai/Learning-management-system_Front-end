import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Todo from "./Todo";
import Calendar from 'rc-calendar';
import PieChart from '../UI/PieChart';
import '../styles/dashboard.css';
import CountDown from "./CountDown";
import Request from "../Utils/Request";
import DashCard from './DashCard';
import Weather from "./Weather";
import { Link } from 'react-router-dom';

export default class DashBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			students: [],
			lecturers: [],
			courses: []
		}
	}

	componentWillMount() {
		Request("GET", '/api/student')
			.then(r => {
				this.setState({ students: r.data });
				return Request("GET", '/api/lecturer');
			})
			.then(r => {
				this.setState({ lecturers: r.data });
				return Request("GET", '/api/course');
			})
			.then(r => {
				this.setState({ courses: r.data });
				return Request("GET", '/api/course');
			})
			.catch(e => {
				console.log(e);
			})
	}

	render() {
		const { students, lecturers, courses } = this.state;
		return (
			<div className={"page-wrapper"} id={"dash-wrapper"}>
				<Grid>
					<Row className="show-grid">
						<Col sm={12} lg={4}><DashCard number={courses.length} /></Col>
						<Col sm={12} lg={4}><DashCard student number={students.length} /></Col>
						<Col sm={12} lg={4}><DashCard lecturer number={lecturers.length} /></Col>
					</Row>

					<Row className="show-grid">
						<Col xs={12} sm={12} md={12} lg={4}><Todo /></Col>
						<Col xs={12} sm={12} md={12} lg={8}>
							<Row className="show-grid">
								<Col xs={6} lg={6}>
                  <div className={"dash-component-wrapper"}>
                    <h1>Sex Rate Chart</h1>
                    <PieChart />
                  </div>
                </Col>
								<Col xs={6} lg={6}><Weather /></Col>
							</Row>

							<Row className="show-grid">
								<Col xs={6} lg={6}><CountDown /></Col>
								<Col xs={6} lg={6}>
									<div className={"dash-component-wrapper-pie"}>
										<h1>Calendar &nbsp;
                    <Link className="calendarIcon" to="/calendar"><i className="fa fa-calendar" aria-hidden="true" /></Link>
                  </h1>
										<Calendar style={{ margin: "0 auto"}} />

									</div>
								</Col>
							</Row>
						</Col>
					</Row>
					{/*<Row className="show-grid">*/}
					{/*<Col xs={12} lg={12}>*/}
					{/*<div className="dash-component-wrapper" >*/}
					{/*<img src={require('../img/school-pic.png')} height="100%" width="100%" />*/}
					{/*</div>*/}
					{/*</Col>*/}
					{/*</Row>*/}
				</Grid>
			</div>
		)
	}
}
