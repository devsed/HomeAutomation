import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import HomeForm from './HomeForm';
import HomeAccordion from './HomeAccordion';
import RoomList from './RoomList';

export default class Main extends React.Component {

	homeExists = () => {
		return this.props.home !== null ? true : false;
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
                    this.props.isLogged ? (<RoomList />) : (<Redirect to="/"/>)
                }/>
				<Route path="/home/creating" render={() =>
					this.props.isLogged ? (<HomeForm />) : (<Redirect to="/"/>)
                }/>
           </Switch>
        )
	}
}