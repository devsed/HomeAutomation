import React from 'react';
import { connect } from 'react-redux';
import { getRooms } from './actions/RoomActions';
import { getHomes } from './actions/HomeActions';
import { getDevices } from './actions/DeviceActions';
import { getFunctions } from './actions/FunctionActions';
import { Accordion } from 'semantic-ui-react'
import './RoomList.css';

class RoomList extends React.Component {

    state = {
        roomActiveIndex: -1,
        deviceActiveIndex: -1,
        functionActiveIndex: -1
    }

    componentDidMount() {
        if (this.props.isLogged) {
            console.log("apu-ComponentDidMount");
            this.props.dispatch(getHomes());
            this.props.dispatch(getRooms());
            //            this.props.dispatch(getDevices());
        }
    }

    /*    remove = (event) => {
            this.props.dispatch(removeFromList(event.target.name));
        }*/
    doFunc = (functionProps) => event => {
        console.log("Function " + functionProps.activeFunctionId);
        var old_activeIndex = this.state.functionActiveIndex;
        var active = -1;
        var i = -1;
        if (functionProps.activeFunctionId === '999') {
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
        console.log("Device " + deviceProps.activeDeviceId);
        var old_activeIndex = this.state.deviceActiveIndex;
        var active = -1;
        var i = -1;
        if (deviceProps.activeDeviceId === '999') {
            alert('Laitten lisäys tähän')
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
        console.log("Room " + roomProps.activeRoomId);
        var old_activeIndex = this.state.roomActiveIndex;
        var active = -1;
        var i = -1;
        if (roomProps.activeRoomId === '999') {
            alert('Huoneen lisäys tähän')
        } else {
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
                this.setState({ deviceActiveIndex: -1 });
                this.setState({ roomActiveIndex: active });
            }
        }
    }

    render() {

        let roomActiveIndex = this.state.roomActiveIndex;
        let deviceActiveIndex = this.state.deviceActiveIndex;
        let functionActiveIndex = this.state.functionActiveIndex;

        //Function-paneli
        //
        //Lisätään Add-rivi
        let objIndex = this.props.functionlist.findIndex((obj => obj._id === '999'));
        if (objIndex < 0) {
            this.props.functionlist.push({ _id: "999", name: 'Add Function' })
        }
        //Lisätään Add-rivi
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
        //Lisätään Add-rivi
        objIndex = this.props.devicelist.findIndex((obj => obj._id === '999'));
        if (objIndex < 0) {
            this.props.devicelist.push({ _id: "999", name: 'Add Device' })
        }
        //Lisätään Add-rivi
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
        //Lisätään Add-rivi
        objIndex = this.props.roomlist.findIndex((obj => obj._id === '999'));
        if (objIndex < 0) {
            this.props.roomlist.push({ _id: "999", name: 'Add Room' })
        }
        //Lisätään Add-rivi
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

        //Home-paneli
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
    console.log("apu-mapStateToProps");
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