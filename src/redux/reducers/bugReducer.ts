import {
	BugActionTypes,
	FETCH_BUG_BEGIN,
	FETCH_BUG_SUCCESS,
	FETCH_BUG_ERROR,
	UPDATE_BUG_BEGIN,
	UPDATE_BUG_ERROR,
	UPDATE_BUG_SUCCESS,
} from "../types/bugTypes";
import { Bug } from "../types/bugTypes";

interface BugState {
	bug: Bug | null;
	loading: boolean;
	error: string | null;
}

const initialState: BugState = {
	bug: null,
	loading: false,
	error: null,
};

const bugReducer = (
	state: BugState = initialState,
	action: BugActionTypes
): BugState => {
	switch (action.type) {
		case FETCH_BUG_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};

		case FETCH_BUG_SUCCESS:
			return {
				...state,
				loading: false,
				bug: action.payload.bug,
			};

		case FETCH_BUG_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				bug: null,
			};

		case UPDATE_BUG_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};

		case UPDATE_BUG_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				bug: action.payload,
			};
			
		case UPDATE_BUG_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default bugReducer;
