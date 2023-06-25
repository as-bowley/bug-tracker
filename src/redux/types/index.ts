import { CombinedState } from "redux";
import { AuthState } from "./authTypes";
import { BugState } from "./bugTypes";

export type RootState = CombinedState<{
	auth: AuthState;
	bug: BugState;
}>;
