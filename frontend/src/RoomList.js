import React from 'react';
import { connect } from 'react-redux';
import { getRooms } from './actions/RoomActions';
import { getHomes } from './actions/HomeActions';
import { getDevices } from './actions/DeviceActions';
import { Accordion, AccordionContent } from 'semantic-ui-react'

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

    getDev = (roomId) => event => {
        console.log(roomId);
        if (this.state.roomActiveIndex > -1) {
            this.setState({ roomActiveIndex: -1 });
        } else {
            this.props.dispatch(getDevices(roomId));
            //***** Tässä on ongelmakohta, en saa listan indexiä talteen */
            // this.setState({roomActiveIndex:this.index});
            this.setState({ roomActiveIndex: 3 });
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

        let roompanels =
            <Accordion.Accordion panels={
                this.props.roomlist.map((room) => {
                    return {
                        key: room._id,
                        title: room.name,
                        content: { content: devicepanels },
                        onTitleClick: this.getDev(room._id)
                    }
                })
            } activeIndex={roomActiveIndex} />

        let homes = this.props.homelist.map((home) => {
            return {
                key: home._id,
                title: home.name,
                content: { content: roompanels }
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
        isLogged: state.login.isLogged,
        roomlist: state.room.roomlist,
        homelist: state.home.homelist,
        devicelist: state.device.devicelist
    }
}

export default connect(mapStateToProps)(RoomList);