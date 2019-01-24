import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import HomeForm from './HomeForm';
import RoomList from './RoomList';
import ManageRoomsForm from './ManageRoomsForm'

export default class Main extends React.Component {

	homeExists = () => {
		return this.props.wasHomeCreated || this.props.homeExists;
	}

    render() {
        return (
			<Switch>
				<Route exact path="/" render={() =>
					this.props.isLogged ? (this.homeExists() ?
						(<Redirect to="/home/existing"/>) :
						(<Redirect to="/home/creating"/>)) : (<LoginForm />)
				}/>
				<Route path="/home/existing" render={() =>
					this.props.isLogged && this.homeExists() ?
						(<RoomList />) : (<Redirect to="/"/>)
				}/>
				<Route path="/home/creating" render={() =>
					this.props.isLogged && !this.homeExists() ?
						(<HomeForm />) : (<Redirect to="/"/>)
				}/>
				<Route path="/home/editing" render={() =>
					this.props.isLogged && this.homeExists() ?
						(<HomeForm />) : (<Redirect to="/"/>)
				}/>
				<Route path="/managerooms" render={() =>
					this.props.isLogged && this.homeExists() ?
						(<ManageRoomsForm />) : (<Redirect to="/"/>)
				}/>
			</Switch>
        )
	}
}