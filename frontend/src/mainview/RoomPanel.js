import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react';

class RoomPanel extends React.Component {

	manageDevices = (event, data) => {
		this.props.history.push("/managedevices", { roomId: data.value, roomName: data.name});
    }
	
	render() {
		let room = this.props.room;

		return (
			<span>{room.name}<Button compact size='small' floated='right' icon='plug'
				onClick={this.manageDevices} value={room._id} name={room.name}></Button>
			</span>
		)
	}
}

export default withRouter(connect()(RoomPanel));