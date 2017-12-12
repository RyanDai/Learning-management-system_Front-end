import React, { Component } from 'react';
import Clock from '../Utils/Clock';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    componentDidMount() {
        setInterval(
            () => this.setState({ date: new Date() }),
            1000
        );
    }


    render(){
        return(
            <div className={"dash-component-wrapper"}>
                <Clock/>
            </div>
        )
    }
}