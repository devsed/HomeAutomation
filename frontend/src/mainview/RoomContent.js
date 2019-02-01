import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import { getRooms } from '../actions/RoomActions';
import RoomPanel from './RoomPanel';
import DeviceContent from './DeviceContent';

class RoomContent extends React.Component {

	componentDidMount() {
		this.props.dispatch(getRooms(this.props.parentId));
	}

	render() {
		return (
			<Accordion.Accordion panels={
				this.props.rooms.map((room) => {
					return {
						key: room._id,
						title: { content: <RoomPanel room={room} /> },
						content: { content: <DeviceContent parentId={room._id} /> }
					}
				})
			}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		rooms: state.room.roomlist
	}
}

export default connect(mapStateToProps)(RoomContent);