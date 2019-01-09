import React from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
//import { getHome } from './actions/HomeActions';

export class HomeAccordion extends React.Component {

/*	componentDidMount() {
		this.props.dispatch(getHome(this.props.homeId));
	}
*/
	render() {
		let item = this.props.home;

        return (
			item !== null ? (
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Type</Table.HeaderCell>
							<Table.HeaderCell>Service username</Table.HeaderCell>
							<Table.HeaderCell>Service password</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row key={item._id}>
							<Table.Cell>{item.name}</Table.Cell>
							<Table.Cell>{item.type}</Table.Cell>
							<Table.Cell>{item.proxySettings.username}</Table.Cell>
							<Table.Cell>{item.proxySettings.password}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			) : (<Table></Table>)
		);
	}
}

const mapStateToProps = (state) => {
	return {
		home: state.home.home
		// homeId: state.login.homeId
	}
}

export default connect(mapStateToProps)(HomeAccordion);