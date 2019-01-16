import { getRooms } from '../actions/RoomActions';

export const LOADING_HOME = "LOADING_HOME";
export const CREATE_HOME_SUCCESS = "CREATE_HOME_SUCCESS";
export const CREATE_HOME_FAILED = "CREATE_HOME_FAILED";
export const GET_HOME_SUCCESS = "GET_HOME_SUCCESS";
export const GET_HOME_FAILED = "GET_HOME_FAILED";

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
				resp.json().then((data) => {
					dispatch(createHomeSuccess(data));
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

export const getHome = (id, rooms) => {
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
					if(rooms){
						dispatch(getRooms(data._id))
					}
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