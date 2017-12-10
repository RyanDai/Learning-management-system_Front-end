import React, { Component } from 'react';
import './count-clock.css';
import startCountDown from "./CountTime";

export default class CountClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime:'2017-09-19',
            endTime:'2017-12-19'
        }
    }

    componentDidMount(){
        startCountDown(this.state.endTime);
    }



    render(){
        return(
            <div>
                <div className="countdown" id="js-countdown">
                    <div className="countdown__item countdown__item--large">
                        <div className="countdown__timer js-countdown-days" id={"cd_day"} aria-labelledby="day-countdown">

                        </div>

                        <div className="countdown__label" id="day-countdown">Days</div>
                    </div>

                    <div className="countdown__item">
                        <div className="countdown__timer js-countdown-hours" id={"cd_hour"} aria-labelledby="hour-countdown">

                        </div>

                        <div className="countdown__label" id="hour-countdown">Hours</div>
                    </div>

                    <div className="countdown__item">
                        <div className="countdown__timer js-countdown-minutes" id={"cd_min"} aria-labelledby="minute-countdown">

                        </div>

                        <div className="countdown__label" id="minute-countdown">Minutes</div>
                    </div>

                    <div className="countdown__item">
                        {/*<div style={{backgroundColor:"black"}}>*/}
                        <div className="countdown__timer js-countdown-seconds" id={"cd_sec"} aria-labelledby="second-countdown">

                        </div>
                        {/*</div>*/}
                        <div className="countdown__label" id="second-countdown">Seconds</div>
                    </div>
                </div>
            </div>
        )
    }
}