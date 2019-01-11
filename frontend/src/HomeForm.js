import React from 'react';
import { Form, Select, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createHome } from './actions/HomeActions';

const homeOptions = [
	{text: 'Row house', value: 1},
	{text: 'Apartment house', value: 2},
	{text: 'Detached house', value: 3}
];

class HomeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			name: "",
			type: 0,
			serviceAddress:"",
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

		
		 if (this.state.name.length === 0 || this.state.type < 1 || this.state.serviceAddress.length === 0 ||
			this.state.serviceUsername.length === 0 || this.state.servicePassword.length === 0) {
            return;
		}
				
        let home = {
			"name":this.state.name,
			"type":this.state.type,
			"proxySettings": {
				"address":this.state.serviceAddress,
				"username":this.state.serviceUsername,
				"password":this.state.servicePassword
			}
		}
		
		this.props.dispatch(createHome(home));
	}
	
	render() {
        return(
			<div className="ui one column stackable center aligned page grid">
                <div className="column six wide">
					<h2 style={{ height: 65 }} >Create Home</h2>
					<Form>
						<Form.Field required>
							<label htmlFor="name">Home name</label>
							<input type="text" name="name" value={this.state.name} onChange={this.onChange} required />
						</Form.Field>
						<Form.Field	name="type"	control={Select} options={homeOptions}
							label={{children: "Type of your house", htmlFor: "type"}}
							placeholder="Select your house type" onChange={this.onChange} required />
						<Form.Field required>
							<label htmlFor="serviceAddress">Service address</label>
							<input type="url" name="serviceAddress" value={this.state.serviceAddress}
								onChange={this.onChange} placeholder={"E.g. https://uncleshab.hopto.org"} required />
                        </Form.Field>
						<Form.Field required>
							<label htmlFor="serviceUsername">Service username</label>
							<input type="text" name="serviceUsername" value={this.state.serviceUsername}
								onChange={this.onChange} placeholder="Username for smart home service" required />
                        </Form.Field>
                        <Form.Field required>
                            <label htmlFor="servicePassword">Service password</label>
							<input type="password" name="servicePassword" value={this.state.servicePassword}
								onChange={this.onChange} placeholder="Password for smart home service" required />
                        </Form.Field>
                        	<Button onClick={this.submit} name="create">Create Home</Button>
					</Form>
				</div>
			</div>
        )
    }
}

export default connect()(HomeForm);