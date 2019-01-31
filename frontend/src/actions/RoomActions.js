export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILED = "GET_ROOMS_FAILED";
export const ROOMS_LOADING = "ROOMS_LOADING";
export const ADD_ROOM_SUCCESS = "ADD_ROOM_SUCCESS";
export const ADD_ROOM_FAILED = "ADD_ROOM_FAILED";
export const DELETE_ROOM_SUCCESS = "DELETE_ROOM_SUCCESS";
export const DELETE_ROOM_FAILED = "DELETE_ROOM_FAILED";
export const MODIFY_ROOM_SUCCESS = "MODIFY_ROOM_SUCCESS";
export const MODIFY_ROOM_FAILED = "MODIFY_ROOM_FAILED";
export const ACTIVE_ROOM_CHANGED = "ACTIVE_ROOM_CHANGED";

export const getRooms = (id) => {
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
        fetch("/api/rooms/"+id, getObject).then((response) => {
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
export const changeActiveRoomId=(id)=>{
    return dispatch => {
        dispatch(activeRoomChanged(id));
    }
}

const activeRoomChanged=(id)=>{
    return{
        type:ACTIVE_ROOM_CHANGED,
        activeId:id
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

export const addRoom = (item) => {
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
        fetch("/api/rooms/", postObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(addRoomSuccess());
                    dispatch(getRooms(item.parentid))
                }).catch((error) => {
                    dispatch(addRoomFailed("Problem adding room."));
                })
            } else {
                dispatch(addRoomFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getRoomsFailed("Problem adding room"));
        });
    }
}

const addRoomSuccess = () => {
    return {
        type: ADD_ROOM_SUCCESS
    }
}

const addRoomFailed = (error) => {
    return {
        type: ADD_ROOM_FAILED,
        error: error
    }
}

export const deleteRoom = (roomId, homeId) => {
    return dispatch => {
        let deleteObject = {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch(roomsLoading());
        fetch("/api/room/"+roomId, deleteObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(deleteRoomSuccess());
                    dispatch(getRooms(homeId));
                }).catch((error) => {
                    dispatch(deleteRoomFailed("Problem deleting room"));
                })
            } else {
                dispatch(deleteRoomFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getRoomsFailed("Problem loading list"));
        });
    }
}

const deleteRoomSuccess = () => {
    return {
        type: DELETE_ROOM_SUCCESS
    }
}

const deleteRoomFailed = (error) => {
    return {
        type: DELETE_ROOM_FAILED,
        error: error
    }
}

export const modifyRoom = (item, id) => {
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
        fetch("/api/room/"+id, postObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    dispatch(modifyRoomSuccess());
                    dispatch(getRooms(item.parentid))
                }).catch((error) => {
                    dispatch(modifyRoomFailed("Problem adding room."));
                })
            } else {
                dispatch(modifyRoomFailed("Response not ok. Status:" + response.status));
            }
        }).catch((error) => {
            dispatch(getRoomsFailed("Problem adding room"));
        });
    }
}

const modifyRoomSuccess = () => {
    return {
        type: MODIFY_ROOM_SUCCESS
    }
}

const modifyRoomFailed = (error) => {
    return {
        type: MODIFY_ROOM_FAILED,
        error: error
    }
}
