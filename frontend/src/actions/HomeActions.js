export const LOADING_HOME = "LOADING_HOME";
export const CREATE_HOME_SUCCESS = "CREATE_HOME_SUCCESS";
export const CREATE_HOME_FAILED = "CREATE_HOME_FAILED";
export const GET_HOME_SUCCESS = "GET_HOME_SUCCESS";
export const GET_HOME_FAILED = "GET_HOME_FAILED";
export const UPDATE_HOME_SUCCESS = "UPDATE_HOME_SUCCESS";
export const UPDATE_HOME_FAILED = "UPDATE_HOME_FAILED";

// Home actions

export const createHome = (home) => {
	return dispatch => {
		let postObject = {
			method: "POST",
			mode: "cors",
			credentials:"include",
			headers: {"Content-Type":"application/json"},
			body:JSON.stringify(home)
		}

		fetch("/api/homes", postObject).then((resp) => {
			if (resp.ok) {
				resp.json().then((data) => {
					dispatch(createHomeSuccess(data));
				}).catch((error) => {
					dispatch(createHomeFailed("Problem creating home: "+error));
				})
			} else {
				dispatch(createHomeFailed("A home has already created: "+resp.status));
			}
		}).catch((error) => {
			dispatch(createHomeFailed("Server responded with error: "+error));
		});
	}
}

export const getHome = (id) => {
	return dispatch => {
		let getObject = {
			method: "GET",
			mode: "cors",
			credentials:"include",
			headers: {"Content-Type":"application/json"}
		}

		dispatch(homeLoading());

		fetch("/api/home/"+id, getObject).then((resp) => {
			if (resp.ok) {
				resp.json().then((data) => {
					dispatch(getHomeSuccess(data));
				}).catch((error) => {
					dispatch(getHomeFailed("Problem loading home with rooms: "+error));
				})
			} else {
				dispatch(getHomeFailed("Response not ok. Status: "+resp.status));
			}

		}).catch((error) => {
			dispatch(getHomeFailed("Problem loading home with rooms: "+error));
		});
	}
}

export const updateHome = (home, id) => {
	return dispatch => {
		let postObject = {
			method: "PUT",
			mode: "cors",
			credentials:"include",
			headers: {"Content-Type":"application/json"},
			body:JSON.stringify(home)
		}

		fetch("/api/home/"+id, postObject).then((resp) => {
			if (resp.ok) {
				resp.json().then((data) => {
					dispatch(updateHomeSuccess(data));
				}).catch((error) => {
					dispatch(updateHomeFailed("Problem updating home: "+error));
				});
			} else {
				dispatch(updateHomeFailed("Problem updating home: "+resp.status));
			}
		}).catch((error) => {
			dispatch(updateHomeFailed("Server responded with error: "+error));
		});
	}
}

	// Action creators

const homeLoading = () => {
	return {
		type:LOADING_HOME
	}
}

const createHomeSuccess = (home) => {
	return {
		type:CREATE_HOME_SUCCESS,
		home:home
	}
}

const createHomeFailed = (error) => {
	return {
		type:CREATE_HOME_FAILED,
		error:error
	}
}

const getHomeSuccess = (home) => {
	return {
		type:GET_HOME_SUCCESS,
		home:home
	}
}

const getHomeFailed = (error) => {
	return {
		type:GET_HOME_FAILED,
		error:error
	}
}

const updateHomeSuccess = (home) => {
	return {
		type:UPDATE_HOME_SUCCESS,
		home:home
	}
}

const updateHomeFailed = (error) => {
	return {
		type:UPDATE_HOME_FAILED,
		error:error
	}
}