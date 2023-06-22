import { createStore, combineReducers, compose } from "redux";
import authReducer from "./reducers/userReducers";

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	auth: authReducer,
});

export const store = createStore(rootReducer, composeEnhancers());
