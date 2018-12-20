import {
    GET_HOMES_SUCCESS,
    GET_HOMES_FAILED,
    HOMES_LOADING
} from '../actions/HomeActions'

function getInitialState() {
    let list = []
    let error = ""
    if (sessionStorage.getItem("home_error")) {
        error = sessionStorage.getItem("home_error");
    }
    return {
        homelist: list,
        error: error,
        loading: false
    }
}

function saveToStorage(list, error) {
    sessionStorage.setItem("homelist", list);
    sessionStorage.setItem("home_error", error);
}

let initialState = getInitialState();

const homeReducer = (state = initialState, action) => {
    console.log("HomeReducer - action:" + action.type)
    let tempState = {};
    switch (action.type) {
        case GET_HOMES_SUCCESS:
            tempState = {
                homelist: action.list,
                error: "",
                loading: false
            }
            saveToStorage(action.list, "");
            return tempState;
        case GET_HOMES_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;
        case HOMES_LOADING:
            tempState = {
                ...state,
                loading: true
            }
            return tempState;
        default:
            return state;
    }
}
export default homeReducer