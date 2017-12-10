import React, { Component } from 'react';
import CountClock from "./CountClock/CountClock";

export default class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime:'2017-09-19',
            endTime:'2017-12-19'
        }
    }

    componentDidMount(){
    }



    render(){
        return(
            <div className={"dash-component-wrapper"}>
                <CountClock/>
            </div>
        )
    }
}