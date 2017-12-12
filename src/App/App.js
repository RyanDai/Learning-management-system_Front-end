import React, { Component } from 'react';
import TopNav from './TopNav';
import Routes from './Routes';
import Footer from './Footer';

class App extends Component {
	render() {
		return (
			<div>
				<TopNav />
				<main className="container">
					<Routes />
				</main>
				<Footer />
			</div>
		);
	}
}

export default App;
