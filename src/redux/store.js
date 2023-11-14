import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { animeReducer, catalogReducer, modalReducer, userReducer, yourAnimeReducer } from "./reducers";

const store = configureStore({
	reducer: combineReducers({
		user: userReducer,
		modal: modalReducer,
		catalog: catalogReducer,
		anime: animeReducer,
		yourAnime: yourAnimeReducer,
	}),
});

export default store;
