export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SET_USER_ID = "SET_USER_ID";
export const SET_TOKEN = "SET_TOKEN";

export interface AuthState {
	isAuthenticated: boolean;
	token: string | null;
	id: string | null | undefined;
}

export interface AuthAction {
	type:
		| typeof LOGIN_SUCCESS
		| typeof LOGOUT
		| typeof SET_USER_ID
		| typeof SET_TOKEN;
	payload?: string;
}
