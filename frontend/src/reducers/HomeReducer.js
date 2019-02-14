import {
	LOADING_HOME,
	CREATE_HOME_SUCCESS,
	CREATE_HOME_FAILED,
	GET_HOME_SUCCESS,
	GET_HOME_FAILED,
	UPDATE_HOME_SUCCESS,
	UPDATE_HOME_FAILED,

} from '../actions/HomeActions';

function getInitialState() {
	let tempHome = null;
	if (sessionStorage.getItem("homeData")) {
		tempHome = sessionStorage.getItem("homeData");
	}

	let tempWasHomeCreated = false;
	if (sessionStorage.getItem("wasHomeCreated") === "true") {
		tempWasHomeCreated = true
	}

	let error = "";
	if (sessionStorage.getItem("home_error")) {
		error = sessionStorage.getItem("home_error");
	}
		
	return {
		wasHomeCreated: tempWasHomeCreated,
		home: tempHome,
		loading: false,
		error: error
	}
}

function saveToStorage(wasHomeCreated, home, error) {
	sessionStorage.setItem("wasHomeCreated", wasHomeCreated);
	sessionStorage.setItem("homeData", home);
	sessionStorage.setItem("home_error", error);
}

let initialState = getInitialState();

const homeReducer = (state = initialState, action) => {
    // console.log("homeReducer, action:" + action.type)
	let tempState = {};
	
    switch (action.type) {
        case LOADING_HOME:
            tempState = {
                ...state,
				loading: true
            }
			return tempState;
			
        case CREATE_HOME_SUCCESS:
            tempState = {
				...state,
				wasHomeCreated: true,
				home: action.home,
				error: "",
				loading: false
            }
            saveToStorage(true, action.home, "");
			return tempState;
			
        case CREATE_HOME_FAILED:
            tempState = {
				...state,
				home: action.home,
                error: action.error,
                loading: false
            }
            saveToStorage(false, action.home, action.error);
			return tempState;
			
		case GET_HOME_SUCCESS:
            tempState = {
				...state,
				home: action.home,
                error: "",
				loading: false
			}
			saveToStorage(state.wasHomeCreated, action.home, "");
			return tempState;

		case GET_HOME_FAILED:
			tempState = {
				...state,
				error: action.error,
				loading: false
			}
			saveToStorage(state.wasHomeCreated, state.home, action.error);
			return tempState;

		case UPDATE_HOME_SUCCESS:
            tempState = {
				...state,
				home: action.home,
				error: "",
				loading: false
            }
            saveToStorage(state.wasHomeCreated, action.home, "");
			return tempState;
			
        case UPDATE_HOME_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.wasHomeCreated, state.home, action.error);
			return tempState;

		default:
            return state
	}
}

export default homeReducer;