import {
	BugActionTypes,
	FETCH_BUG_BEGIN,
	FETCH_BUG_SUCCESS,
	FETCH_BUG_ERROR,
	UPDATE_BUG_BEGIN,
	UPDATE_BUG_ERROR,
	UPDATE_BUG_SUCCESS,
	CREATE_BUG_BEGIN,
	CREATE_BUG_ERROR,
	CREATE_BUG_SUCCESS,
	FETCH_ALL_BUGS_BEGIN,
	FETCH_ALL_BUGS_SUCCESS,
	FETCH_ALL_BUGS_ERROR,
} from "../types/bugTypes";
import { Bug } from "../types/bugTypes";

interface BugState {
	bugs: Bug[];
	loading: boolean;
	error: string | null;
}

const initialState: BugState = {
	bugs: [],
	loading: false,
	error: null,
};

const bugReducer = (
	state: BugState = initialState,
	action: BugActionTypes
): BugState => {
	switch (action.type) {
		case CREATE_BUG_BEGIN:
		case FETCH_BUG_BEGIN:
		case UPDATE_BUG_BEGIN:
		case FETCH_ALL_BUGS_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};

		case CREATE_BUG_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				bugs: [...state.bugs, action.payload],
			};

		case CREATE_BUG_ERROR:
		case FETCH_BUG_ERROR:
		case UPDATE_BUG_ERROR:
		case FETCH_ALL_BUGS_ERROR:
			return {
				...state,
				loading: false,
				error:
					typeof action.payload === "string"
						? action.payload
						: action.payload.error,
			};

		case FETCH_BUG_SUCCESS:
			return {
				...state,
				loading: false,
				bug: action.payload.bug,
			};

		case UPDATE_BUG_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				bugs: state.bugs.map((bug) =>
					bug.id === action.payload.id ? action.payload : bug
				),
			};

		case FETCH_ALL_BUGS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				bugs: action.payload,
			};

		default:
			return state;
	}
};

export default bugReducer;
