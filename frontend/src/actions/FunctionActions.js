export const GET_FUNCTIONS_SUCCESS = "GET_FUNCTIONS_SUCCESS";
export const GET_FUNCTIONS_FAILED = "GET_FUNCTIONS_FAILED";
export const FUNCTIONS_LOADING = "FUNCTIONS_LOADING";
export const ADD_FUNCTION_SUCCESS = "ADD_FUNCTION_SUCCESS";
export const ADD_FUNCTION_FAILED = "ADD_FUNCTION_FAILED";
export const DELETE_FUNCTION_SUCCESS = "DELETE_FUNCTION_SUCCESS";
export const DELETE_FUNCTION_FAILED = "DELETE_FUNCTION_FAILED";
export const MODIFY_FUNCTION_SUCCESS = "MODIFY_FUNCTION_SUCCESS";
export const MODIFY_FUNCTION_FAILED = "MODIFY_FUNCTION_FAILED";

export const getFunctions = (parent_id) => {
    return dispatch => {
        let getObject = {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch(functionsLoading());
        fetch("/api/functions/" + parent_id, getObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(getFunctionsSuccess(data));
                }).catch((error) => {
                    dispatch(getFunctionsFailed("Problem loading list"));
                })
            } else {
                dispatch(getFunctionsFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getFunctionsFailed("Problem loading list"));
        });
    }
}

const getFunctionsSuccess = (list) => {
    return {
        type: GET_FUNCTIONS_SUCCESS,
        list: list
    }
}

const getFunctionsFailed = (error) => {
    return {
        type: GET_FUNCTIONS_FAILED,
        error: error
    }
}

const functionsLoading = () => {
    return {
        type: FUNCTIONS_LOADING
    }
}

export const addFunction = (item) => {
    return dispatch => {
        let postObject = {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }
        fetch("/api/functions/", postObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(addFunctionSuccess());
                    dispatch(getFunctions(item.parentid));
                }).catch((error) => {
                    dispatch(addFunctionFailed("Problem adding function."));
                })
            } else {
                dispatch(addFunctionFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getFunctionsFailed("Problem adding function"));
        });
    }
}

const addFunctionSuccess = () => {
    return {
        type: ADD_FUNCTION_SUCCESS
    }
}

const addFunctionFailed = (error) => {
    return {
        type: ADD_FUNCTION_FAILED,
        error: error
    }
}

export const deleteFunctions = (deviceId) => {
    return dispatch => {
        let deleteObject = {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch(functionsLoading());
        fetch("/api/functions/" + deviceId, deleteObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(deleteFunctionsSuccess());
                }).catch((error) => {
                    dispatch(deleteFunctionsFailed("Problem deleting function"));
                })
            } else {
                dispatch(deleteFunctionsFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getFunctionsFailed("Problem loading list"));
        });
    }
}

const deleteFunctionsSuccess = () => {
    return {
        type: DELETE_FUNCTION_SUCCESS
    }
}

const deleteFunctionsFailed = (error) => {
    return {
        type: DELETE_FUNCTION_FAILED,
        error: error
    }
}

export const modifyFunction = (item, id) => {
    return dispatch => {
        let postObject = {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }
        fetch("/api/function/" + id, postObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(modifyFunctionSuccess());
                    dispatch(getFunctions(item.parentid))
                }).catch((error) => {
                    dispatch(modifyFunctionFailed("Problem adding function."));
                })
            } else {
                dispatch(modifyFunctionFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getFunctionsFailed("Problem adding function"));
        });
    }
}

const modifyFunctionSuccess = () => {
    return {
        type: MODIFY_FUNCTION_SUCCESS
    }
}

const modifyFunctionFailed = (error) => {
    return {
        type: MODIFY_FUNCTION_FAILED,
        error: error
    }
}