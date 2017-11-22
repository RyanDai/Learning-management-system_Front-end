import React, {Component} from 'react';
import axios from 'axios';

export default class StudentList extends Component{
  constructor(props){
    super(props);
    this.state = {
      students:[]
    }
  }

  sendRequest(){
    var studentURL = 'http://lazebear.azurewebsites.net/api/student';

    axios.get(studentURL)
      .then((response) => {
        this.setState();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return(
      <ul className="list-group">
        <li className="list-group-item">
          <p className="listContext">Cras justo odio</p>
          <button className="detailButton">Details</button>
          <div className="clear"></div>
        </li>
        <li className="list-group-item">
          <p className="listContext">Dapibus ac facilisis</p>
          <button className="detailButton">Details</button>
          <div className="clear"></div>
        </li>
        <li className="list-group-item">
          <p className="listContext">Morbi leo risus</p>
          <button className="detailButton">Details</button>
          <div className="clear"></div>
        </li>
        <li className="list-group-item">
          <p className="listContext">Porta ac consectetur ac</p>
          <button className="detailButton">Details</button>
          <div className="clear"></div>
        </li>
        <li className="list-group-item">
          <p className="listContext">Vestibulum at eros</p>
          <button className="detailButton">Details</button>
          <div className="clear"></div>
        </li>
      </ul>
    )
  }
}
