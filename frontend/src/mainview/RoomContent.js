import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import { getRooms } from '../actions/RoomActions';
import RoomPanel from './RoomPanel';
import DeviceContent from './DeviceContent';

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

	handleClick = (panelProps) => event => {
		event.preventDefault();
		var index = panelProps.index;
		var parentId = panelProps.parentId;

		if (index !== undefined) {
			this.launchChild(parentId);
			var activeIndex  = this.state.activeIndex;
			var newIndex = activeIndex === index ? -1 : index;
			this.setState({ activeIndex: newIndex });
		}
	}

	render() {
		var activeIndexNow = this.state.activeIndex;

		return (
			<Accordion.Accordion panels={
				this.props.rooms.map((room, idx) => {
					return {
						key: room._id,
						title: { content: <RoomPanel room={room} /> },
						content: { content: <DeviceContent 
							setLaunch={launch => this.launchChild = launch} /> },
						onTitleClick: this.handleClick({ index: idx, parentId: room._id })
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