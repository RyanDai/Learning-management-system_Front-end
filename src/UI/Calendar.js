import React, { Component } from 'react';
import Highlight from './Highlight';

export default class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

  render(){
    return(
      <Highlight id="main-body">
        <div className="container">
          <h1 style={{ color: "white" }}>Calendar</h1>
        </div>
    </Highlight>
      )
  }
}
