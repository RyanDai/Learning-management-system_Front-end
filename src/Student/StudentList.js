import React, {Component} from 'react';

export default class StudentList extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <ul class="list-group">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    )
  }
}
