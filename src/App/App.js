import React, { Component } from 'react';
import TopNav from './TopNav';
import Routes from './Routes';

class App extends Component {
	render() {
		return (
			<div>
				<TopNav />
				<main className="container">
					<Routes />
				</main>
			</div>
		);
	}
}

export default App;
