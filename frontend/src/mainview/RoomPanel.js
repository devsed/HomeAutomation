import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

export default class RoomPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			manageDevices: false
		}
	}

	manageDevices = (event) => {
		event.preventDefault();
        this.setState({ manageDevices: true });
    }
	
	render() {
		let room = this.props.room;

		if (this.state.manageDevices) {
            return <Redirect to='/managedevices' />
        }

		return (
			<span color="black">{room.name}<Button basic compact size="small" floated='right'
				icon onClick={this.manageDevices}>Manage<Icon name="plug" color="black" />
				</Button>
			</span>
		)
	}
}