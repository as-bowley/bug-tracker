import {
	AuthState,
	AuthAction,
	LOGIN_SUCCESS,
	LOGOUT,
	SET_USER_ID,
} from "../types/authTypes";

const initialState: AuthState = {
	isAuthenticated: false,
	token: null,
	id: null,
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
