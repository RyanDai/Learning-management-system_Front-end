import React, {Component} from 'react';
import axios from 'axios';
import ListItem from './ListItem';

export default class StudentList extends Component{
  constructor(props){
    super(props);
    this.state = {
      students:[]

    }

  }

  sendRequest(){
    //var studentURL = 'http://lms-sep-gruopc.azurewebsites.net/api/student';
    axios.get("/api/student")
      .then((response) => {
        this.setState({students:response.data});
      })
      .catch((error) => {
        console.log(error);

      });
  }

  componentWillMount(){
    this.sendRequest();
  }

  render() {
    return(
      <ul className="list-group">
        <ListItem students={this.state.students} />
      </ul>
    )
  }
}
