import React, {Component} from 'react';

export default class StudentList extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
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
