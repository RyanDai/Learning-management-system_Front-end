import React, { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';

export default class StudentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			students: [],
			test: '0'
		}

	}

	sendRequest() {
		var studentURL = 'http://lms-sep-gruopc.azurewebsites.net/api/student';
		axios.get(studentURL)
			.then((response) => {
				this.setState({ test: '1' });
				const students = response.data.map(function (d) {
					return {
						ID: d.ID,
						FirstName: d.FirstName,
						LastName: d.LastName,
						Phone: d.Phone,
						Email: d.Email,
						Address: d.Address
					}
				});
				this.setState({ students });

			})
			.catch((error) => {
				console.log(error);

			});
	}

	componentWillMount() {
		this.sendRequest();
	}

	render() {
		return (
			<ul className="list-group">
				<ListItem students={this.state.students} />
			</ul>
		)
	}
}
