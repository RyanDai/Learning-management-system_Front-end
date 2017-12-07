import React, { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import { Spinner } from '../UI/Spinner';

export default class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isloading: false

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
      })
      .catch((error) => {
        console.log(error);

      });
  }

  componentWillMount() {
    this.sendRequest();
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading)
      return <Spinner />;

    return (
      <ListItem students={this.state.students} />
    )
  }
}
