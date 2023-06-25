import {
	Action,
	applyMiddleware,
	createStore,
	combineReducers,
} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import bugReducer from "./reducers/bugReducer";
import { RootState } from "./types";

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

const rootReducer = combineReducers({
	auth: authReducer,
	bug: bugReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
