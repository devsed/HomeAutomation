import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { getFunctions } from '../actions/FunctionActions';
import FunctionControl from '../FunctionControl';
import { getHomeFunctions } from '../actions/HomeFunctionActions';

var functionsAndStatuses = [];

class FunctionContent extends React.Component {

	componentDidMount() {
		this.props.setLaunch(this.getContent.bind(this));
	}

	getContent = (parentId) => {
		this.props.dispatch(getFunctions(parentId));
		this.props.dispatch(getHomeFunctions(this.props.home._id));
		console.log("getContent");
		this.findFunctionStatuses();
	}

	findFunctionStatuses = () => {
		functionsAndStatuses = this.props.functions.map((functio) => {
			return {
				...functio, state: ""
			}
		})

		let list = this.props.homeFunctions;
		for (let i = 0; i < functionsAndStatuses.length; i++) {
			for (let j = 0; j < list.length; j++) {
				if (functionsAndStatuses[i].functionid === list[j].name) {
					functionsAndStatuses[i].state = list[j].state;
				}
			}
		}
		return functionsAndStatuses;
	}

	render() {
		let items = this.props.functions.map((functio, idx, array) => {
			if (functionsAndStatuses[idx] !== undefined) console.log("state:" + functionsAndStatuses[idx].state)
			return (
				<span key={idx}>
					<Grid.Row>
						<Grid.Column><FunctionControl functio={functio} /></Grid.Column>
						{idx === array.length - 1 || idx % 2 === 0 ?
							<div></div> :
							<Grid.Column><FunctionControl functio={functio} /></Grid.Column>}
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
		functions: state.function.functionlist,
		home: state.home.home,
		homeFunctions: state.homeFunction.homefunctionlist
	}
}

export default connect(mapStateToProps)(FunctionContent);