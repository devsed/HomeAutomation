import React from 'react';
import { connect } from 'react-redux';
import { changeActiveRoomId } from './actions/RoomActions';
import { getHome } from './actions/HomeActions';
import { getDevices } from './actions/DeviceActions';
import { getFunctions } from './actions/FunctionActions';
import { Accordion, Button } from 'semantic-ui-react'
import './RoomList.css';
import { Switch, Route, Redirect } from 'react-router-dom';

class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomActiveIndex: -1,
            deviceActiveIndex: -1,
            functionActiveIndex: -1,
            manageRooms: false,
            editHome: false,
            activeRoomId: "",
            manageDevices: false
        }
    }

    doFunc = (functionProps) => event => {
        var old_activeIndex = this.state.functionActiveIndex;
        var active = -1;
        var i = -1;
        if (functionProps.activeFunctionId === 'function_999') {
            alert('Toiminnon lisäys tähän')
        } else {
            if (this.state.functionActiveIndex > -1) {
                this.setState({ functionActiveIndex: -1 });
            }
            //this.props.dispatch(getFunctions(deviceProps.activeDeviceId));
            for (i = 0; i < functionProps.functionIdList.length; i++) {
                if (functionProps.activeFunctionId === functionProps.functionIdList[i].functionId) {
                    active = i;
                }
            }
            if (old_activeIndex !== active) {
                this.setState({ functionActiveIndex: active });
            }
        }
    }

    getFunc = (deviceProps) => event => {
        var old_activeIndex = this.state.deviceActiveIndex;
        var active = -1;
        var i = -1;
        if (deviceProps.activeDeviceId === 'device_999') {
            this.setState({ manageDevices: true })
        } else {
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
    }

    getDev = (roomProps) => event => {
        var old_activeIndex = this.state.roomActiveIndex;
        var active = -1;
        var i = -1;
        if (roomProps.activeRoomId === 'room_999') {
            //Muoneenhallinnan avaus
            this.setState({ manageRooms: true })
        } else {
            if (this.state.roomActiveIndex > -1) {
                this.setState({ roomActiveIndex: -1 });
            }
            this.setState({activeRoomId: roomProps.activeRoomId});
            this.props.dispatch(getDevices(roomProps.activeRoomId));
            for (i = 0; i < roomProps.roomIdList.length; i++) {
                if (roomProps.activeRoomId === roomProps.roomIdList[i].roomId) {
                    active = i;
                }
            }
            if (old_activeIndex !== active) {
                this.setState({ deviceActiveIndex: -1 });
                this.setState({ roomActiveIndex: active });
            }
        }
    }

    editHome = (event) => {
        this.setState({ editHome: true });
    }

    render() {
        if (this.state.editHome) {
            return <Redirect to='/home/editing' />
        }

        if (this.state.manageRooms) {
            this.setState({ manageRooms: false });
            return <Redirect to='/managerooms' />
        }

        if (this.state.manageDevices) {
            this.setState({ manageDevices: false });
            this.props.dispatch(changeActiveRoomId(this.state.activeRoomId));
            return <Redirect to='/managedevices' />
        }

        let roomActiveIndex = this.state.roomActiveIndex;
        let deviceActiveIndex = this.state.deviceActiveIndex;
        let functionActiveIndex = this.state.functionActiveIndex;

        //Function-paneli
        //
        //Lisätään Manage-rivi
        let objIndex = this.props.functionlist.findIndex((obj => obj._id === 'function_999'));
        if (objIndex < 0) {
            this.props.functionlist.push({ _id: "function_999", name: 'Manage Functions' })
        }
        let functionListIdx = -1;
        let functionIdList = [];
        let functionPanels =
            <Accordion.Accordion panels={
                this.props.functionlist.map((functio) => {
                    functionListIdx = functionListIdx + 1;
                    functionIdList.push({ functionListIdx: functionListIdx, functionId: functio._id });
                    return {
                        key: functio._id,
                        title: functio.name,
                        onTitleClick: this.doFunc({ activeFunctionId: functio._id, functionIdList: functionIdList })
                    }
                })
            } activeIndex={functionActiveIndex} />

        //Device-paneli
        //
        //Lisätään Manage-rivi
        objIndex = this.props.devicelist.findIndex((obj => obj._id === 'device_999'));
        if (objIndex < 0) {
            this.props.devicelist.push({ _id: "device_999", name: 'Manage Devices' })
        }
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

        //Room-paneli
        //
        //Lisätään Manage-rivi
        objIndex = this.props.roomlist.findIndex((obj => obj._id === 'room_999'));
        if (objIndex < 0) {
            this.props.roomlist.push({ _id: "room_999", name: 'Manage Rooms' })
        }
        let roomListIdx = -1;
        let roomIdList = [];
        let roomPanels =
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

        //Home content
        const HomeContent = (item) => (
            <div>
                {item.name}<Button compact active floated='right' icon='edit' onClick={this.editHome} />
                <Accordion.Accordion panels={roomPanels} activeIndex={roomActiveIndex} />
            </div>
        )

        let rootPanel = null;
        let item = this.props.home;
        if (item !== null) {
            rootPanel = [{
                key: item._id,
                content: { content: HomeContent(item) }
            },]
        }

        return (
            item !== undefined ?
                (<div className="ui one column stackable center aligned page grid">
                    <div className="column six wide">
                        <Accordion panels={rootPanel} styled />
                    </div>
                </div>)
                : null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roomlist: state.room.roomlist,
        home: state.home.home,
        devicelist: state.device.devicelist,
        functionlist: state.function.functionlist
    }
}

export default connect(mapStateToProps)(RoomList);