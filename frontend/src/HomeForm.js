import React from 'react';
import { Form, Select, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createHome } from './actions/HomeActions';

const homeOptions = [
	{text: 'Row house', value: 0},
	{text: 'Apartment house', value: 1},
	{text: 'Detached house', value: 2}
];

class HomeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			type: -1,
            name: "",
			serviceUsername: "",
			servicePassword: ""
		}
    }

    onChange = (event, data) => {
		let state = {};

		state[data === undefined ? event.target.name: data.name] = 
			data === undefined ?  event.target.value : data.value;
        this.setState(state);
	}

    submit = (event) => {
		event.preventDefault();

		if (this.state.type === -1 || this.state.name.length === 0 ||
			this.state.serviceUsername.length === 0 || this.state.servicePassword.length === 0) {
            return;
        }
		
        let home = {
			"name":this.state.name,
			"type":this.state.type,
			"serviceUsername":this.state.serviceUsername,
			"servicePassword":this.state.servicePassword
		}
		
		this.props.dispatch(createHome(home));
	}
	
	render() {
        return(
			<div className="ui one column stackable center aligned page grid">
                <div className="column six wide">
					<h2 style={{ height: 65 }} >Create Home</h2>
					<Form>
						<Form.Field>
							<label htmlFor="name">Home name</label>
							<input type="text" name="name" onChange={this.onChange}	value={this.state.name}/>
						</Form.Field>
						<Form.Field	name="type"	control={Select} options={homeOptions}
							label={{children: "Type of your house", htmlFor: "type"}}
							placeholder="Select your house type" onChange={this.onChange}/>
						<Form.Field>
						<label htmlFor="serviceUsername">Username</label>
                            <input type="text" name="serviceUsername" onChange={this.onChange} value={this.state.serviceUsername} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="servicePassword">Password</label>
                            <input type="password" name="servicePassword" onChange={this.onChange} value={this.state.servicePassword} />
                        </Form.Field>
                        	<Button onClick={this.submit} name="create">Create Home</Button> &nbsp;&nbsp;
                        	<Button onClick={this.submit} name="cancel">Cancel</Button>
					</Form>
				</div>
			</div>
        )
    }
}

export default connect()(HomeForm);