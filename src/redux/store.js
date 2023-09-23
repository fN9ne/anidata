import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { modalReducer, userReducer } from "./reducers";

const store = configureStore({
	reducer: combineReducers({
		user: userReducer,
		modal: modalReducer,
	}),
});

export default store;
