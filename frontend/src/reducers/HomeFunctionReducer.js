import {
    GET_HOME_FUNCTIONS_SUCCESS,
    GET_HOME_FUNCTIONS_FAILED,
    HOME_FUNCTIONS_LOADING
} from '../actions/HomeFunctionActions'

function getInitialState() {
    let list = []
    let error = ""
    if (sessionStorage.getItem("function_error")) {
        error = sessionStorage.getItem("function_error");
    }
    return {
        homefunctionlist: list,
        error: error,
        loading: false
    }
}

function saveToStorage(list, error) {
    sessionStorage.setItem("list", list);
    sessionStorage.setItem("function_error", error);
}

let initialState = getInitialState();

const homeFunctionReducer = (state = initialState, action) => {
    //console.log("FunctionReducer - action:" + action.type)
    let tempState = {};
    switch (action.type) {

        case GET_HOME_FUNCTIONS_SUCCESS:
            tempState = {
                homefunctionlist: action.list,
                error: "",
                loading: false
            }
            saveToStorage("", "", action.list);
            return tempState;

        case GET_HOME_FUNCTIONS_FAILED:
            tempState = {
                ...state,
                error: action.error,
                loading: false
            }
            saveToStorage(state.list, action.error);
            return tempState;

        case HOME_FUNCTIONS_LOADING:
            tempState = {
                ...state,
                loading: true
            }
            return tempState;

        default:
            return state;

    }
}
export default homeFunctionReducer