import './HomeContent.css';
import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import HomePanel from './HomePanel';

class HomeContent extends React.Component {
	
	render() {
		let home = this.props.home;
		let homeLoaded = home !== undefined && home !== null;
		let homePanel = [];

		homeLoaded && (
			homePanel = [{
				key: home._id,
				content: { content: <HomePanel home={home} /> }
			},]
		)

		return (
			homeLoaded ? (
				<div className="ui one column stackable center aligned page grid" >
					<div className="column seven wide left aligned">
						<Accordion defaultActiveIndex={0} panels={homePanel} styled />
					</div>
				</div>
			) : null
		)
	}
}

const mapStateToProps = (state) => {
	return {
		home: state.home.home
	}
}

export default connect(mapStateToProps)(HomeContent);