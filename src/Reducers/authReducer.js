import { GET_MESSAGES, GET_PERMISSIONS, GET_SECURITY, GET_TOOLMATRIX, LOGIN_SUCCESS, LOGOUT_SUCCESS, PROFILE_IMAGE } from "../Actions/types";

const intitalState = {
	authResponse: null,
	profileImage: null,
	messages: null,
	security: null,
	permissions: null,
	toolmatrix: null,
};

export default function authReducer(state = intitalState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				authResponse: action.payload,
			};
		case PROFILE_IMAGE:
			return {
				...state,
				profileImage: action.payload,
			};
		case GET_MESSAGES:
			return {
				...state,
				messages: action.payload,
			};
		case GET_SECURITY:
			return {
				...state,
				security: action.payload,
			};
		case GET_PERMISSIONS:
			return {
				...state,
				permissions: action.payload,
			};
		case GET_TOOLMATRIX:
			return {
				...state,
				toolmatrix: action.payload,
			};
		case LOGOUT_SUCCESS:
			localStorage.clear();
			return {
				...state,
				authResponse: null,
				profileImage: null,
				messages: null,
				security: null,
				permissions: null,
				toolmatrix: null,
			};
		default:
			return state;
	}
}
