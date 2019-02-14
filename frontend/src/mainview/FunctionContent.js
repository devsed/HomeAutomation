import React from 'react';
import { connect } from 'react-redux';
import { Grid, Icon } from 'semantic-ui-react';
import { getFunctions } from '../actions/FunctionActions';

class FunctionContent extends React.Component {

	componentDidMount() {
		this.props.setLaunch(this.getContent.bind(this));
	}

	getContent = (parentId) => {
		this.props.dispatch(getFunctions(parentId));
	}

	render() {
		let items = this.props.functions.map((functio, idx, array) => {
			return (
				<span>
					<Grid.Row>
						<Grid.Column>{functio.name}<Icon /></Grid.Column>
						{idx === array.length - 1 || idx % 2 === 0 ? 
						<div></div>:
						<Grid.Column>{functio.name}<Icon /></Grid.Column>}
					</Grid.Row>
				</span>
			)
		})

		return (
			<Grid columns='2'>{items}</Grid>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		functions: state.function.functionlist
	}
}

export default connect(mapStateToProps)(FunctionContent);