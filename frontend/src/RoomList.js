import React from 'react';
import { connect } from 'react-redux';
import { getRooms } from './actions/RoomActions';
import { getHomes } from './actions/HomeActions';
import { getDevices } from './actions/DeviceActions';
import { Accordion, AccordionContent, Button } from 'semantic-ui-react'

class RoomList extends React.Component {

    state = { roomActiveIndex: -1 }

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

    getDev = (roomProps) => event => {
        console.log(roomProps);
        var active = -1;
        var i = -1;
        if (this.state.roomActiveIndex > -1) {
            this.setState({ roomActiveIndex: -1 });
        } else {
            this.props.dispatch(getDevices(roomProps.activeRoomId));
            for (i = 0; i < roomProps.roomIdList.length; i++) {
                if (roomProps.activeRoomId === roomProps.roomIdList[i].roomId) {
                    active = i;
                }
            }
            this.setState({ roomActiveIndex: active });
        }
    }

    render() {

        let roomActiveIndex = this.state.roomActiveIndex;

        let devicepanels =
            <Accordion.Accordion panels={
                this.props.devicelist.map((device) => {
                    return {
                        key: device._id,
                        title: device.name
                    }
                })
            } />

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
                        content: { content: devicepanels },
                        onTitleClick: this.getDev({ activeRoomId: room._id, roomIdList: roomIdList })
                    }
                }) 
            } activeIndex={roomActiveIndex} />

        let homes = this.props.homelist.map((home) => {
            return {
                key: home._id,
                title: home.name,
                content: { content: roomPanels  }
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
        devicelist: state.device.devicelist
    }
}

export default connect(mapStateToProps)(RoomList);