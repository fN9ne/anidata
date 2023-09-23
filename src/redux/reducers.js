/* user reducer */

const userInitialState = {
	authorized: false,
	username: null,
	content: [],
};

const AUTHORIZE_USER = "AUTHORIZE_USER";
const THROW_USER = "THROW_USER";

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case AUTHORIZE_USER:
			localStorage.setItem("user", JSON.stringify({ username: action.payload.username, content: action.payload.content }));
			return {
				authorized: true,
				username: action.payload.username,
				content: action.payload.content,
			};
		case THROW_USER:
			localStorage.removeItem("user");
			return userInitialState;
		default:
			return state;
	}
};

export const authorizeUserAction = (payload) => ({ type: AUTHORIZE_USER, payload });
export const throwUserAction = () => ({ type: THROW_USER });

/* modal reducer */

const modalInitialState = {
	logoutActive: false,
};

const TOGGLE_LOGOUT_MODAL = "TOGGLE_LOGOUT_MODAL";
const CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS";

export const modalReducer = (state = modalInitialState, action) => {
	switch (action.type) {
		case TOGGLE_LOGOUT_MODAL:
			return {
				...state,
				logoutActive: action.payload,
			};
		case CLOSE_ALL_MODALS:
			return modalInitialState;
		default:
			return state;
	}
};

export const toggleLogoutModalAction = (payload) => ({ type: TOGGLE_LOGOUT_MODAL, payload });
export const closeAllModalsAction = () => ({ type: CLOSE_ALL_MODALS });
