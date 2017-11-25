import React, {Component} from 'react';
import LecturerList from './LecturerList';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Spinner} from '../UI/Spinner';

export default class LecturersView extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            lectures:[]

        }
    }

    loadLectures() {
        this.setState({isLoading:true});
        axios.get("/api/lecturer")
            .then(response => {
                this.setState({lectures:response.data});
                console.log(response.data);
                this.setState({isLoading:false});
            })
            .catch(error => {
                console.log(error);
            })
    }


    componentWillMount() {
        this.loadLectures();
    }

    render() {
        const {isLoading, lectures} = this.state;
        // if (isLoading)
        //     return <span>Loading lectures</span>;
        if (isLoading)
            return <Spinner/>;

        return (
            <div>
                <h1>Lectures</h1>
                <LecturerList ls={lectures}/>
                <Link className = "btn btn-danger shadow-sm" to={`/lecturers/create`}>Create</Link>
            </div>
        )

    }
}