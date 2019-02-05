import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react';

class RoomPanel extends React.Component {

	manageDevices = (event) => {
		event.preventDefault();
		this.props.history.push("/managedevices", { roomId: event.target.name });
    }
	
	render() {
		let room = this.props.room;

		return (
			<span color="black">{room.name}<Button basic compact size="small" floated='right'
				icon onClick={this.manageDevices} name={room._id}>Manage<Icon name="plug" color="black" />
				</Button>
			</span>
		)
	}
}

export default withRouter(connect()(RoomPanel));