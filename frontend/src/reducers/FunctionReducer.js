import {
    GET_FUNCTIONS_SUCCESS,
    GET_FUNCTIONS_FAILED,
    FUNCTIONS_LOADING
} from '../actions/FunctionActions'

function getInitialState() {
    let list = []
    let error = ""
    if (sessionStorage.getItem("function_error")) {
        error = sessionStorage.getItem("function_error");
    }
    return {
        functionlist: list,
        error: error,
        loading: false
    }
}

function saveToStorage(list, error) {
    sessionStorage.setItem("list", list);
    sessionStorage.setItem("function_error", error);
}

let initialState = getInitialState();

const functionReducer = (state = initialState, action) => {
    // console.log("FunctionReducer - action:" + action.type)
    let tempState = {};
    switch (action.type) {
        case GET_FUNCTIONS_SUCCESS:
            tempState = {
                functionlist: action.list,
                error: "",
                loading: false
            }
            saveToStorage(action.list, "");
            return tempState;
        case GET_FUNCTIONS_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;
        case FUNCTIONS_LOADING:
            tempState = {
                ...state,
                loading: true
            }
            return tempState;
        default:
            return state;
    }
}
export default functionReducer