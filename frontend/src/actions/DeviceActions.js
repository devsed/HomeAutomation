export const GET_DEVICES_SUCCESS = "GET_DEVICES_SUCCESS";
export const GET_DEVICES_FAILED = "GET_DEVICES_FAILED";
export const DEVICES_LOADING = "DEVICES_LOADING";
export const ADD_DEVICE_SUCCESS = "ADD_DEVICE_SUCCESS";
export const ADD_DEVICE_FAILED = "ADD_DEVICE_FAILED";
export const DELETE_DEVICE_SUCCESS = "DELETE_DEVICE_SUCCESS";
export const DELETE_DEVICE_FAILED = "DELETE_DEVICE_FAILED";
export const MODIFY_DEVICE_SUCCESS = "MODIFY_DEVICE_SUCCESS";
export const MODIFY_DEVICE_FAILED = "MODIFY_DEVICE_FAILED";


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

export const addDevice = (item) => {
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
        fetch("/api/devices/", postObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(addDeviceSuccess());
                    dispatch(getDevices(item.parentid))
                }).catch((error) => {
                    dispatch(addDeviceFailed("Problem adding device."));
                })
            } else {
                dispatch(addDeviceFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getDevicesFailed("Problem adding device"));
        });
    }
}

const addDeviceSuccess = () => {
    return {
        type: ADD_DEVICE_SUCCESS
    }
}

const addDeviceFailed = (error) => {
    return {
        type: ADD_DEVICE_FAILED,
        error: error
    }
}

export const deleteDevice = (deviceId, homeId) => {
    return dispatch => {
        let deleteObject = {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch(devicesLoading());
        fetch("/api/device/"+deviceId, deleteObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(deleteDeviceSuccess());
                    dispatch(getDevices(homeId));
                }).catch((error) => {
                    dispatch(deleteDeviceFailed("Problem deleting device"));
                })
            } else {
                dispatch(deleteDeviceFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getDevicesFailed("Problem loading list"));
        });
    }
}

const deleteDeviceSuccess = () => {
    return {
        type: DELETE_DEVICE_SUCCESS
    }
}

const deleteDeviceFailed = (error) => {
    return {
        type: DELETE_DEVICE_FAILED,
        error: error
    }
}

export const modifyDevice = (item) => {
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
        fetch("/api/device/", postObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(modifyDeviceSuccess());
                    dispatch(getDevices(item.parentid))
                }).catch((error) => {
                    dispatch(modifyDeviceFailed("Problem adding device."));
                })
            } else {
                dispatch(modifyDeviceFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getDevicesFailed("Problem adding device"));
        });
    }
}

const modifyDeviceSuccess = () => {
    return {
        type: MODIFY_DEVICE_SUCCESS
    }
}

const modifyDeviceFailed = (error) => {
    return {
        type: MODIFY_DEVICE_FAILED,
        error: error
    }
}