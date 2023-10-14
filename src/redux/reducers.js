/* user reducer */

const userInitialState = {
	authorized: false,
	username: null,
	content: [],
	removeAnime: {},
	pending: false,
};

const AUTHORIZE_USER = "AUTHORIZE_USER";
const THROW_USER = "THROW_USER";
const SET_ANIME_TO_REMOVE = "SET_ANIME_TO_REMOVE";
const TOGGLE_ANIME = "TOGGLE_ANIME";
const TOGGLE_PENDING = "TOGGLE_PENDING";

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case AUTHORIZE_USER:
			localStorage.setItem("user", JSON.stringify({ username: action.payload.username, content: action.payload.content }));
			return {
				...state,
				authorized: true,
				username: action.payload.username,
				content: action.payload.content,
			};
		case THROW_USER:
			localStorage.removeItem("user");
			return {
				...userInitialState,
				pending: state.pending,
			};
		case SET_ANIME_TO_REMOVE:
			return {
				...state,
				removeAnime: action.payload,
			};
		case TOGGLE_ANIME:
			const newContent = state.content.includes(action.payload)
				? state.content.filter((id) => id !== action.payload)
				: [...state.content, action.payload];
			localStorage.setItem("user", JSON.stringify({ username: state.username, content: newContent }));
			return {
				...state,
				content: newContent,
			};
		case TOGGLE_PENDING:
			return {
				...state,
				pending: action.payload,
			};
		default:
			return state;
	}
};

export const authorizeUserAction = (payload) => ({ type: AUTHORIZE_USER, payload });
export const throwUserAction = () => ({ type: THROW_USER });
export const setAnimeToRemove = (payload) => ({ type: SET_ANIME_TO_REMOVE, payload });
export const toggleAnime = (payload) => ({ type: TOGGLE_ANIME, payload });
export const togglePending = (payload) => ({ type: TOGGLE_PENDING, payload });

/* modal reducer */

const modalInitialState = {
	logoutActive: false,
	removeAnimeActive: false,
};

const TOGGLE_LOGOUT_MODAL = "TOGGLE_LOGOUT_MODAL";
const TOGGLE_REMOVE_ANIME_MODAL = "TOGGLE_REMOVE_ANIME_MODAL";
const CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS";

export const modalReducer = (state = modalInitialState, action) => {
	switch (action.type) {
		case TOGGLE_LOGOUT_MODAL:
			return {
				...state,
				logoutActive: action.payload,
			};
		case TOGGLE_REMOVE_ANIME_MODAL:
			return {
				...state,
				removeAnimeActive: action.payload,
			};
		case CLOSE_ALL_MODALS:
			return modalInitialState;
		default:
			return state;
	}
};

export const toggleLogoutModalAction = (payload) => ({ type: TOGGLE_LOGOUT_MODAL, payload });
export const toggleRemoveAnimeModalAction = (payload) => ({ type: TOGGLE_REMOVE_ANIME_MODAL, payload });
export const closeAllModalsAction = () => ({ type: CLOSE_ALL_MODALS });

/* catalog reducer */

const catalogInitialState = {
	search: "",
	result: [],
	page: 1,
	maxPages: null,
	fetching: true,
	filter: {
		active: false,
		genres: {
			active: false,
			content: [],
		},
		type: {
			active: false,
			content: "",
		},
		status: {
			active: false,
			content: "",
		},
	},
};

const TOGGLE_FILTER = "TOGGLE_FILTER";
const SET_SEARCH = "SET_SEARCH";
const SET_RESULT = "SET_RESULT";
const TOGGLE_GENRE = "TOGGLE_GENRE";
const SET_STATUS = "SET_STATUS";
const SET_MAX_PAGES = "SET_MAX_PAGES";
const SET_FETCHING = "SET_FETCHING";
const CLEAR_STATE = "CLEAR_STATE";
const SET_TYPE = "SET_TYPE";
const SET_PAGE = "SET_PAGE";
const TOGGLE_GENRES_SELECTBOX = "TOGGLE_GENRES_SELECTBOX";
const TOGGLE_TYPE_SELECTBOX = "TOGGLE_TYPE_SELECTBOX";
const TOGGLE_STATUS_SELECTBOX = "TOGGLE_STATUS_SELECTBOX";
const CLOSE_SELECTBOXES = "CLOSE_SELECTBOXES";
const CLEAR_FILTER = "CLEAR_FILTER";

