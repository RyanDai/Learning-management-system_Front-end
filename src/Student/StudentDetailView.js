import React, {Component} from 'react';

export default class StudentDetailView extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className="detailContainer">
        <h1>Student details</h1>
        <div className="jumbotron">
          <h1 className="display-3">Student1</h1>
          <p className="lead">Some information</p>
          <hr className="my-4"></hr>
          <p>It uses utility classetypography and spacing to space content out within the larger container.</p>
          <p className="lead">
            <button className="btn btn-primary btn-lg">Edit student</button>
          </p>
        </div>
      </div>
    )

  }
}
