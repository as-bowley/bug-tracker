import { LOGIN_SUCCESS, LOGOUT, SET_USER_ID } from "../actions/authActions";

type AuthState = {
	isAuthenticated: boolean;
	token: string | null;
	id: string | null; // User id
};

type AuthAction = {
	type: string;
	payload?: string;
};

const initialState: AuthState = {
	isAuthenticated: false,
	token: null,
	id: null, // User id
};

const authReducer = (
	state: AuthState = initialState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				token: action.payload || null,
			};
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				token: null,
				id: null, 
			};
		case SET_USER_ID:
			return { ...state, id: action.payload };
		default:
			return state;
	}
};

export default authReducer;
