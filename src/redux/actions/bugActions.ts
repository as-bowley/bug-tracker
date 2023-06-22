export const CREATE_BUG = "CREATE_BUG";

export interface BugData {
	title: string;
	description: string;
	priority: string;
}

export const createBug = (bugData: BugData) => {
	return {
		type: CREATE_BUG,
		payload: bugData,
	};
};
