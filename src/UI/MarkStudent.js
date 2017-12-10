import React, { Component } from 'react';
import axios from 'axios';
import { Spinner } from '../UI/Spinner';

export default class MarkStudent extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading:false
    }
	}

  renderMarkForm(){
    return(
    <h1>Still working</h1>
  )
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading)
      return <Spinner />;

    return this.renderMarkForm()

  }
}
