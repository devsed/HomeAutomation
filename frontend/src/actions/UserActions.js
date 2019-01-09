export const LOADING_USER = "LOADING_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

// Home actions

export const getUser = (id) => {
	return dispatch => {
		let getObject = {
			method: "GET",
			mode: "cors",
			credentials:"include",
			headers: {"Content-Type":"application/json"}
		}

		dispatch(loadingUser());

		fetch("/api/users/"+id, getObject).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					dispatch(getUserSuccess(data));
				}).catch((error) => {
					dispatch(getUserFailed("Problem loading user" + error));
				})
			} else {
				dispatch(getUserFailed("Response not ok. Status: "+ res.status));
			}

		}).catch((error) => {
			dispatch(getUserFailed("Problem loading user" + error));
		});
	}
}

export const updateUser = (user) => {
	return dispatch => {
		let getObject = {
			method: "PUT",
			mode: "cors",
			credentials:"include",
			headers: {"Content-Type":"application/json"},
			body:JSON.stringify(user)
		}

		dispatch(loadingUser());

		fetch("/api/user/", getObject).then((res) => {
			if (res.ok) {
				res.json().then(() => {
					dispatch(updateUserSuccess());
				}).catch((error) => {
					dispatch(updateUserFailed("Problem updating user" + error));
				})
			} else {
				dispatch(updateUserFailed("Response not ok. Status: "+ res.status));
			}

		}).catch((error) => {
			dispatch(updateUserFailed("Problem updating user" + error));
		});
	}
}

// Action creators

const loadingUser = () => {
	return {
		type:LOADING_USER
	}
}

const getUserSuccess = (user) => {
	return {
		type:GET_USER_SUCCESS,
		user:user
	}
}

const getUserFailed = (error) => {
	return {
		type:GET_USER_FAILED,
		error:error
	}
}

const updateUserSuccess = () => {
	return {
		type:UPDATE_USER_SUCCESS
	}
}

const updateUserFailed = (error) => {
	return {
		type:UPDATE_USER_FAILED,
		error:error
	}
}