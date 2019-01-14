import React from 'react';
import { Table, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ManageRoomsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: 0,
            parentid: ""
        }
    }

    componentDidMount() {
        if (this.props.isLogged) {
        }
    }

    remove = (event) => {
    }

    edit = (event) => {
    }

    submit = (event => {
        event.preventDefault();
        let item = {
            "type": this.state.type,
            "name": this.state.name,
            parentid: ""
        }
        //        this.props.dispatch(addRoom(item))
    })

    onChange = (event) => {
        let state = {}
        state[event.target.name] = event.target.value;
        this.setState(state)
    }

    render() {
        let items = this.props.roomlist.map((item) => {
            if (item._id !== 'room_999') { //Removed manage room button
                return <Table.Row key={item._id}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.type}</Table.Cell>
                    <Table.Cell><Button onClick={this.remove} name={item._id}>Remove</Button></Table.Cell>
                    <Table.Cell><Button onClick={this.edit} name={item._id}>Edit</Button></Table.Cell>
                </Table.Row>
            }
        })

        return (
            <div className="ui one column stackable center aligned page grid">
                <div className="column six wide">
                    <Table >
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
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell><Button onClick={this.add} name='new'>New</Button></Table.Cell>
                        </Table.Body>
                    </Table>
                    <Form onSubmit={this.submit}>
                        <Form.Field>
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                name="name"
                                onChange={this.onChange}
                                value={this.state.name} />
                        </Form.Field>
                        <br />

                        <Form.Field>
                            <label htmlFor="type">Type</label>
                            <input type="number"
                                name="type"
                                onChange={this.onChange}
                                minimum="0"
                                step="1"
                                value={this.state.type} />
                        </Form.Field>
                        <br />

                        <Button inverted color='red' type="submit">Add</Button>

                    </Form>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLogged: state.login.isLogged,
        roomlist: state.room.roomlist
    }
}

export default connect(mapStateToProps)(ManageRoomsForm);