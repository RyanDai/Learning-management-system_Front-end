import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../component/Card/Card.jsx';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import React, { Component } from 'react';
import { charts } from '../variables/chartsVariables.jsx';
import axios from 'axios';
import Highlight from '../UI/Highlight';
import Button from '../UI/Button';


export default class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Assignment1:0,
			Assignment2:0,
			Assignment3:0,
			isLoading:false,
			isLineChart:false,
			isBarChart:true
		}
	}

	loadScore(studentID, courseID){
		this.setState({ isLoading: true });
    axios.get(`/api/score/${studentID}/${courseID}`)
      .then((response) => {
        this.setState({
          isLoading: false,
          Assignment1:response.data.Assignment1,
					Assignment2:response.data.Assignment2,
					Assignment3:response.data.Assignment3
        });
      })
      .catch((error) => {
        console.log(error);
      });
	}

	componentWillMount() {
		const studentID = this.props.studentID;
		const courseID = this.props.courseID;
		this.loadScore(studentID, courseID);
		//console.log(studentID + " and " + courseID);
	}

	hideChart() {
		this.props.hideChart();
	}

	renderBarChart(barChart){
		return (
			<Highlight id="main-body">
        <h1>Student score</h1>
				<div className="row" style={{ marginTop: "20px" }}>
					<Button primary onClick={() => {this.setState(
						{isLineChart:true,
						isBarChart:false}
					)}}>
						Line chart
					</Button>
					<Button primary onClick={() => {this.setState(
						{isLineChart:false,
						isBarChart:true}
					)}}>
						Bar chart
					</Button>
					<Button primary onClick={() => {this.hideChart()}}>
						Back
					</Button>
				</div>
				<hr className="my-4"></hr>

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
				{console.log(barChart.type)}
			</Highlight>
    )
	}

	renderLineChart(lineChart){
		return (
			<Highlight id="main-body">
        <h1>Student score</h1>
				<div className="row" style={{ marginTop: "20px" }}>
					<Button primary onClick={() => {this.setState(
						{isLineChart:true,
						isBarChart:false}
					)}}>
						Line chart
					</Button>
					<Button primary onClick={() => {this.setState(
						{isLineChart:false,
						isBarChart:true}
					)}}>
						Bar chart
					</Button>
					<Button primary onClick={() => {this.hideChart()}}>
						Back
					</Button>
				</div>
				<hr className="my-4"></hr>

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
			</Highlight>
    )
	}

  render(){
		const lineChart = {
		    type: "Line",
		    data: {
		        labels: ['Ass1','Ass2','Ass3'],
		        series: [
		            [this.state.Assignment1,this.state.Assignment2,this.state.Assignment3]
		        ]
		    },
		    options: {
		        lineSmooth: true,
		        height: "270px",
		        axisY: {
		            offset: 40,
		            labelInterpolationFnc: function(value) {
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

		const barChart = {
		    type: "Bar",
		    data: {
		        labels: ['Ass1','Ass2','Ass3'],
		        series: [
		            [this.state.Assignment1,this.state.Assignment2,this.state.Assignment3]
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


		const { isLoading, isLineChart, isBarChart } = this.state;
		if (isLoading)
			return <span>Loading student</span>;

    if(isLineChart === true){
				return this.renderLineChart(lineChart)
		} else {
			  return this.renderBarChart(barChart)
		}




  }

}
