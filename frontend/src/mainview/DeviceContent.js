import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import { getDevices } from '../actions/DeviceActions';
import FunctionContent from './FunctionContent';

class DeviceContent extends React.Component {

	componentDidMount() {
		this.props.dispatch(getDevices(this.props.parentId));
	}

	render() {
		return (
			<Accordion.Accordion panels={
				this.props.devices.map((device) => {
					return {
						key: device._id,
						title: device.name,
						content: { content: <FunctionContent parentId={device._id} />} 
					}
				})
			} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		devices: state.device.devicelist
	}
}

export default connect(mapStateToProps)(DeviceContent);