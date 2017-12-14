import React, { Component } from 'react';
import CountClock from "./CountClock/CountClock";

export default class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }





    render() {
        return (
            <div className={"dash-component-wrapper"}>
                <h1>Count Down</h1>
                <CountClock />
            </div>
        )
    }
}