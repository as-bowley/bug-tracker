import {
	LOGIN_SUCCESS,
	LOGOUT,
	SET_USER_ID,
	SET_TOKEN,
	AuthAction,
} from "../types/authTypes";

export const loginSuccess = (token: string): AuthAction => {
	return {
		type: LOGIN_SUCCESS,
		payload: token,
	};
};

export const logout = (): AuthAction => {
	return {
		type: LOGOUT,
	};
};

export const setUserId = (id: string): AuthAction => {
	return {
		type: SET_USER_ID,
		payload: id,
	};
};

export const setToken = (token: string): AuthAction => {
	return {
		type: SET_TOKEN,
		payload: token,
	};
};
