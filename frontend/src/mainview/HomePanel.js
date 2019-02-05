import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { ButtonGroup, Button, Icon } from 'semantic-ui-react';
import RoomContent from './RoomContent';

class HomePanel extends React.Component {

    editHome = (event) => {
		event.preventDefault();
		this.props.history.push("/home/editing");
	}
	
    manageRooms = (event) => {
		event.preventDefault();
		this.props.history.push("/managerooms");
    }
	
	render() {
		let home = this.props.home;
		
		return (
			<span>{home.name}
				<ButtonGroup floated='right'>
					<Button compact icon
						onClick={this.editHome}>Edit <Icon name="home" />
					</Button>
					<Button compact icon
						onClick={this.manageRooms}>Manage <Icon name="home" />
					</Button>
				</ButtonGroup>
				<RoomContent parentId={home._id} />
			</span>
		)
	}
}

export default withRouter(connect()(HomePanel));