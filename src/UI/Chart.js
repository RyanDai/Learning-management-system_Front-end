import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../component/Card/Card.jsx';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import React, { Component } from 'react';
import { charts } from '../variables/chartsVariables.jsx';


export default class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

  render(){
      return (
          <div className="main-content">
              <Grid fluid>
                  <Row>
                      {
                          charts.map((prop,key) => {
                              return (
                                  <Col md={6} key={key}>
                                      <Card
                                          title={prop.chart.title}
                                          category={prop.chart.category}
                                          content={
                                              <ChartistGraph
                                                  data={prop.chart.chart.data}
                                                  type={prop.chart.chart.type}
                                                  options={prop.chart.chart.options}
                                                  responsiveOptions={prop.chart.chart.responsiveOptions}
                                              />
                                          }
                                          legend={
                                              prop.chart.legend
                                          }
                                      />
                                  </Col>
                              );
                          })
                      }
                  </Row>
              </Grid>
          </div>
      );
  }

}
