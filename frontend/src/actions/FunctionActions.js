export const GET_FUNCTIONS_SUCCESS = "GET_FUNCTIONS_SUCCESS";
export const GET_FUNCTIONS_FAILED = "GET_FUNCTIONS_FAILED";
export const FUNCTIONS_LOADING = "FUNCTIONS_LOADING";

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
        list:list
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