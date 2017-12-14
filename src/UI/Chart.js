import { Table } from 'react-bootstrap';
import Card from '../component/Card/Card.jsx';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import React, { Component } from 'react';
import { charts } from '../variables/chartsVariables.jsx';
// import axios from 'axios';
import Highlight from '../UI/Highlight';
import Button from '../UI/Button';
import ErrorMsg from '../Utils/ErrorMsg';
import Request from '../Utils/Request';
import { Link } from 'react-router-dom';



export default class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sID: 0,
			cID: 0,
			Assignment1: 0,
			Assignment2: 0,
			Assignment3: 0,
			Grade1: "Fail",
			Grade2: "Fail",
			Grade3: "Fail",
			Credit1: 0,
			Credit2: 0,
			Credit3: 0,
			isLoading: false,
			isLineChart: true,
			isBarChart: false
		}
	}

	loadScore(studentID, courseID) {
		this.setState({ isLoading: true });
		//axios.get(`/api/score/${studentID}/${courseID}`)
		Request("GET", `/api/score/${studentID}/${courseID}`, null)
			.then((response) => {
				this.setState({
					isLoading: false,
					Assignment1: response.data.Assignment1,
					Assignment2: response.data.Assignment2,
					Assignment3: response.data.Assignment3
				});
				this.setGradeCredit();
			})
			.catch((error) => {
				console.log(error)
				this.handleErrorResponse(error);
			});
	}

	componentWillMount() {
		const studentID = this.props.studentID;
		const courseID = this.props.courseID;
		this.setState({
			sID: studentID,
			cID: courseID
		});
		this.loadScore(studentID, courseID);
		//console.log(studentID + " and " + courseID);
	}

	setGradeCredit() {
		const { Assignment1, Assignment2, Assignment3 } = this.state;

		if (Assignment1 < 50) {
			this.setState({
				Grade1: "Fail",
				Credit1: 0
			});
		} else if (Assignment1 >= 50 && Assignment1 < 65) {
			this.setState({
				Grade1: "Pass",
				Credit1: 2
			});
		} else if (Assignment1 >= 65 && Assignment1 < 75) {
			this.setState({
				Grade1: "Credit",
				Credit1: 2
			});
		} else if (Assignment1 >= 75 && Assignment1 < 85) {
			this.setState({
				Grade1: "Distinction",
				Credit1: 2
			});
		} else {
			this.setState({
				Grade1: "High distinction",
				Credit1: 2
			});
		}
		if (Assignment2 < 50) {
			this.setState({
				Grade2: "Fail",
				Credit2: 0
			});
		} else if (Assignment2 >= 50 && Assignment2 < 65) {
			this.setState({
				Grade2: "Pass",
				Credit2: 2
			});
		} else if (Assignment2 >= 65 && Assignment2 < 75) {
			this.setState({
				Grade2: "Credit",
				Credit2: 2
			});
		} else if (Assignment2 >= 75 && Assignment2 < 85) {
			this.setState({
				Grade2: "Distinction",
				Credit2: 2
			});
		} else {
			this.setState({
				Grade2: "High distinction",
				Credit2: 2
			});
		}

		if (Assignment3 < 50) {
			this.setState({
				Grade3: "Fail",
				Credit3: 0
			});
		} else if (Assignment3 >= 50 && Assignment3 < 65) {
			this.setState({
				Grade3: "Pass",
				Credit3: 2
			});
		} else if (Assignment3 >= 65 && Assignment3 < 75) {
			this.setState({
				Grade3: "Credit",
				Credit3: 2
			});
		} else if (Assignment3 >= 75 && Assignment3 < 85) {
			this.setState({
				Grade3: "Distinction",
				Credit3: 2
			});
		} else {
			this.setState({
				Grade3: "High distinction",
				Credit3: 2
			});
		}


	}

	handleErrorResponse = (error) => {
		this.setState({ isLoading: false });
		const errorMsg = <ErrorMsg error={error} />;
		this.displayDialog(errorMsg);
		if (error.response.status === 401) {
			this.setState({ redirect: true })
		}
	}

	displayDialog = (error) => {
		this.setState({ showError: true, error: error });
	}

	hideChart() {
		this.props.hideChart();
	}

	renderBarChart() {
		const barChart = {
			type: "Bar",
			data: {
				labels: ['Ass1', 'Ass2', 'Ass3'],
				series: [
					[this.state.Assignment1, this.state.Assignment2, this.state.Assignment3]
				]
			},
			options: {
				seriesBarDistance: 10,
				classNames: {
					bar: 'ct-bar ct-azure'
				},
				axisX: {
					showGrid: false
				}
			},
			responsiveOptions: [
				['screen and (max-width: 640px)', {
					seriesBarDistance: 5,
					axisX: {
						labelInterpolationFnc: function (value) {
							return value[0];
						}
					}
				}]
			]
		}
		return (
			<div className="main-content">
				<Card
					title="Score bar chart"
					content={
						<ChartistGraph
							data={barChart.data}
							type="Bar"
							options={barChart.options}
							responsiveOptions={barChart.responsiveOptions}
						/>
					}
				/>
			</div>
		)
	}

	renderLineChart() {
		const lineChart = {
			type: "Line",
			data: {
				labels: ['Ass1', 'Ass2', 'Ass3'],
				series: [
					[this.state.Assignment1, this.state.Assignment2, this.state.Assignment3]
				]
			},
			options: {
				lineSmooth: true,
				height: "270px",
				axisY: {
					offset: 40,
					labelInterpolationFnc: function (value) {
						return value;
					}
				},
				low: 0,
				high: 110,
				classNames: {
					point: 'ct-point ct-green',
					line: 'ct-line ct-green'
				},
				chartPadding: {
					right: -100
				}
			}
		}
		return (
			<div className="main-content">
				<Card
					title="Score line chart"
					content={
						<ChartistGraph
							data={lineChart.data}
							type="Line"
							options={lineChart.options}

						/>
					}
				/>
			</div>
		)
	}

	renderButton() {
		return (
			<div>
				<h1>Student score</h1>
				<div className="row" style={{ marginTop: "20px" }}>
					<Button primary onClick={() => {
						this.setState(
							{
								isLineChart: true,
								isBarChart: false
							}
						)
					}}>
						Line chart
					</Button>
					<Button primary onClick={() => {
						this.setState(
							{
								isLineChart: false,
								isBarChart: true
							}
						)
					}}>
						Bar chart
					</Button>
					<Button primary onClick={() => { this.hideChart() }}>
						Back
					</Button>
				</div>
				<hr className="my-4"></hr>
			</div>
		)
	}

	renderTable() {
		return (
			<Card
				title="Academic Transcript"
				category="Student scores"
				tableFullWidth
				content={
					<Table responsive>
						<thead>
							<tr>
								<th className="text-center">#</th>
								<th>Assignment Name</th>
								<th>Students Marks</th>
								<th>Grades</th>
								<th>Credits</th>
								<th>course profile</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="text-center">1</td>
								<td>Assignment1</td>
								<td>{this.state.Assignment1}</td>
								<td>{this.state.Grade1}</td>
								<td>{this.state.Credit1}</td>
								<td><Link className="nav-link" to={`/courses/${this.state.cID}`}><i className="fa fa-book" aria-hidden="true" /></Link></td>

							</tr>
							<tr>
								<td className="text-center">2</td>
								<td>Assignment2</td>
								<td>{this.state.Assignment2}</td>
								<td>{this.state.Grade2}</td>
								<td>{this.state.Credit2}</td>
								<td><Link className="nav-link" to={`/courses/${this.state.cID}`}><i className="fa fa-book" aria-hidden="true" /></Link></td>
							</tr>
							<tr>
								<td className="text-center">3</td>
								<td>Assignment3</td>
								<td>{this.state.Assignment3}</td>
								<td>{this.state.Grade3}</td>
								<td>{this.state.Credit3}</td>
								<td><Link className="nav-link" to={`/courses/${this.state.cID}`}><i className="fa fa-book" aria-hidden="true" /></Link></td>
							</tr>

						</tbody>
					</Table>
				}
			/>
		)
	}



	buttonDiv = () => {
		return (
			<div>
				<h1>Student score</h1>
				<div className="row" style={{ marginTop: "20px" }}>
					<Button primary onClick={() => {
						this.setState(
							{
								isLineChart: true,
								isBarChart: false
							}
						)
					}}>
						Line chart
					</Button>
					<Button primary onClick={() => {
						this.setState(
							{
								isLineChart: false,
								isBarChart: true
							}
						)
					}}>
						Bar chart
					</Button>
					<Button primary onClick={() => { this.hideChart() }}>
						Back
					</Button>
				</div>
				<hr className="my-4"></hr>
			</div>
		)
	}
	render() {
		const { isLoading, isLineChart, isBarChart } = this.state;
		if (isLoading)
			return <span>Loading student</span>;


		return (
			<Highlight id="main-body">

				{this.renderButton()}
				{this.renderTable()}
				{
					isLineChart ? this.renderLineChart() : this.renderBarChart()
				}


			</Highlight>
		)






	}

}
