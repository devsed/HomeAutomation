import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import HomeForm from './HomeForm';
import ManageRoomsForm from './ManageRoomsForm';
import ManageDevicesForm from './ManageDevicesForm';
import HomeContent from './mainview/HomeContent';

export default class Main extends React.Component {
	render() {
		var homeExists = this.props.wasHomeCreated || this.props.homeExists;

		return (
			<Switch>
				<Route exact path="/" render={() =>
					this.props.isLogged ? (homeExists ?
						(<Redirect to="/home/existing"/>) :
						(<Redirect to="/home/creating"/>)
					) : (<LoginForm />)
				}/>
				<Route path="/home/existing" render={() =>
					this.props.isLogged && homeExists ?
						(<HomeContent />) : (<Redirect to="/"/>)
				}/>
				<Route path="/home/creating" render={() =>
					this.props.isLogged && !homeExists ?
						(<HomeForm homeExists={homeExists} />) :
						(<Redirect to="/"/>)
				}/>
				<Route path="/home/editing" render={() =>
					this.props.isLogged && homeExists ?
						(<HomeForm homeExists={homeExists} />) :
						(<Redirect to="/"/>)
				}/>
				<Route path="/managerooms" render={() =>
					this.props.isLogged && homeExists ?
						(<ManageRoomsForm />) : (<Redirect to="/"/>)
				}/>
				<Route path="/managedevices" render={() =>
					this.props.isLogged && homeExists ?
						(<ManageDevicesForm />) : (<Redirect to="/"/>)
				}/>
			</Switch>
        )
	}
}