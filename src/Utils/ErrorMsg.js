import React from 'react';


export default function ErrorMsg({error}) {
    return (
        <div>
            <p>StatusCode: {error.response.status}</p>
            <p>StatusText: {error.response.statusText}</p>
            <p>{error.response.data.substring(0, 100)}</p>
        </div>
    )
}