import React from 'react';
import { connect } from 'react-redux';
import { getRooms } from './actions/RoomActions';
import { getHomes } from './actions/HomeActions';
import { getDevices } from './actions/DeviceActions';
import { getFunctions } from './actions/FunctionActions';
import { Accordion } from 'semantic-ui-react'

class RoomList extends React.Component {

    state = { roomActiveIndex: -1, deviceActiveIndex: -1 }

    componentDidMount() {
        if (this.props.isLogged) {
            this.props.dispatch(getHomes());
            this.props.dispatch(getRooms());
            //            this.props.dispatch(getDevices());
        }
    }

    /*    remove = (event) => {
            this.props.dispatch(removeFromList(event.target.name));
        }*/
    getFunc = (deviceProps) => event => {
        console.log("Device " + deviceProps.activeDeviceId);
        var old_activeIndex = this.state.deviceActiveIndex;
        var active = -1;
        var i = -1;
        if (this.state.deviceActiveIndex > -1) {
            this.setState({ deviceActiveIndex: -1 });
        }
        this.props.dispatch(getFunctions(deviceProps.activeDeviceId));
        for (i = 0; i < deviceProps.deviceIdList.length; i++) {
            if (deviceProps.activeDeviceId === deviceProps.deviceIdList[i].deviceId) {
                active = i;
            }
        }
        if (old_activeIndex !== active) {
            this.setState({ deviceActiveIndex: active });
        }
    }

    getDev = (roomProps) => event => {
        console.log("Room " + roomProps.activeRoomId);
        var old_activeIndex = this.state.roomActiveIndex;
        var active = -1;
        var i = -1;
        if (this.state.roomActiveIndex > -1) {
            this.setState({ roomActiveIndex: -1 });
        }
        this.props.dispatch(getDevices(roomProps.activeRoomId));
        for (i = 0; i < roomProps.roomIdList.length; i++) {
            if (roomProps.activeRoomId === roomProps.roomIdList[i].roomId) {
                active = i;
            }
        }
        if (old_activeIndex !== active) {
            this.setState({ deviceActiveIndex:-1});
            this.setState({ roomActiveIndex: active });
        }
    }

    render() {

        let roomActiveIndex = this.state.roomActiveIndex;
        let deviceActiveIndex = this.state.deviceActiveIndex;

        let functionPanels =
            <Accordion.Accordion panels={
                this.props.functionlist.map((functio) => {
                    return {
                        key: functio._id,
                        title: functio.name
                    }
                })
            } />

        let deviceListIdx = -1;
        let deviceIdList = [];
        let devicePanels =
            <Accordion.Accordion panels={
                this.props.devicelist.map((device) => {
                    deviceListIdx = deviceListIdx + 1;
                    deviceIdList.push({ deviceListIdx: deviceListIdx, deviceId: device._id });
                    return {
                        key: device._id,
                        title: device.name,
                        content: { content: functionPanels },
                        onTitleClick: this.getFunc({ activeDeviceId: device._id, deviceIdList: deviceIdList })
                    }
                })
            } activeIndex={deviceActiveIndex} />

        let roomListIdx = -1;
        let roomIdList = [];
        let roomPanels =
            <Accordion.Accordion panels={
                this.props.roomlist.map((room) => {
                    roomListIdx = roomListIdx + 1;
                    roomIdList.push({ roomListIdx: roomListIdx, roomId: room._id });
                    return {
                        key: room._id,
                        title: room.name,
                        content: { content: devicePanels },
                        onTitleClick: this.getDev({ activeRoomId: room._id, roomIdList: roomIdList })
                    }
                })
            } activeIndex={roomActiveIndex} />

        let homes = this.props.homelist.map((home) => {
            return {
                key: home._id,
                title: home.name,
                content: { content: roomPanels }
            }
        })

        return (
            <div className="ui one column stackable center aligned page grid">
                <div className="column six wide">
                    <Accordion panels={homes} defaultActiveIndex={-1} styled />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.login.username,
        isLogged: state.login.isLogged,
        roomlist: state.room.roomlist,
        homelist: state.home.homelist,
        devicelist: state.device.devicelist,
        functionlist: state.function.functionlist
    }
}

export default connect(mapStateToProps)(RoomList);