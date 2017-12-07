import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../component/Card/Card.jsx';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import React, { Component } from 'react';
import { charts } from '../variables/chartsVariables.jsx';
import axios from 'axios';
import Highlight from '../UI/Highlight';


export default class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Assignment1:0,
			Assignment2:0,
			Assignment3:0,
			isLoading:false
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

  render(){

		const nasdaqChart = {
		    type: "Line",
		    data: {
		        labels: ['Assignment1','Assignment2','Assignment3'],
		        series: [
		            [this.state.Assignment1,this.state.Assignment2,this.state.Assignment3]
		        ]
		    },
		    options: {
		        lineSmooth: true,
		        height: "260px",
		        axisY: {
		            offset: 40,
		            labelInterpolationFnc: function(value) {
		                return value;
		            }

		        },
		        low: 0,
		        high: 100,
		        classNames: {
		            point: 'ct-point ct-green',
		            line: 'ct-line ct-green'
		        },
		        chartPadding: {
		          right: -10
		        }
		    }
		}

    return (
			<Highlight id="main-body">

        <h1>Student score</h1>
				<hr className="my-4"></hr>

        <div className="main-content">
            <Card
                title="Score line chart"
                content={
                    <ChartistGraph
                        data={nasdaqChart.data}
                        type={nasdaqChart.type}
                        options={nasdaqChart.options}
                    />
                }
            />
        </div>
			</Highlight>
    )
  }

}
