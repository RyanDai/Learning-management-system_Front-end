import React, { Component } from 'react';
import Clock from '../Utils/Clock';
import axios from 'axios';
import CityWeather from '../Utils/Weather';

const CONDITION_BASE_URL = 'https://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/';
const FORECAST_BASE_URL = 'https://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/';


export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            UV: "",
            location: "",
            icon: "",
            temp: "",
            humidity: "",
            forecastData: {},
            weather: ""
        }
    }

    fetchData = (curCity) => {
        axios.get(`${CONDITION_BASE_URL}${curCity}.json`)
            .then(r => {
                console.log(r);
                this.filterData(r.data.current_observation);
                // this.setState({cityData:r.data})
                // return axios.get(`${FORECAST_BASE_URL}${curCity}.json`);
            })
            // .then(r => {
            //     // const respData = JSON.parse(forecast);
            //     console.log(r);
            //     this.setState({forecastData:r.data})
            // })
            .catch(e => {
                console.log(e)
            });
    }

    filterData = (data) => {
        this.setState({
            UV: data.UV,
            location: data.display_location.city,
            icon: data.icon_url,
            temp: data.temp_c,
            humidity: data.relative_humidity,
            weather: data.icon
        })
    }

    componentWillMount() {
        this.fetchData("Brisbane");
    }

    componentDidMount() {
        setInterval(
            () => this.setState({ date: new Date() }),
            1000
        );
    }


    render() {
        const { UV, location, icon, temp, humidity, weather } = this.state;
        return (
            <div className={"dash-component-wrapper"}>
                <Clock />
                <div className="divider" style={{ marginBottom: "5px" }} />
                <CityWeather UV={UV} location={location} icon={icon} temp={temp} weatherr={weather} humidity={humidity} />
            </div>
        )
    }
}