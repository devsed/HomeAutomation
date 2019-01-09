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
				<Main isLogged={this.props.isLogged} home={this.props.home} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged: state.login.isLogged,
		home: state.home.home
	}
}

export default withRouter(connect(mapStateToProps)(App));