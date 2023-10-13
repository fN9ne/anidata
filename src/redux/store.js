import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { catalogReducer, modalReducer, userReducer } from "./reducers";

const store = configureStore({
	reducer: combineReducers({
		user: userReducer,
		modal: modalReducer,
		catalog: catalogReducer,
	}),
});

export default store;
