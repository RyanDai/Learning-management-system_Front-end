import React, { Component } from 'react';
import './count-clock.css';
import startCountDown, { stopCountDown } from "./CountTime";
import Request from '../../Utils/Request';
import { confirmAlert } from 'react-confirm-alert';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class CountClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StartTime: '2017-09-19',
            EndTime: '2017-12-19'
        }
    }

    componentDidMount() {
        Request("GET", "/api/dash/time")
            .then(r => {
                console.log(r.data);
                this.setState({ ...r.data })
                startCountDown(this.state.EndTime);
            }
            ).catch(r => {
                console.log(r);
            })
    }

    requestTimeChange = () => {
        const { StartTime, EndTime } = this.state;
        stopCountDown();
        Request("PUT", "/api/dash/time", { StartTime, EndTime })
            .then(r => console.log(r))
            .catch(e => console.log(e))
        startCountDown(EndTime);

    }

    handleTimeChange = (event, date) => {
        this.setState({
            EndTime: this.convertDate(date.toLocaleString().substring(0, 10))
        });
    }

    convertDate = (date) => {
        let d = date.split("/");
        let result = "";
        result += d[2] + "-" + d[1] + "-" + d[0];
        return result;
    }

    changeTime = () => {
        confirmAlert({
            title: 'Count Down Picker',                        // Title dialog
            message: 'Pick a new date for count down',               // Message dialog
            childrenElement: () => (<MuiThemeProvider className="dialog-content">
                <DatePicker hintText="Pick a date" defaultDate={new Date(this.state.EndTime)} onChange={this.handleTimeChange} />
            </MuiThemeProvider>),       // Custom UI or Component
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: this.requestTimeChange,     // Action after Cancel
        })
    }

    render() {
        return (
            <div>
                <a onClick={this.changeTime}><i className="fa fa-clock-o" aria-hidden="true" /></a>
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