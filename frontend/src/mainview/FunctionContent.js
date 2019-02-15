import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { getFunctions } from '../actions/FunctionActions';
import FunctionControl from '../FunctionControl';

class FunctionContent extends React.Component {

	componentDidMount() {
		this.props.setLaunch(this.getContent.bind(this));
		this.props.dispatch(getFunctions(this.props.parentId));
	}

	getContent = (parentId) => {
		this.props.dispatch(getFunctions(parentId));
	}

	render() {
		let items = this.props.functions.map((functio, idx, array) => {
			return (
				<span key={idx}>
					<Grid.Row>
						<Grid.Column><FunctionControl props={functio}/></Grid.Column>
						{idx === array.length - 1 || idx % 2 === 0 ? 
						<div></div>:
						<Grid.Column><FunctionControl props={functio}/></Grid.Column>}
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