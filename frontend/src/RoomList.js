import React from 'react';
import { connect } from 'react-redux';
import { getRooms } from './actions/RoomActions';
import { getHome } from './actions/HomeActions';
import { getDevices } from './actions/DeviceActions';
import { getFunctions } from './actions/FunctionActions';
import { Accordion, Icon } from 'semantic-ui-react'
import './RoomList.css';
import { Switch, Route, Redirect } from 'react-router-dom';


class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomActiveIndex: -1,
            deviceActiveIndex: -1,
            functionActiveIndex: -1,
            manageRooms: false
        }
    }

    componentDidMount() {
        if (this.props.isLogged) {
            let item = this.props.home;
            console.log("item?");
            if (item !== null) {
                console.log("item= "+item._id);
                this.props.dispatch(getRooms(item._id));
            }
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
            alert('Laitteen lisäys tähän')
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

    doNothing = () => { }

    render() {

        console.log("ManageRooms :"+this.state.manageRooms);
        if (this.state.manageRooms) {
            return <Redirect to='/managerooms' />
        }

        let roomActiveIndex = this.state.roomActiveIndex;
        let deviceActiveIndex = this.state.deviceActiveIndex;
        let functionActiveIndex = this.state.functionActiveIndex;

        //Function-paneli
        //
        //Lisätään Manage-rivi
        let objIndex = this.props.functionlist.findIndex((obj => obj._id === 'function_999'));
        if (objIndex < 0) {
            this.props.functionlist.push({ _id: "function_999", name: 'Add Function' })
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
            this.props.devicelist.push({ _id: "device_999", name: 'Add Device' })
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
            <Accordion.Accordion panels={
                this.props.roomlist.map((room) => {
                    roomListIdx = roomListIdx + 1;
                    roomIdList.push({ roomListIdx: roomListIdx, roomId: room._id });
                    return {
                        key: room._id,
                        title: room.name,   //title: (<div active='false'><Icon active='false' name='edit' />{room.name}</div>),
                        content: { content: devicePanels },
                        onTitleClick: this.getDev({ activeRoomId: room._id, roomIdList: roomIdList })
                    }
                })
            }
                activeIndex={roomActiveIndex} />

        //Home-paneli
        let homePanel = null;
        let item = this.props.home;
        if (item !== null) {
            homePanel = [
                {
                    key: item._id,
                    title: (<div active='false'><Icon name='' />{item.name}</div>),
                    content: { content: roomPanels },
                    onTitleClick: this.doNothing() //Home-paneeli , ei ikonia, ei reagoi, aina auki
                },]
        }

        return (
            item !== undefined ? (<div className="ui one column stackable center aligned page grid">
                <div className="column six wide">
                    <Accordion panels={homePanel} defaultActiveIndex={0} styled />
                </div>
            </div>)
                : (<div></div>)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.login.isLogged,
        roomlist: state.room.roomlist,
        home: state.home.home,
        devicelist: state.device.devicelist,
        functionlist: state.function.functionlist
    }
}

export default connect(mapStateToProps)(RoomList);