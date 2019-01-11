import {
	LOADING_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
} from '../actions/UserActions';

function getInitialState() {
	let tempUser = null;

	let error = "";
	if (sessionStorage.getItem("user_error")) {
		error = sessionStorage.getItem("user_error");
	}
		
	return {
		user: tempUser,
		loading: false,
		error: error
	}
}

function saveToStorage(error) {
	sessionStorage.setItem("user_error", error);
}

let initialState = getInitialState();

const userReducer = (state = initialState, action) => {
    console.log("userReducer, action:" + action.type)
	let tempState = {};
	
    switch (action.type) {
        case LOADING_USER:
            tempState = {
                ...state,
				loading: true
            }
			return tempState;
						
		case GET_USER_SUCCESS:
            tempState = {
				...state,
				user: action.user,
                error: "",
				loading: false
			}
			saveToStorage("");
			return tempState;

		case GET_USER_FAILED:
			tempState = {
				...state,
				error: action.error,
				loading: false
			}
			saveToStorage(action.error);
			return tempState;

		default:
            return state
	}
}

export default userReducer;