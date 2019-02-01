import React from 'react';
import { connect } from 'react-redux';
import { Grid, Icon } from 'semantic-ui-react';
import { getFunctions } from '../actions/FunctionActions';

class FunctionContent extends React.Component {

	componentDidMount() {
		this.props.dispatch(getFunctions(this.props.parentId));
	}

	render() {
		let items =	this.props.functions.map((functio, idx, array) => {
			return (
				idx % 2 === 0 && <Grid.Row>
				<Grid.Column>{functio.name}<Icon /></Grid.Column>
				{idx === array.length - 1 || idx % 2 !== 0} </Grid.Row>
			)
		})

		return (
			<Grid columns='equal'> {items} </Grid>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		functions: state.function.functionlist
	}
}

export default connect(mapStateToProps)(FunctionContent);