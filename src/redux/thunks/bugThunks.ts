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
} from "../actions/bugActions";
import { AnyAction } from "redux";
import { AppThunk } from "../store";

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
