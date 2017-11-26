import React, {Component} from 'react';
import axios from 'axios';
import Button from './Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Spinner } from '../UI/Spinner';

function Course(props) {
    const course = props.course;
    return (
        <option value={course.ID}>{course.Name}</option>
    )
}

export default class Enrolment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course:{},
            courseID:"0",
            isLoading: false
        }
    }

    handleAssign=()=>{
        const {course} = this.state;
        confirmAlert({
            title: 'Course Assign',                        // Title dialog
            message: 'Select a course from below',               // Message dialog
            childrenElement: () => (<div className="dialog-content">
                <select class="custom-select" onChange={(e)=>this.setState({courseID:e.target.value})}>
                    <option value="0">Open this select menu</option>
                    {
                        course.map(
                            (course) => <Course key={`${course.ID}`} course={course} />)
                    }
                </select>
            </div>),       // Custom UI or Component
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: this.requestEnrol,     // Action after Cancel
        })
    }

    loadCourse=()=> {
        this.setState({ isLoading: true });
        axios.get(`/api/course`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    course: response.data,
                    isLoading: false
                });
                this.handleAssign();
            })
            .catch(error => console.log(error));
    }

    requestEnrol = () => {

        var url = "";
        if(this.props.teaching) {
            url="/api/teaching/";
        } else {
            url="/api/enrolment/"
        }
        url += `${this.props.id}/${this.state.courseID}`;
        console.log(url);
        axios.post(url)
            .then(response => {
                console.log(response.data);
                this.setState({
                    course: response.data,
                    isLoading: false
                });
            })
            .catch(error => console.log(error));
    }
    render() {
        const {isLoading} = this.state;
        if (isLoading)
            return <Spinner />;

        return (
            <Button primary onClick={this.loadCourse}>
                Assign
            </Button>
        )
    }
}