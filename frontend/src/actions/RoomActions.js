export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILED = "GET_ROOMS_FAILED";
export const ROOMS_LOADING = "ROOMS_LOADING";

export const getRooms = () => {
    return dispatch => {
        let getObject = {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch(roomsLoading());
        fetch("/api/rooms", getObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(getRoomsSuccess(data));
                }).catch((error) => {
                    dispatch(getRoomsFailed("Problem loading list"));
                })
            } else {
                dispatch(getRoomsFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getRoomsFailed("Problem loading list"));
        });
    }
}

const getRoomsSuccess = (list) => {
    return {
        type: GET_ROOMS_SUCCESS,
        list:list
    }
}

const getRoomsFailed = (error) => {
    return {
        type: GET_ROOMS_FAILED,
        error: error
    }
}

const roomsLoading = () => {
    return {
        type: ROOMS_LOADING
    }
}