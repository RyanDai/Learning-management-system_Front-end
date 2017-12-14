import Card from '../component/Card/Card.jsx';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import React, { Component } from 'react';
import axios from 'axios';


export default class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
      isLoading:false,
      students:[],
      sexArray:[],
      total:0,
      male:0
    }
  }

  sendRequest() {
    //var studentURL = 'http://lms-sep-gruopc.azurewebsites.net/api/student';
    this.setState({ isLoading: true });
    axios.get("/api/student")
      .then((response) => {
        this.setState({
          isLoading: false,
          students: response.data
        });
        this.calculateSexArray();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  calculateSexRate(){
    const {sexArray} = this.state;
    var length = sexArray.length;
    var male = 0;
    sexArray.map(function(sex, i){
      if(sex === 'M'){
        male++;
      }
    });
    this.setState({
      total:length,
      male:male
    });
  }

  calculateSexArray(){
    const { students, sexArray } = this.state;
    students.map(function(student, i){
      if(student.Sex === 'Female'){
        sexArray.push('F');
      } else {
        sexArray.push('M');
      }
    });
    this.calculateSexRate();
  }

  componentWillMount() {
    this.sendRequest();

  }

  render(){
    const { total, male } = this.state;
    const maleRate = male/total*100;
    const female = total - male;
    const femaleRate = (total - male)/total*100;

    const publicChart = {
        type: "Pie",
        data: {
            labels: ['Male: ' + maleRate+'%', 'Famale: ' + femaleRate+'%'],
            series: [male, female]
        }
    }

    return(
      <div className={"dash-component-wrapper"}>
      <Card
          title="Sex Rate Chart"
          content={
              <ChartistGraph
                  data={publicChart.data}
                  type="Pie"
              />
          }
      />
      </div>
    )
  }
}