export const catalogReducer = (state = catalogInitialState, action) => {
	const genres = state.filter.genres.content;

	switch (action.type) {
		case TOGGLE_FILTER:
			return {
				...state,
				filter: {
					...state.filter,
					active: action.payload,
				},
			};
		case SET_SEARCH:
			return {
				...state,
				search: action.payload,
			};
		case SET_MAX_PAGES:
			return {
				...state,
				maxPages: action.payload,
			};
		case SET_RESULT:
			return {
				...state,
				result: action.payload,
			};
		case SET_PAGE:
			return {
				...state,
				page: action.payload,
			};
		case SET_FETCHING:
			return {
				...state,
				fetching: action.payload,
			};
		case TOGGLE_GENRE:
			return {
				...state,
				filter: {
					...state.filter,
					genres: {
						...state.filter.genres,
						content: !genres.includes(action.payload)
							? [...genres, action.payload]
							: genres.filter((genre) => genre !== action.payload),
					},
				},
			};
		case SET_TYPE:
			return {
				...state,
				filter: {
					...state.filter,
					type: {
						...state.filter.type,
						content: state.filter.type.content !== action.payload ? action.payload : "",
					},
				},
			};
		case SET_STATUS:
			return {
				...state,
				filter: {
					...state.filter,
					status: {
						...state.filter.status,
						content: state.filter.status.content !== action.payload ? action.payload : "",
					},
				},
			};
		case TOGGLE_GENRES_SELECTBOX:
			return {
				...state,
				filter: {
					...state.filter,
					genres: {
						...state.filter.genres,
						active: action.payload,
					},
				},
			};
		case TOGGLE_TYPE_SELECTBOX:
			return {
				...state,
				filter: {
					...state.filter,
					type: {
						...state.filter.type,
						active: action.payload,
					},
				},
			};
		case TOGGLE_STATUS_SELECTBOX:
			return {
				...state,
				filter: {
					...state.filter,
					status: {
						...state.filter.status,
						active: action.payload,
					},
				},
			};
		case CLOSE_SELECTBOXES:
			return {
				...state,
				filter: {
					...state.filter,
					genres: {
						...state.filter.genres,
						active: false,
					},
					type: {
						...state.filter.type,
						active: false,
					},
					status: {
						...state.filter.status,
						active: false,
					},
				},
			};
		case CLEAR_FILTER:
			return {
				...state,
				filter: catalogInitialState.filter,
			};
		case CLEAR_STATE:
			return catalogInitialState;
		default:
			return state;
	}
};

export const catalogActions = {
	toggleFilter: (payload) => ({ type: TOGGLE_FILTER, payload }),
	setSearch: (payload) => ({ type: SET_SEARCH, payload }),
	setResult: (payload) => ({ type: SET_RESULT, payload }),
	toggleGenre: (payload) => ({ type: TOGGLE_GENRE, payload }),
	setPage: (payload) => ({ type: SET_PAGE, payload }),
	setMaxPages: (payload) => ({ type: SET_MAX_PAGES, payload }),
	setFetching: (payload) => ({ type: SET_FETCHING, payload }),
	setStatus: (payload) => ({ type: SET_STATUS, payload }),
	setType: (payload) => ({ type: SET_TYPE, payload }),
	toggleGenresSelectbox: (payload) => ({ type: TOGGLE_GENRES_SELECTBOX, payload }),
	toggleTypeSelectbox: (payload) => ({ type: TOGGLE_TYPE_SELECTBOX, payload }),
	toggleStatusSelectbox: (payload) => ({ type: TOGGLE_STATUS_SELECTBOX, payload }),
	closeSelectboxes: () => ({ type: CLOSE_SELECTBOXES }),
	clearFilter: () => ({ type: CLEAR_FILTER }),
	clearState: () => ({ type: CLEAR_STATE }),
};

/* anime single page reducer */

const animeInitState = {
	data: {},
};

const SET_ANIME = "SET_ANIME";

export const animeReducer = (state = animeInitState, action) => {
	switch (action.type) {
		case SET_ANIME:
			return {
				...state,
				data: action.payload,
			};
		default:
			return state;
	}
};

export const setAnimeAction = (payload) => ({ type: SET_ANIME, payload });
