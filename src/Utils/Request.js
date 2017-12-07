import React from 'react';
import Axios from 'axios';
import {Auth} from "./Auth";

export default function Request(Type, API, Content) {
    const config = {
        headers: {'Authorization': "bearer " + Auth.getToken()}
    };
    switch (Type) {
        case "GET":
            return Axios.get(API, config);
        case "POST":
            return Axios.post(API, Content, config);
        case "PUT":
            return Axios.put(API, Content, config);
        case "DELETE":
            return Axios.delete(API, config);
        default:
            console.log("Error request type!");
    }
}