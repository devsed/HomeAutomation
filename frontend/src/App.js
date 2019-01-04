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
				<NavBar isLogged={this.props.isLogged} />
				<br />
				<Main isLogged={this.props.isLogged} currentUserId={this.props.currentUserId} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged: state.login.isLogged,
		currentUserId: state.login.currentUserId
	}
}

export default withRouter(connect(mapStateToProps)(App));