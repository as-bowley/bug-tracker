export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SET_USER_ID = "SET_USER_ID";
export const SET_TOKEN = "SET_TOKEN";

export const loginSuccess = (token : string) => {
	return {
		type: LOGIN_SUCCESS,
		payload: token,
	};
};

export const logout = () => {
	return {
		type: LOGOUT,
	};
};

export const setUserId = (id : string) => {
	return {
		type: SET_USER_ID,
		payload: id,
	};
}

export const setToken = (token : string) => {
	return {
		type: SET_TOKEN,
		payload: token,
	};
}
