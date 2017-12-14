import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Highlight from './Highlight';
import Card from '../component/Card/Card.jsx';
import BigCalendar from 'react-big-calendar';
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment';
import { events } from '../variables/Variables.jsx';
import { confirmAlert } from 'react-confirm-alert';


BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: events,
            alert: null,
            eventTitle: ""
        };
        this.hideAlert = this.hideAlert.bind(this);
    }

    selectedEvent(event) {
        alert(event.title);
    }
    addNewEventAlert(slotInfo) {
        confirmAlert({
            title: 'Add new notes',                        // Title dialog
            message: 'Add notes into calendar',
            childrenElement: () => (
                <div div className="dialog-content">
                    <input type="text" placeholder="Add a new note"
                        className="form-control" name="note" onChange={e => this.setState({ eventTitle: e.target.value })} required />
                </div>
            ),               // Message dialog       // Custom UI or Component
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: (e) => this.addNewEvent(e, slotInfo),     // Action after Cancel
        })
    }
    addNewEvent(e, slotInfo) {
        console.log(e, slotInfo);
        var newEvents = this.state.events;
        newEvents.push({
            'title': this.state.eventTitle,
            'start': slotInfo.start,
            'end': slotInfo.end
        })
        this.setState({
            alert: null,
            events: newEvents
        })
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="container">
                    <h1 style={{ color: "white" }}>Calendar</h1>
                </div>

                <div className="main-content">
                    {this.state.alert}

                    <Card
                        calendar
                        content={
                            <BigCalendar
                                selectable
                                events={this.state.events}
                                defaultView='month'
                                scrollToTime={new Date(1970, 1, 1, 6)}
                                defaultDate={new Date()}
                                onSelectEvent={event => this.selectedEvent(event)}
                                onSelectSlot={(slotInfo) => this.addNewEventAlert(slotInfo)}
                            />
                        }
                    />

                </div>

            </div>

        )

    }
}
