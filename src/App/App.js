import React, { Component } from 'react';
import TopNav from './TopNav';
import Routes from './Routes';

export default function App() {
    return (
        <div>
			<TopNav />
			<main className="container">
				<Routes />
			</main>
		</div>
	);
}