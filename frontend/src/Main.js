import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
//import { connect } from 'react-redux';
import RoomAccordionExample from './RoomAccordionExample';

export default class Main extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() =>
                    this.props.isLogged ?
                        (<Redirect to="/list" />) :
                        (<LoginForm />)
                } />
                <Route path="/list" render={() =>
                    this.props.isLogged ?
                        (<RoomAccordionExample />) :
                        (<Redirect to="/" />)
                } />

            </Switch>
        )
    }
}
