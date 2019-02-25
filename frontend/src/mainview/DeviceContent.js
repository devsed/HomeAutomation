import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import { getDevices } from '../actions/DeviceActions';
import FunctionContent from './FunctionContent';

class DeviceContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeIndex: -1
		}
	}

	componentDidMount() {
		this.props.setLaunch(this.getContent.bind(this));
	}

	getContent = (parentId) => {
		this.props.dispatch(getDevices(parentId));
		this.setState({ activeIndex: -1 });
		//console.log("getContent");
	}

	handleClick = (panelProps) => event => {
		//		console.log("OnClick activeIndex:" + this.state.activeIndex+ "index:"+panelProps.index)
		event.preventDefault();
		var index = panelProps.index;
		var parentId = panelProps.parentId;

		//console.log("OnClick undefinedA " + this.state.activeIndex)
		if (index !== undefined) {
			var activeIndex = this.state.activeIndex;
			var newIndex = activeIndex === index ? -1 : index;
			this.setState({ activeIndex: newIndex });
			console.log("OnClick undefinedB " + this.state.activeIndex + " " + newIndex + "parentId: " + parentId)
			this.launchChild(parentId);
		}
	}

	render() {
		var activeIndexNow = this.state.activeIndex;
		//console.log("Render" + this.state.activeIndex)

		return (
			<Accordion.Accordion panels={
				this.props.devices.map((device, idx) => {
					return {
						key: device._id,
						title: device.name,
						content: {
							content: <FunctionContent
								setLaunch={launch => this.launchChild = launch} />
						},
						onTitleClick: this.handleClick({ index: idx, parentId: device._id })
					}
				})
			} activeIndex={activeIndexNow} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		devices: state.device.devicelist
	}
}

export default connect(mapStateToProps)(DeviceContent);