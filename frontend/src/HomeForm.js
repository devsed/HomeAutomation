import React from 'react';
import { Form, Select, Button, Grid, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { createHome, updateHome } from './actions/HomeActions';

const homeOptions = [
	{ text: 'Row house', value: 1 },
	{ text: 'Apartment house', value: 2 },
	{ text: 'Detached house', value: 3 }
];

class HomeForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.homeExists ? this.props.home.name : "",
			type: this.props.homeExists ? this.props.home.type : 0,
			serviceAddress: this.props.homeExists ? this.props.home.proxySettings.addr : "",
			serviceUsername: this.props.homeExists ? this.props.home.proxySettings.user : "",
			servicePassword: this.props.homeExists ? this.props.home.proxySettings.password : "",
			testServiceSettings: this.props.homeExists ? this.props.home.proxySettings.areTested : false
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			name: nextProps.home.name,
			type: nextProps.home.type,
			serviceAddress: nextProps.home.proxySettings.addr,
			serviceUsername: nextProps.home.proxySettings.user,
			servicePassword: nextProps.home.proxySettings.password,
			testServiceSettings: nextProps.home.proxySettings.areTested
		});
	  }

	onChange = (event, data) => {
		let state = {};
		state[data === undefined ? event.target.name : data.name] =
			data === undefined ? event.target.value :
				 data.type !== "checkbox" ? data.value : data.checked;
		this.setState(state);
	}

	submit = (event) => {
		event.preventDefault();

		if (this.state.name.length === 0 || this.state.type < 1 || this.state.serviceAddress.length === 0 ||
			this.state.serviceUsername.length === 0 || this.state.servicePassword.length === 0) {
			return;
		}

		let home = {
			"name": this.state.name,
			"type": this.state.type,
			"proxySettings": {
				"addr": this.state.serviceAddress,
				"user": this.state.serviceUsername,
				"password": this.state.servicePassword,
				"areTested": this.state.testServiceSettings
			}
		}

		if (event.target.name === "create") {
			this.props.dispatch(createHome(home));
		} else {
			this.props.dispatch(updateHome(home, this.props.home._id));
		}
		// Always redirect to home accordion view
		this.props.history.push("/home/existing");
	}

	render() {
		return (
			<div className="ui one column stackable center aligned page grid">
				<div className="column six wide">
					<h2 style={{ height: 65 }} >{this.props.homeExists ? "Update Home" : "Create Home"}</h2>
					<Form>
						<Form.Field required>
							<label htmlFor="name">Home name</label>
							<input type="text" name="name" value={this.state.name} onChange={this.onChange} required />
						</Form.Field>
						<Form.Field
							name="type"
							control={Select}
							options={homeOptions}
							value = {this.state.type === 0 ? "" : this.state.type} // When home is created and form entered 1st time
							label={{                                               // value must be empty to show placeholder corrctly
								children: "Type of your house",
								htmlFor: "type"
							}}
							placeholder="Select your house type"
							onChange={this.onChange} required />
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
						<Grid columns="2">
							<Grid.Row>
								<Grid.Column>
									<Button name={this.props.homeExists ? "update" : "create"}
										onClick={this.submit}>{this.props.homeExists ? "Update" : "Create"}</Button>
								</Grid.Column>
								<Grid.Column>
									<Checkbox label="Test service settings" name="testServiceSettings"
										checked={this.state.testServiceSettings} onClick={this.onChange} />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		home: state.home.home
	}
}

export default withRouter(connect(mapStateToProps)(HomeForm));