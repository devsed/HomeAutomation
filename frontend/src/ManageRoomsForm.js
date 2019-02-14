import React from 'react';
import { Table, Form, Button, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addRoom, deleteRoom, modifyRoom } from './actions/RoomActions';
import { withRouter } from "react-router-dom";

const roomOptions = [
    { text: 'Kitchen', value: 1 },
    { text: 'Livingroom', value: 2 },
    { text: 'Bedroom', value: 3 },
    { text: 'Bathroom', value: 4 },
    { text: 'Workroom', value: 5 },
    { text: 'Laundry room', value: 6 }
];

function getRoomName(type) {
    let text = null;
    roomOptions.some(function (option) {
        text = option.text;
        return type === option.value ? option.text : null;
    });
    return text;
}

class ManageRoomsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: 0,
            parentid: "",
            addViewVisible: false,
            editViewVisible: false,
        }
        this.currentHomeName = this.props.location.state.homeName;
    }

    componentDidMount() {
        if (this.props.isLogged) {

        }
    }

    delete_check = (item) => {
        if (!this.state.editViewVisible) {
            if (window.confirm('Are you shure?')) this.delete(item);
        } else {
            alert("Cancel Edit first");
        }
    }

    delete = (item) => {
        let homeItem = this.props.home;
        let homeId = "";
        // Edit home changes index property name
        if (homeItem.hasOwnProperty('_id')) {
            homeId = homeItem._id;
        }
        else homeId = homeItem.id;

        //Home-id because roomlist update needs it
        this.props.dispatch(deleteRoom(item._id, homeId))
    }

    showEditView = (event, data) => {
        if (this.state.addViewVisible) {
            alert("Cancel Add first");
            return;
        }
        this.setState({
            editViewVisible: true,
            name: data.name,
            type: data.type,
            _id: data._id
        });
    }

    showAddView = () => {
        this.setState({
            addViewVisible: true,
            name: "", type: ""
        })
    }

    submit = (event) => {
        event.preventDefault();
        let homeItem = this.props.home;
        let parentid = "";
        // Edit home changes index property name
        if (homeItem.hasOwnProperty('_id')) {
            parentid = homeItem._id;
        }
        else parentid = homeItem.id;
        let item = {
            "type": this.state.type,
            "name": this.state.name,
            "parentid": parentid
        }
        if (this.state.name.length === 0 || this.state.type < 1) {
            alert("Required fields missing")
            return;
        }
        this.props.dispatch(addRoom(item));
        this.setState({ addViewVisible: false })
    }

    update = (event, data) => {
        event.preventDefault();
        let homeItem = this.props.home;
        let parentid = "";
        // Edit home changes index property name
        if (homeItem.hasOwnProperty('_id')) {
            parentid = homeItem._id;
        }
        else parentid = homeItem.id;

        let item = {
            "type": this.state.type,
            "name": this.state.name,
            "id": this.state._id,
            "parentid": parentid
        }
        if (this.state.name.length === 0 || this.state.type < 1) {
            alert("Required fields missing")
            return;
        }
        this.props.dispatch(modifyRoom(item, item.id));
        this.setState({
            addViewVisible: false,
            editViewVisible: false
        })
    }

    onChange = (event, data) => {
        let state = {}
        state[data === undefined ? event.target.name : data.name] =
            data === undefined ? event.target.value : data.value;
        this.setState(state)
    }

    cancel = () => {
        this.setState({
            addViewVisible: false,
            editViewVisible: false
        });
    }

    render() {
        let items = [];

        items = this.props.roomlist.map((item) => {
            return <Table.Row key={item._id}>
                <Table.Cell >{item.name}</Table.Cell>
                <Table.Cell ><aside>{getRoomName(item.type)}</aside></Table.Cell>
                <Table.Cell><Button
                    icon='trash'
                    onClick={() => {
                        this.delete_check(item)
                    }}
                    name={item._id} />
                </Table.Cell>
                <Table.Cell><Button
                    icon='edit'
                    onClick={this.showEditView}
                    type={item.type}
                    name={item.name}
                    _id={item._id} />
                </Table.Cell>
            </Table.Row>
        })

        let addBlock =
            <Form onSubmit={this.state.addViewVisible ? this.submit : this.update}>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                colSpan='3'>{this.state.addViewVisible ? 'Add room' : 'Edit room'}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Form.Field required>
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                        name="name"
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        placeholder="Give name for room" />
                                </Form.Field>
                            </Table.Cell>
                            <Table.Cell />
                            <Table.Cell />
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Form.Field
                                    control={Select}
                                    options={roomOptions}
                                    name="type"
                                    label={{
                                        children: "Type",
                                        htmlFor: "type"
                                    }}
                                    placeholder="Select room type"
                                    onChange={this.onChange}
                                    required
                                    value={this.state.type}>
                                </Form.Field>
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <label>&nbsp;</label>
                                    <Button icon='save' type="submit"></Button>
                                </Form.Field>
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <label>&nbsp;</label>
                                    <Button icon='undo' type="" onClick={this.cancel}></Button>
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <br />
            </Form>

        let addButton = <Button onClick={this.showAddView} icon='plus' />

        return (
            <div className="ui one column stackable center aligned page grid">
                <div className="column six wide">
                    <h3>Manage<strong style={{ color: 'grey' }}>{' ' + this.currentHomeName + ' '}</strong> rooms</h3>
                    <Table selectable>
                        <Table.Header>
                            <Table.Row >
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items}
                        </Table.Body>
                    </Table>
                    {/* Add- or edit-button pressed or not */}
                    {(this.state.addViewVisible || this.state.editViewVisible) ? (addBlock) : <div />}
                    {!(this.state.addViewVisible || this.state.editViewVisible) ? (addButton) : <div />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.login.isLogged,
        roomlist: state.room.roomlist,
        home: state.home.home
    }
}

export default withRouter(connect(mapStateToProps)(ManageRoomsForm));