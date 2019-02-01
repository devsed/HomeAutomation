import React from 'react';
import { Redirect } from 'react-router-dom';
import { ButtonGroup, Button, Icon } from 'semantic-ui-react';
import RoomContent from './RoomContent';

export default class HomePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editHome: false,
			manageRooms: false
		}
	}

    editHome = (event) => {
		event.preventDefault();
        this.setState({ editHome: true });
	}
	
    manageRooms = (event) => {
		event.preventDefault();
		this.setState({ manageRooms: true });
    }
	
	render() {
        if (this.state.editHome) {
            return <Redirect to='/home/editing' />
		}

		if (this.state.manageRooms) {
			return <Redirect to='/managerooms' />
        }

		let home = this.props.home;
		return (
			<span>{home.name}<ButtonGroup floated='right'>
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