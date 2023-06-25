import {
	Bug,
	FETCH_BUG_BEGIN,
	FETCH_BUG_SUCCESS,
	FETCH_BUG_ERROR,
	BugActionTypes,
	UPDATE_BUG_BEGIN,
	UPDATE_BUG_ERROR,
	UPDATE_BUG_SUCCESS,
	FETCH_ALL_BUGS_SUCCESS,
	CREATE_BUG_SUCCESS,
	CREATE_BUG_ERROR,
	CREATE_BUG_BEGIN,
} from "../types/bugTypes";

export interface BugData {
	title: string;
	description: string;
	priority: string;
	error: string;
}

export const createBugBegin = (): BugActionTypes => ({ type:CREATE_BUG_BEGIN });

export const createBugSuccess = (bug: Bug): BugActionTypes => ({
	type: CREATE_BUG_SUCCESS,
	payload: { bug },
});

export const createBugError = (error: string): BugActionTypes => ({
	type: CREATE_BUG_ERROR,
	payload: { error },
});

export const fetchBugBegin = (): BugActionTypes => ({ type: FETCH_BUG_BEGIN });

export const fetchBugSuccess = (bug: Bug): BugActionTypes => ({
	type: FETCH_BUG_SUCCESS,
	payload: { bug },
});
export const fetchBugError = (error: string): BugActionTypes => ({
	type: FETCH_BUG_ERROR,
	payload: { error },
});

export const updateBugBegin = () => ({
	type: UPDATE_BUG_BEGIN,
});

export const updateBugSuccess = (bug: Bug) => ({
	type: UPDATE_BUG_SUCCESS,
	payload: bug,
});

export const updateBugError = (error: string) => ({
	type: UPDATE_BUG_ERROR,
	payload: error,
});

export const fetchAllBugsBegin = () => ({
	type: FETCH_BUG_BEGIN,
});

export const fetchAllBugsSuccess = (bugs: Bug[]): BugActionTypes => ({
	type: FETCH_ALL_BUGS_SUCCESS,
	payload: bugs,
});


export const fetchAllBugsError = (error: string) => ({
	type: FETCH_BUG_ERROR,
	payload: error,
});

