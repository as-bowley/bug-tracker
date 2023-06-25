import {
	Bug,
	FETCH_BUG_BEGIN,
	FETCH_BUG_SUCCESS,
	FETCH_BUG_ERROR,
	BugActionTypes,
	UPDATE_BUG_BEGIN,
	UPDATE_BUG_ERROR,
	UPDATE_BUG_SUCCESS,
} from "../types/bugTypes";

export const fetchBugBegin = (): BugActionTypes => ({ type: FETCH_BUG_BEGIN });
export const fetchBugSuccess = (bug: Bug): BugActionTypes => ({
	type: FETCH_BUG_SUCCESS,
	payload: { bug },
});
export const fetchBugError = (error: string): BugActionTypes => ({
	type: FETCH_BUG_ERROR,
	payload: { error },
});

export interface BugData {
	title: string;
	description: string;
	priority: string;
	error: string;
}

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

