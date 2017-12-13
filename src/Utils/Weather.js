import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

export default function CityCondition({ location, icon, temp, humidity, UV }) {
    let weather = "CLEAR_DAY";
    let color = "#ffad32";
    switch (icon) {
        case "http://icons.wxug.com/i/c/k/nt_clear.gif":
            weather = "CLEAR_NIGHT";
            color = "#3841f4";
            break;
        case "http://icons.wxug.com/i/c/k/cloudy.gif":
            weather = "CLOUDY";
            color = "#f2ff3f";
            break;
        case "http://icons.wxug.com/i/c/k/nt_cloudy.gif":
            weather = "PARTLY_CLOUDY_NIGHT";
            color = "#3841f4";
            break;
        case "http://icons.wxug.com/i/c/k/rain.gif":
            weather = "RAIN";
            color = "#21ecff";
            break;
        case "http://icons.wxug.com/i/c/k/fog.gif":
            weather = "FOG";
            color = "#21ecff";
            break;
        case "http://icons.wxug.com/i/c/k/partlycloudy.gif":
            weather = "PARTLY_CLOUDY_DAY";
            color = "#f2ff3f";
            break;
        case "http://icons.wxug.com/i/c/k/nt_partlycloudy.gif":
            weather = "PARTLY_CLOUDY_NIGHT";
            color = "#3841f4";
            break;
        default:
            weather = "CLEAR_DAY";
            color = "#ffad32";
    }

    return (
        <div>
            <div id="weather" style={{ float: "right" }}>
                <ReactAnimatedWeather
                    icon={weather}
                    color={color}
                    size={100}
                    animate={true}
                />
            </div>
            <div id="location">
                <span><i className="fa fa-map-marker" aria-hidden="true" /></span>
                <span>{location}</span>
            </div>

            <div id="temperature">
                <span><i className="fa fa-thermometer-empty" aria-hidden="true" /></span>
                <span>{temp}</span>
            </div>
            <div id="humidity">
                <span><i className="fa fa-tint" aria-hidden="true" /></span>
                <span>{humidity}</span>
            </div>
            <div id="uv">
                <span><i className="fa fa-sun-o" aria-hidden="true" /></span>
                <span>{UV}</span>
            </div>
        </div>
    )
}