import {
    GET_DEVICES_SUCCESS,
    GET_DEVICES_FAILED,
    DEVICES_LOADING,
    ADD_DEVICE_SUCCESS,
    ADD_DEVICE_FAILED,
    DELETE_DEVICE_FAILED,
    DELETE_DEVICE_SUCCESS,
    MODIFY_DEVICE_FAILED,
    MODIFY_DEVICE_SUCCESS,
    ACTIVE_DEVICE_CHANGED

} from '../actions/DeviceActions'

function getInitialState() {
    let list = []
    let error = ""
    let activeId = ""
    if (sessionStorage.getItem("device_error")) {
        error = sessionStorage.getItem("device_error");
    }
    return {
        devicelist: list,
        error: error,
        loading: false,
        activeId: activeId
    }
}

function saveToStorage(list, error, activeId) {
    sessionStorage.setItem("list", list);
    sessionStorage.setItem("device_error", error);
    sessionStorage.setItem("activeId", activeId);
}

let initialState = getInitialState();

const deviceReducer = (state = initialState, action) => {
    //console.log("DeviceReducer - action:" + action.type)
    let tempState = {};
    switch (action.type) {
        case GET_DEVICES_SUCCESS:
            tempState = {
                devicelist: action.list,
                error: "",
                loading: false
            }
            saveToStorage(action.list, "");
            return tempState;
        case GET_DEVICES_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;
        case DEVICES_LOADING:
            tempState = {
                ...state,
                loading: true
            }
            return tempState;
        default:
            return state;

        case ADD_DEVICE_SUCCESS:
            tempState = {
                ...state,
                error: "",
                loading: false
            }
            saveToStorage(action.list, "");
            return tempState;

        case ADD_DEVICE_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;

        case DELETE_DEVICE_SUCCESS:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(action.list, "");
            return tempState;

        case DELETE_DEVICE_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;

        case MODIFY_DEVICE_SUCCESS:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(action.list, "");
            return tempState;

        case MODIFY_DEVICE_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;

        case ACTIVE_DEVICE_CHANGED:
            tempState = {
                ...state,
                activeId: action.activeId,
                loading: false
            }
            saveToStorage(state.list, action.error, action.activeId);
            return tempState;
    }
}
export default deviceReducer