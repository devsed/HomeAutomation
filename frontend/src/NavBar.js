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
                </List.Item>
            </List>
        } else {
            navbar = <div style={{ height: 65 }} />
        }
        if (this.props.loginError.length > 0) {
            navbar = <div style={{ height: 65 }}>
                <p>Error:{this.props.loginError}</p></div>
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
    let error="";
    if(state.login.error.length>0) {
        error=state.login.error
    }
    return {
        isLogged: state.login.isLogged,
        loading: loading,
        loginError: error
    }
}

export default connect(mapStateToProps)(NavBar);