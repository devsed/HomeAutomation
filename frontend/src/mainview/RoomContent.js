import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import { getRooms } from '../actions/RoomActions';
import RoomPanel from './RoomPanel';
import DeviceContent from './DeviceContent';
import { getDevices } from '../actions/DeviceActions';

class RoomContent extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
			activeIndex: -1
		}
	}

	componentDidMount() {
		this.props.dispatch(getRooms(this.props.parentId));
	}

	handleClick = (panelProp) => event => {
		var index = panelProp.index;

		if (index !== undefined) {
			var activeIndex  = this.state.activeIndex;
			var newIndex = activeIndex === index ? -1 : index;
			this.setState({ activeIndex: newIndex });
		}
		this.props.dispatch(getDevices(panelProp.activeRoomId));
	}

	render() {
		var activeIndexNow = this.state.activeIndex;

		return (
			<Accordion.Accordion panels={
				this.props.rooms.map((room, idx) => {
					return {
						key: room._id,
						title: { content: <RoomPanel room={room} /> },
						content: { content: <DeviceContent parentId={room._id} /> },
						onTitleClick: this.handleClick({ index: idx, activeRoomId:room._id })
					}
				})
			} activeIndex={activeIndexNow}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		rooms: state.room.roomlist
	}
}

export default connect(mapStateToProps)(RoomContent);