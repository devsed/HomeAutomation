export const GET_DEVICES_SUCCESS = "GET_DEVICES_SUCCESS";
export const GET_DEVICES_FAILED = "GET_DEVICES_FAILED";
export const DEVICES_LOADING = "DEVICES_LOADING";

export const getDevices = (parent_id) => {
    return dispatch => {
        let getObject = {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch(devicesLoading());
        fetch("/api/devices/" + parent_id, getObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(getDevicesSuccess(data));
                }).catch((error) => {
                    dispatch(getDevicesFailed("Problem loading list"));
                })
            } else {
                dispatch(getDevicesFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getDevicesFailed("Problem loading list"));
        });
    }
}

const getDevicesSuccess = (list) => {
    return {
        type: GET_DEVICES_SUCCESS,
        list:list
    }
}

const getDevicesFailed = (error) => {
    return {
        type: GET_DEVICES_FAILED,
        error: error
    }
}

const devicesLoading = () => {
    return {
        type: DEVICES_LOADING
    }
}