import React from 'react';
import { Table, Form, Button, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getDevices, addDevice, deleteDevice, modifyDevice } from './actions/DeviceActions';

const deviceOptions = [
    { text: 'Light', value: 1 },
    { text: 'Switch', value: 2 },
    { text: 'Heating', value: 3 },
    { text: 'Camera', value: 4 }
];

function getDeviceName(type) {
	return deviceOptions.some(function (option) {
		return type === option.value && option.text;
	});
}

class ManageDevicesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: 0,
            parentid: "",
            addViewVisible: false,
            editViewVisible: false
		}
		this.currentRoomId = this.props.location.state.roomId;
	}

	componentDidMount = () => {
		this.props.dispatch(getDevices(this.currentRoomId));
	}

    delete = (item) => {
        //Room-id because devicelist update needs it
        this.props.dispatch(deleteDevice(item._id, this.currentRoomId))
    }

    showEditView = (event, data) => {
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
        let parentid = this.currentRoomId;
        let item = {
            "type": this.state.type,
            "name": this.state.name,
            "parentid": parentid
        }
        if (this.state.name.length === 0 || this.state.type < 1) {
            alert("Required fields missing")
            return;
        }
        this.props.dispatch(addDevice(item));
        this.setState({ addViewVisible: false })
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
        if (this.state.name.length === 0 || this.state.type < 1) {
            alert("Required fields missing")
            return;
        }
        this.props.dispatch(modifyDevice(item, item.id));
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

        items = this.props.devicelist.map((item) => {
            if (item._id !== 'device_999') { //Leave out manage device button
                return <Table.Row key={item._id}>
                    <Table.Cell >{item.name}</Table.Cell>
                    {<Table.Cell ><aside>{getDeviceName(item.type)}</aside></Table.Cell>}
                    <Table.Cell><Button
                        icon='trash'
                        onClick={() => {
                            if (window.confirm('Are you shure?')) this.delete(item)
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
            } else { return <Table.Row></Table.Row> }
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
                    <h3>Manage devices</h3>
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
        devicelist: state.device.devicelist
    }
}

export default withRouter(connect(mapStateToProps)(ManageDevicesForm));