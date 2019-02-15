import React from 'react';
import { Table, Form, Button, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getDevices, addDevice, deleteDevice, modifyDevice } from './actions/DeviceActions';

const deviceOptions = [
    { text: 'Switch', value: 1 },
    { text: 'Dimmer', value: 2 },
    { text: 'Heating', value: 3 },
    { text: 'Camera', value: 4 }
];

function getDeviceName(type) {
    let text = null;
    deviceOptions.some(function (option) {
        text = option.text;
        return type === option.value && option.text;
    });
    return text;
}

class ManageDevicesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: 0,
            parentid: "",
            addViewVisible: false,
            editViewVisible: false,
            functionRows: false,
            functionId: "",
            functionId2: ""
        }
        this.currentRoomId = this.props.location.state.roomId;
        this.currentRoomName = this.props.location.state.roomName;
    }

    componentDidMount = () => {
        this.props.dispatch(getDevices(this.currentRoomId));
    }

    getItemsSyncronous = (parent_id, itemType) => {
        let getObject = {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }

        const request = async () => {
            const response = await fetch("/api/" + itemType + "/" + parent_id, getObject);
            let json = await response.json();
            console.log(json);
            let functionIds = [];
            if (json.length > 0) {
                json.map((item, idx) => {
                    return functionIds[idx] = item.functionid;
                })
            }
            this.setState({
                functionId: functionIds[0],
                functionId2: functionIds[1]
            });
        }
        request();
    }

    delete_check = (item) => {
        if (!this.state.editViewVisible) {
            if (window.confirm('Are you shure?')) this.delete(item);
        } else {
            alert("Cancel Edit first");
        }
    }

    delete = (item) => {
        //Room-id because devicelist update needs it
        this.props.dispatch(deleteDevice(item._id, this.currentRoomId))
    }

    showEditView = (event, data) => {
        if (this.state.addViewVisible) {
            alert("Cancel Add first");
            return;
        }
        //this.props.dispatch(getFunctions(data._id));
        this.setState({
            functionId: "",
            functionId2: ""
        })
        this.getItemsSyncronous(data._id, "functions");

        this.setState({
            editViewVisible: true,
            name: data.name,
            type: data.type,
            _id: data._id,
            functionRows: data.type === 2 ? true : false
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
        let parentid = this.currentRoomId;
        let ditem = {
            "type": this.state.type,
            "name": this.state.name,
            "parentid": parentid,
        }
        let fitem = {
            "functionid": this.state.functionId,
            "type":1
        }
        let fitem2 = {
            "functionid": this.state.functionId2,
            "type":2
        }
        if (this.state.name.length === 0 || this.state.type < 1) {
            alert("Required fields missing")
            return;
        }
        this.props.dispatch(addDevice(ditem, fitem, fitem2));
        this.setState({ addViewVisible: false, ditem: null, fitem: null, fitem2: null })
    }

    update = (event) => {
        event.preventDefault();
        let parentid = this.currentRoomId;

        let item = {
            "type": this.state.type,
            "name": this.state.name,
            "id": this.state._id,
            "parentid": parentid
        }
        let fitem = {
            "functionid": this.state.functionId,
            "type":1
        }
        let fitem2 = {
            "functionid": this.state.functionId2,
            "type":2
        }
        if (this.state.name.length === 0 || this.state.type < 1) {
            alert("Required fields missing")
            return;
        }
        this.props.dispatch(modifyDevice(item, item.id, fitem, fitem2));
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

    onTypeChange = (event, data) => {
        let state = {}
        state[data === undefined ? event.target.functionId : data.name] =
            data === undefined ? event.target.value : data.value;
        this.setState(state);

        if (state.type === 2) {
            this.setState({ functionRows: true });
        }
        else {
            this.setState({ functionRows: false });
        }
    }


    render() {
        let items = [];

        let functionRow =   //Possible second function row
            <Table.Row>
                <Table.Cell>
                    <Form.Field>
                        <label htmlFor="functionId2" />
                        <input type="text"
                            name="functionId2"
                            onChange={this.onChange}
                            value={this.state.functionId2}
                            placeholder="Give function ID" />
                    </Form.Field>
                </Table.Cell>
            </Table.Row>

        items = this.props.devicelist.map((item) => {
            return <Table.Row key={item._id}>
                <Table.Cell >{item.name}</Table.Cell>
                {<Table.Cell ><aside>{getDeviceName(item.type)}</aside></Table.Cell>}
                <Table.Cell><Button
                    icon='trash'
                    onClick={() => {
                        this.delete_check(item);
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
                                colSpan='3'>{this.state.addViewVisible ? 'Add device' : 'Edit device'}
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
                                        placeholder="Give name for device" />
                                </Form.Field>
                            </Table.Cell>
                            <Table.Cell />
                            <Table.Cell />
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Form.Field
                                    control={Select}
                                    options={deviceOptions}
                                    name="type"
                                    label={{
                                        children: "Type",
                                        htmlFor: "type"
                                    }}
                                    placeholder="Select device type"
                                    onChange={this.onTypeChange}
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
                        <Table.Row>
                            <Table.Cell>
                                <Form.Field>
                                    <label htmlFor="functionId">Function Id</label>
                                    <input type="text"
                                        name="functionId"
                                        onChange={this.onChange}
                                        value={this.state.functionId}
                                        placeholder="Give function ID" />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                        {this.state.functionRows === true ? <div>{functionRow}</div> : <div></div>}
                    </Table.Body>
                </Table>
                <br />
            </Form>

        let addButton = <Button onClick={this.showAddView} icon='plus' />


        return (
            <div className="ui one column stackable center aligned page grid">
                <div className="column six wide">
                    <h3>Manage <strong style={{ color: 'grey' }}>{' ' + this.currentRoomName + ' '}</strong>devices</h3>
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
        devicelist: state.device.devicelist,
        activeId: state.device.activeId,
        functionlist: state.function.functionlist
    }
}

export default withRouter(connect(mapStateToProps)(ManageDevicesForm));