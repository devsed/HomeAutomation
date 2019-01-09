import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
	LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    LOGIN_LOADING
} from '../actions/loginActions';

function getInitialState() {
	let tempHomedId = "";

    if (sessionStorage.getItem("isLogged")) {
        let tempIsLogged = false
        if (sessionStorage.getItem("isLogged") === "true") {
            tempIsLogged = true
        }
        let error = "";
        if (sessionStorage.getItem("login_error")) {
            error = sessionStorage.getItem("login_error");
        }
        return {
			isLogged: tempIsLogged,
			homeId: tempHomedId,
            loading: false,
            error: error
        }
    } else {
        return {
			isLogged: false,
			homeId: tempHomedId,
            loading: false,
            error: ""
        }
    }
}

function saveToStorage(isLogged, error) {
    sessionStorage.setItem("isLogged", isLogged);
    sessionStorage.setItem("error", "");
}

let initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
    //console.log("loginReducer, action:" + action.type)
	let tempState = {};
	
    switch (action.type) {
        case LOGIN_LOADING:
            tempState = {
                ...state,
                loading: true
            }
			return tempState;
			
        case REGISTER_SUCCESS:
            tempState = {
                ...state,
                error: "",
                loading: false
            }
            saveToStorage(state.isLogged, "");
			return tempState;
			
        case REGISTER_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.isLogged, action.error);
			return tempState;
			
        case LOGIN_SUCCESS:
            tempState = {
				isLogged: true,
				homeId: action.homeId,
                error: "",
                loading: false
            }
            saveToStorage("true", "");
			return tempState;
			
        case LOGIN_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.isLogged, action.error);
			return tempState;
			
        case LOGOUT_SUCCESS:
            tempState = {
                isLogged: false,
                loading: false,
                error: ""
            }
            sessionStorage.clear();
			return tempState;
			
        case LOGOUT_FAILED:
            tempState = {
                ...state,
                loading: false,
                error: action.error
            }
            saveToStorage(state.isLogged, action.error);
			return tempState;
			
        default:
            return state
    }
}

export default loginReducer;