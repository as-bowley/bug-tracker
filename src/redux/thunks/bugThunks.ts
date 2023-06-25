import { ThunkAction } from "redux-thunk";
import { RootState } from "../types";
import { Bug } from "../types/bugTypes";
import {
	fetchBugBegin,
	fetchBugSuccess,
	fetchBugError,
	updateBugBegin,
	updateBugError,
	updateBugSuccess,
	BugData,
	createBugBegin,
	createBugError,
	createBugSuccess,
	fetchAllBugsBegin,
	fetchAllBugsError,
	fetchAllBugsSuccess,
	deleteBugSuccess,
	deleteBugBegin,
	deleteBugError,
} from "../actions/bugActions";
import { AnyAction } from "redux";
import { AppThunk } from "../store";

export const createBug = (
	bugData: BugData,
	token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		dispatch(createBugBegin());

		try {
			const response = await fetch("http://localhost:3000/bugs/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(bugData),
			});

			if (response.ok) {
				const bug: Bug = await response.json();
				dispatch(createBugSuccess(bug));
			} else {
				throw new Error("Error creating bug");
			}
		} catch (error) {
			if (error instanceof Error) {
				dispatch(createBugError(error.message));
			} else {
				dispatch(createBugError("An unknown error occurred"));
			}
		}
	};
};

export const fetchBugDetails = (
	id: string | undefined,
	token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		dispatch(fetchBugBegin());

		try {
			const response = await fetch(`http://localhost:3000/bugs/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const bugData: Bug = await response.json();
				dispatch(fetchBugSuccess(bugData));
			} else {
				throw new Error("Error fetching bug details");
			}
		} catch (error) {
			if (error instanceof Error) {
				dispatch(fetchBugError(error.message));
			} else {
				dispatch(fetchBugError("An unknown error occurred"));
			}
		}
	};
};

export const updateBug = (
	id: string | undefined,
	token: string,
	updatedBug: Bug
): AppThunk => {
	return async (dispatch) => {
		dispatch(updateBugBegin());

		try {
			const response = await fetch(`http://localhost:3000/bugs/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedBug),
			});

			if (response.ok) {
				const bugData: Bug = await response.json();
				dispatch(updateBugSuccess(bugData));

				const updatedResponse = await fetch(
					`http://localhost:3000/bugs/${id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (updatedResponse.ok) {
					const updatedBugData: Bug = await updatedResponse.json();
					dispatch(fetchBugSuccess(updatedBugData));
				} else {
					throw new Error("Error fetching updated bug details");
				}
			} else {
				throw new Error("Error updating bug");
			}
		} catch (error) {
			if (error instanceof Error) {
				dispatch(updateBugError(error.message));
			} else {
				dispatch(updateBugError("An unknown error occurred"));
			}
		}
	};
};

export const fetchAllBugs = (
	token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		dispatch(fetchAllBugsBegin());

		try {
			const response = await fetch("http://localhost:3000/bugs/all", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const bugs: Bug[] = await response.json();
				dispatch(fetchAllBugsSuccess(bugs));
			} else {
				throw new Error("Error fetching all bugs");
			}
		} catch (error) {
			if (error instanceof Error) {
				dispatch(fetchAllBugsError(error.message));
			} else {
				dispatch(fetchAllBugsError("An unknown error occurred"));
			}
		}
	};
};

export const deleteBug = (
	id: string | undefined,
	token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		dispatch(deleteBugBegin());

		try {
			const response = await fetch(`http://localhost:3000/bugs/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				dispatch(deleteBugSuccess(id));
			} else {
				throw new Error("Error deleting bug");
			}
		} catch (error) {
			if (error instanceof Error) {
				dispatch(deleteBugError(error.message));
			} else {
				dispatch(deleteBugError("An unknown error occurred"));
			}
		}
	};
};
