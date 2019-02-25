import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';

class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar />
				<br />
				<Main isLogged={this.props.isLogged}
					homeExists={this.props.homeExists}
					wasHomeCreated={this.props.wasHomeCreated} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged: state.login.isLogged,
		homeExists: state.login.homeExists,
		wasHomeCreated: state.home.wasHomeCreated
	}
}

export default withRouter(connect(mapStateToProps)(App));