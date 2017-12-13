import React, { Component } from 'react';
import LecturerList from './LecturerList';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from '../UI/Spinner';
import Modal from "../Utils/Modal";
import ErrorMsg from '../Utils/ErrorMsg';
import Button from '../UI/Button';

export default class LecturersView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			lectures: [],
			showError: false,
			error: null,
			key: "",
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

	handleFilter = (e) => {
		this.setState({ key: e.target.value });
	}

	render() {
		const { isLoading, lectures, key } = this.state;
		// if (isLoading)
		//     return <span>Loading lectures</span>;
		if (isLoading)
			return <Spinner />;

		return (
			<div className="page-wrapper">
				{this.state.showError && <Modal btnClick={this.hideDialog}>
					<div>{this.state.error}</div>
				</Modal>}
				<h1 style={{ color: "white", padding: "10px" }}>Lectures</h1>
				<div className="row" style={{ margin: "10px auto" }}>
					<div className="col-sm-6">
						<Link to={`/lecturers/create`}>
							<Button danger>
								Create New Lecturer
							</Button>
						</Link>
					</div>
					<div className="col-sm-6">
						<input style={{ float: "right", margin: "5px auto" }} onChange={this.handleFilter} placeholder="Search by name" />
					</div>
				</div>
				<div style={{ margin: "10px 15px" }}>
					<LecturerList ls={lectures} search={key} />
				</div>
			</div>
		)

	}
}