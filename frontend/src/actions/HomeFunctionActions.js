export const GET_HOME_FUNCTIONS_SUCCESS = "GET_HOME_FUNCTIONS_SUCCESS";
export const GET_HOME_FUNCTIONS_FAILED = "GET_HOME_FUNCTIONS_FAILED";
export const HOME_FUNCTIONS_LOADING = "HOME_FUNCTIONS_LOADING";

export const getHomeFunctions = (parent_id) => {
    return dispatch => {
        let getObject = {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch(homefunctionsLoading());
        fetch("/api/proxy/devFuncs/" + parent_id, getObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(getHomeFunctionsSuccess(data));
                }).catch((error) => {
                    dispatch(getHomeFunctionsFailed("Problem loading list"));
                })
            } else {
                dispatch(getHomeFunctionsFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getHomeFunctionsFailed("Problem loading list"));
        });
    }
}

const homefunctionsLoading = () => {
    return {
        type: HOME_FUNCTIONS_LOADING
    }
}

const getHomeFunctionsSuccess = (list) => {
    return {
        type: GET_HOME_FUNCTIONS_SUCCESS,
        list: list
    }
}

const getHomeFunctionsFailed = (error) => {
    return {
        type: GET_HOME_FUNCTIONS_FAILED,
        error: error
    }
}
