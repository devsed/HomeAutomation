import {
	LOADING_HOME,
	CREATE_HOME_SUCCESS,
	CREATE_HOME_FAILED,
	GET_HOME_SUCCESS,
	GET_HOME_FAILED,

	HOMES_LOADING,
	GET_HOMES_SUCCESS,
    GET_HOMES_FAILED
} from '../actions/HomeActions';

function getInitialState() {
	let list = [];
	let initHome = null;

	let error = "";
	if (sessionStorage.getItem("home_error")) {
		error = sessionStorage.getItem("home_error");
	}
		
	return {
		home: initHome,
		loading: false,
		error: error,
		homelist: list
	}
}

function saveToStorage(error) {
	sessionStorage.setItem("home_error", error);
}

function saveToStorage_2(list, error) {
	sessionStorage.setItem("home_error", error);
	sessionStorage.setItem("homelist", list);
}

let initialState = getInitialState();

const homeReducer = (state = initialState, action) => {
    console.log("homeReducer, action:" + action.type)
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
				isHomeCreated: true,
				error: "",
				loading: false
            }
            saveToStorage("");
			return tempState;
			
        case CREATE_HOME_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(action.error);
			return tempState;
			
		case GET_HOME_SUCCESS:
            tempState = {
				...state,
				home: action.home,
                error: "",
				loading: false
			}
			saveToStorage("");
			return tempState;

		case GET_HOME_FAILED:
		tempState = {
			...state,
			error: action.error,
			loading: false
		}
		saveToStorage(action.error);
		return tempState;

		case HOMES_LOADING:
		tempState = {
			...state,
			loading: true
		}
		return tempState;

		case GET_HOMES_SUCCESS:
		tempState = {
			homelist: action.list,
			error: "",
			loading: false
		}
		saveToStorage_2(action.list, "");
		return tempState;
			
        case GET_HOMES_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage_2(state.list, action.error);
            return tempState;

		default:
            return state
	}
}

export default homeReducer;