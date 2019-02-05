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
		this.props.dispatch(getDevices(this.props.parentId));
	}

	handleClick = (panelProp) => event => {
		var index = panelProp.index;

		if (index !== undefined) {
			var activeIndex  = this.state.activeIndex;
			var newIndex = activeIndex === index ? -1 : index;
			this.setState({ activeIndex: newIndex });
		}
	}

	render() {
		var activeIndexNow = this.state.activeIndex;

		return (
			<Accordion.Accordion panels={
				this.props.devices.map((device, idx) => {
					return {
						key: device._id,
						title: device.name,
						content: { content: <FunctionContent parentId={device._id} /> },
						onTitleClick: this.handleClick({ index: idx })
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