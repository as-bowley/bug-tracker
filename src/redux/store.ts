import { combineReducers, createStore } from "redux";
import authReducer from "./reducers/userReducers";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	auth: authReducer,
});

export const store = createStore(rootReducer);
