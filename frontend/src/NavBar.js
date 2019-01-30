import React from 'react';
import { Link } from 'react-router-dom';
import { List} from 'semantic-ui-react';
import { logout } from './actions/loginActions';
import { connect } from 'react-redux';

class NavBar extends React.Component {

    logout = () => {
        this.props.dispatch(logout());
    }

    render() {
        let navbar;
        if (this.props.isLogged) {
            navbar = <List horizontal>
                <List.Item>
                    <Link name="logout"
                        to="/" onClick={this.logout}>Logout</Link>
                        <br/>
                    <Link name="goHome"
                        to="/">Home</Link>
                </List.Item>
            </List>
        } else {
            navbar = <div style={{ height: 65 }} />
        }
        if (this.props.isLogged && this.props.actionError.length > 0) {
            navbar = <div style={{ height: 65 }}>
                <p>Error: {this.props.actionError}</p>
				<List horizontal>
					<List.Item>
						<Link name="logout"
							to="/" onClick={this.logout}>Logout</Link>
					</List.Item>
				</List>
			</div>
        }
        return (
            <div style={{ height: 65 }}>
                {navbar}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	let loading=false;
	let actionErrors = [
		state.login.error,
		state.home.error,
		state.room.error,
		state.device.error,
		state.function.error
	]

	function getError(actionError) {
		return actionError.length > 0;
	}
	let error = actionErrors.find(getError);

    return {
        isLogged: state.login.isLogged,
        loading: loading,
        actionError: error !== undefined ? error : ""
    }
}

export default connect(mapStateToProps)(NavBar);