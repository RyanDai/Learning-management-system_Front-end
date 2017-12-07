import React, { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import { Spinner } from '../UI/Spinner';

export default class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      students: []

    }

  }

  sendRequest() {
    this.setState({ isLoading: true });
    //var studentURL = 'http://lms-sep-gruopc.azurewebsites.net/api/student';
    axios.get("/api/student")
      .then((response) => {
        this.setState({ students: response.data });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);

      });
  }

  componentWillMount() {
    this.sendRequest();
  }

  render() {
    const { isLoading, students } = this.state;
    if (isLoading)
      return <Spinner />;

    return (
      <ul className="list-group">
        <ListItem students={this.state.students} />
      </ul>
    )
  }
}
