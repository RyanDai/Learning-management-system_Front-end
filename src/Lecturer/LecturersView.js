import React, {Component} from 'react';
import LecturerList from './LecturerList';
import axios from 'axios';

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
        if (isLoading)
            return <span>Loading lectures</span>;

        return (
            <div>
                <h1>Lectures</h1>
                <LecturerList ls={lectures}/>
            </div>
        )

    }
}