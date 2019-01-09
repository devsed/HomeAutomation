export const LOADING_HOME = "LOADING_HOME";
export const CREATE_HOME_SUCCESS = "CREATE_HOME_SUCCESS";
export const CREATE_HOME_FAILED = "CREATE_HOME_FAILED";
export const GET_HOME_SUCCESS = "GET_HOME_SUCCESS";
export const GET_HOME_FAILED = "GET_HOME_FAILED";

export const GET_HOMES_SUCCESS = "GET_HOMES_SUCCESS";
export const GET_HOMES_FAILED = "GET_HOMES_FAILED";
export const HOMES_LOADING = "HOMES_LOADING";

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

		dispatch(homeLoading());

		fetch("/api/homes", postObject).then((resp) => {
			if (resp.ok) {
				resp.json().then(() => {
					dispatch(createHomeSuccess());
				}).catch((error) => {
					dispatch(createHomeFailed("Problem creating home"));
				})
			} else {
				dispatch(createHomeFailed("A home has already created: "+resp.status));
			}
		}).catch((error) => {
			dispatch(createHomeFailed("Server responded with error"));
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

		fetch("/api/homes/"+id, getObject).then((resp) => {
			if (resp.ok) {
				resp.json().then((data) => {
					dispatch(getHomeSuccess(data));
				}).catch((error) => {
					dispatch(getHomeFailed("Problem loading home with rooms"));
				})
			} else {
				dispatch(getHomeFailed("Response not ok. Status: "+resp.status));
			}

		}).catch((error) => {
			dispatch(getHomeFailed("Problem loading home with rooms"));
		});
	}
}

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

	// Action creators

const homeLoading = () => {
	return {
		type:LOADING_HOME
	}
}

const createHomeSuccess = () => {
	return {
		type:CREATE_HOME_SUCCESS
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