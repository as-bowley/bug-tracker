export const FETCH_BUG_BEGIN = "FETCH_BUG_BEGIN";
export const FETCH_BUG_SUCCESS = "FETCH_BUG_SUCCESS";
export const FETCH_BUG_ERROR = "FETCH_BUG_ERROR";

export const UPDATE_BUG_BEGIN = "UPDATE_BUG_BEGIN";
export const UPDATE_BUG_SUCCESS = "UPDATE_BUG_SUCCESS";
export const UPDATE_BUG_ERROR = "UPDATE_BUG_ERROR";

export interface Bug {
	id: string;
	title: string;
	description: string;
	product: string;
	priority: string;
	status: string;
	createdBy: { id: number; username: string; displayName: string };
	createdAt: string;
	updatedAt: string;
}

export interface BugState {
	bug: Bug | null;
	loading: boolean;
	error: string | null;
}

interface FetchBugBeginAction {
	type: typeof FETCH_BUG_BEGIN;
}

interface FetchBugSuccessAction {
	type: typeof FETCH_BUG_SUCCESS;
	payload: { bug: Bug };
}

interface FetchBugErrorAction {
	type: typeof FETCH_BUG_ERROR;
	payload: { error: string };
}

interface UpdateBugBeginAction {
	type: typeof UPDATE_BUG_BEGIN;
}

interface UpdateBugSuccessAction {
	type: typeof UPDATE_BUG_SUCCESS;
	payload: Bug;
}

interface UpdateBugErrorAction {
	type: typeof UPDATE_BUG_ERROR;
	payload: string;
}

export type BugActionTypes =
	| FetchBugBeginAction
	| FetchBugSuccessAction
	| FetchBugErrorAction
	| UpdateBugBeginAction
	| UpdateBugSuccessAction
	| UpdateBugErrorAction;
