import React from 'react';
import { Table, Form, Button, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addRoom, deleteRoom, modifyRoom } from './actions/RoomActions';

const roomOptions = [
    { text: 'Kitchen', value: 1 },
    { text: 'Livingroom', value: 2 },
    { text: 'Bedroom', value: 3 },
    { text: 'Bathroom', value: 4 }
];

function GetRoomText(id) {
    switch (id) {
        case 1:
            return 'Kitchen';
        case 2:
            return 'Livingroom';
        case 3:
            return 'Bedroom'
        case 4:
            return 'Bathroom';
        default:
            return 'Other room'
    }
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
    }

    componentDidMount() {
        if (this.props.isLogged) {
        }
    }

    delete = (event) => {
        let homeItem = this.props.home;
        this.props.dispatch(deleteRoom(event.target.name, homeItem._id))
    }

    showEditView = (event, data) => {
        this.setState({ editViewVisible: true });
        this.setState({ name: data.name });
        this.setState({ type: data.type });
        this.setState({ _id: data._id });
    }

    showAddView = () => {
        this.setState({ addViewVisible: true })
    }

    submit = (event) => {
        event.preventDefault();
        let homeItem = this.props.home;
        let item = {
            "type": this.state.type,
            "name": this.state.name,
            "parentid": homeItem._id
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
        let item = {
            "type": this.state.type,
            "name": this.state.name,
            "id": this.state._id,
            "parentid": homeItem._id
        }
        if (this.state.name.length === 0 || this.state.type < 1) {
            alert("Required fields missing")
            return;
        }
        this.props.dispatch(modifyRoom(item));
        this.setState({ addViewVisible: false })
        this.setState({ editViewVisible: false })
    }

    onChange = (event, data) => {
        let state = {}
        state[data === undefined ? event.target.name : data.name] =
            data === undefined ? event.target.value : data.value;
        this.setState(state)
    }

    render() {
        let items = [];
        let contentedit = false;

        items = this.props.roomlist.map((item) => {
            if (item._id !== 'room_999') { //Removed manage room button
                return <Table.Row key={item._id}>
                    <Table.Cell >{item.name}</Table.Cell>
                    {<Table.Cell >{GetRoomText(item.type)}</Table.Cell>}
                    <Table.Cell><Button icon='trash' onClick={this.delete} name={item._id} /></Table.Cell>
                    <Table.Cell><Button icon='edit' onClick={this.showEditView} type={item.type} name={item.name} _id={item._id} /></Table.Cell>
                </Table.Row>
            }
        })

        let addBlock =
            <Form onSubmit={this.state.addViewVisible ? this.submit: this.update}>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>{this.state.addViewVisible ? 'Add room': 'Edit room'}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
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
                        <Table.Cell></Table.Cell>
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
                    </Table.Row>
                </Table>
                <br />
            </Form>

        let addButton = <Button onClick={this.showAddView}>Add</Button>

        return (
            <div className="ui one column stackable center aligned page grid">
                <div className="column six wide">
                    <Table selectable>
                        <Table.Header>
                            <Table.Row>
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

export default connect(mapStateToProps)(ManageRoomsForm);