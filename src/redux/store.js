import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { animeReducer, catalogReducer, modalReducer, userReducer } from "./reducers";

const store = configureStore({
	reducer: combineReducers({
		user: userReducer,
		modal: modalReducer,
		catalog: catalogReducer,
		anime: animeReducer,
	}),
});

export default store;
