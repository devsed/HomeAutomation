export const GET_HOMES_SUCCESS = "GET_HOMES_SUCCESS";
export const GET_HOMES_FAILED = "GET_HOMES_FAILED";
export const HOMES_LOADING = "HOMES_LOADING";

export const getHomes = () => {
    return dispatch => {
        let getObject = {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch(homesLoading());
        fetch("/api/homes", getObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(getHomesSuccess(data));
                }).catch((error) => {
                    dispatch(getHomesFailed("Problem loading homelist"));
                })
            } else {
                dispatch(getHomesFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getHomesFailed("Problem loading homelist"));
        });
    }
}

const getHomesSuccess = (list) => {
    return {
        type: GET_HOMES_SUCCESS,
        list:list
    }
}

const getHomesFailed = (error) => {
    return {
        type: GET_HOMES_FAILED,
        error: error
    }
}

const homesLoading = () => {
    return {
        type: HOMES_LOADING
    }
}