import React, { Component } from 'react';
import LecturerList from './LecturerList';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from '../UI/Spinner';
import Modal from "../Utils/Modal";
import ErrorMsg from '../Utils/ErrorMsg';

export default class LecturersView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			lectures: [],
			showError: false,
			error: null
		}
	}

	loadLectures() {
		this.setState({ isLoading: true });
		axios.get("/api/lecturer")
			.then(response => {
				this.setState({ lectures: response.data });
				console.log(response.data);
				this.setState({ isLoading: false });
			})
			.catch(error => {
				const errorMsg = <ErrorMsg error={error} />;
				this.displayDialog(errorMsg); console.log(error);
			})
	}

	displayDialog = (error) => {
		this.setState({ showError: true, error: error });
	}

	hideDialog = () => {
		this.setState({ showError: false });
	}

	componentWillMount() {
		this.loadLectures();
	}

	render() {
		const { isLoading, lectures } = this.state;
		// if (isLoading)
		//     return <span>Loading lectures</span>;
		if (isLoading)
			return <Spinner />;

		return (
			<div>
				{this.state.showError && <Modal btnClick={this.hideDialog}>
					<div>{this.state.error}</div>
				</Modal>}
				<h1 style={{ color: "white" }}>Lectures</h1>
				<LecturerList ls={lectures} />
				<Link className="btn btn-danger shadow-sm" style={{ marginTop: "10px" }} to={`/lecturers/create`}>Create New Lecturer</Link>
			</div>
		)

	}
}