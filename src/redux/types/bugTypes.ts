export const CREATE_BUG_BEGIN = "CREATE_BUG_BEGIN";
export const CREATE_BUG_SUCCESS = "CREATE_BUG_SUCCESS";
export const CREATE_BUG_ERROR = "CREATE_BUG_ERROR";

export const FETCH_BUG_BEGIN = "FETCH_BUG_BEGIN";
export const FETCH_BUG_SUCCESS = "FETCH_BUG_SUCCESS";
export const FETCH_BUG_ERROR = "FETCH_BUG_ERROR";

export const UPDATE_BUG_BEGIN = "UPDATE_BUG_BEGIN";
export const UPDATE_BUG_SUCCESS = "UPDATE_BUG_SUCCESS";
export const UPDATE_BUG_ERROR = "UPDATE_BUG_ERROR";

export const FETCH_ALL_BUGS_BEGIN = "FETCH_ALL_BUGS_BEGIN";
export const FETCH_ALL_BUGS_SUCCESS = "FETCH_ALL_BUGS_SUCCESS";
export const FETCH_ALL_BUGS_ERROR = "FETCH_ALL_BUGS_ERROR";

export const DELETE_BUG_BEGIN = "DELETE_BUG_BEGIN";
export const DELETE_BUG_SUCCESS = "DELETE_BUG_SUCCESS";
export const DELETE_BUG_ERROR = "DELETE_BUG_ERROR";

export interface Bug {
	_id: string;
	title: string;
	description: string;
	product: string;
	priority: string;
	status: string;
	createdBy: { _id: string; username: string; displayName: string };
	createdAt: string;
	updatedAt: string;
}

export interface BugState {
	bug: Bug | null;
	loading: boolean;
	error: string | null;
	bugs: Bug[];
}

interface CreateBugBeginAction {
	type: typeof CREATE_BUG_BEGIN;
}

interface CreateBugSuccessAction {
	type: typeof CREATE_BUG_SUCCESS;
	payload: Bug;
}

interface CreateBugErrorAction {
	type: typeof CREATE_BUG_ERROR;
	payload: string;
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

interface FetchAllBugsBeginAction {
	type: typeof FETCH_ALL_BUGS_BEGIN;
	payload: Bug[];
}

interface FetchAllBugsSuccessAction {
	type: typeof FETCH_ALL_BUGS_SUCCESS;
	payload: Bug[];
}

interface FetchAllBugsErrorAction {
	type: typeof FETCH_ALL_BUGS_ERROR;
	payload: string;
}

interface DeleteBugBeginAction {
	type: typeof DELETE_BUG_BEGIN;
}

interface DeleteBugSuccessAction {
	type: typeof DELETE_BUG_SUCCESS;
	payload: Bug[];
}

interface DeleteBugErrorAction {
	type: typeof DELETE_BUG_ERROR;
	payload: string;
}

export type BugActionTypes =
	| CreateBugBeginAction
	| CreateBugSuccessAction
	| CreateBugErrorAction
	| FetchBugBeginAction
	| FetchBugSuccessAction
	| FetchBugErrorAction
	| UpdateBugBeginAction
	| UpdateBugSuccessAction
	| UpdateBugErrorAction
	| FetchAllBugsBeginAction
	| FetchAllBugsSuccessAction
	| FetchAllBugsErrorAction
	| DeleteBugBeginAction
	| DeleteBugSuccessAction
	| DeleteBugErrorAction;
