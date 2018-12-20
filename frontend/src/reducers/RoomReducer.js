import {
    GET_ROOMS_SUCCESS,
    GET_ROOMS_FAILED,
    ROOMS_LOADING
} from '../actions/RoomActions'

function getInitialState() {
    let list = []
    let error = ""
    if (sessionStorage.getItem("room_error")) {
        error = sessionStorage.getItem("room_error");
    }
    return {
        roomlist: list,
        error: error,
        loading: false
    }
}

function saveToStorage(list, error) {
    sessionStorage.setItem("list", list);
    sessionStorage.setItem("room_error", error);
}

let initialState = getInitialState();

const roomReducer = (state = initialState, action) => {
    console.log("RoomReducer - action:" + action.type)
    let tempState = {};
    switch (action.type) {
        case GET_ROOMS_SUCCESS:
            tempState = {
                roomlist: action.list,
                error: "",
                loading: false
            }
            saveToStorage(action.list, "");
            return tempState ;
            
        case GET_ROOMS_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;
        case ROOMS_LOADING:
            tempState = {
                ...state,
                loading: true
            }
            return tempState;
        default:
            return state;
    }
}
export default roomReducer