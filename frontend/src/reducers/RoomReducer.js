import {
    GET_ROOMS_SUCCESS,
    GET_ROOMS_FAILED,
    ROOMS_LOADING,
    ADD_ROOM_SUCCESS,
    ADD_ROOM_FAILED,
    DELETE_ROOM_FAILED,
    DELETE_ROOM_SUCCESS,
    MODIFY_ROOM_FAILED,
    MODIFY_ROOM_SUCCESS,
    ACTIVE_ROOM_CHANGED
} from '../actions/RoomActions'

function getInitialState() {
    let list = []
    let error = ""
    let activeId = ""
    if (sessionStorage.getItem("room_error")) {
        error = sessionStorage.getItem("room_error");
    }
    return {
        roomlist: list,
        error: error,
        loading: false,
        activeId: activeId
    }
}

function saveToStorage(list, error, activeId) {
    sessionStorage.setItem("list", list);
    sessionStorage.setItem("room_error", error);
    sessionStorage.setItem("activeId", activeId);
}

let initialState = getInitialState();

const roomReducer = (state = initialState, action) => {
    //console.log("RoomReducer - action:" + action.type)
    let tempState = {};
    switch (action.type) {
        case GET_ROOMS_SUCCESS:
            tempState = {
                roomlist: action.list,
                error: "",
                loading: false
            }
            saveToStorage(action.list, "");
            return tempState;

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

        case ADD_ROOM_SUCCESS:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(action.list, "");
            return tempState;

        case ADD_ROOM_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;

        case DELETE_ROOM_SUCCESS:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(action.list, "");
            return tempState;

        case DELETE_ROOM_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;

        case MODIFY_ROOM_SUCCESS:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(action.list, "");
            return tempState;

        case MODIFY_ROOM_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;

        case ACTIVE_ROOM_CHANGED:
            tempState = {
                ...state,
                activeId: action.activeId,
                loading: false
            }
            saveToStorage(state.list, action.error, action.activeId);
            return tempState;

        default:
            return state;
    }
}
export default roomReducer