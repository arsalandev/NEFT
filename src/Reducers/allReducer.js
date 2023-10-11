import { GENERATE_TOAST, GET_REQUESTS, REMOVE_TOAST, REQUESTS_ERROR } from "../Actions/types";

const intitalState = {
	requests: null,
	toast: [],
};

export default function allReducer(state = intitalState, action) {
	switch (action.type) {
		case GET_REQUESTS:
			return {
				...state,
				requests: action.payload,
			};
		case GENERATE_TOAST:
			return {
				...state,
				toast: action.payload,
			};
		case REMOVE_TOAST:
			return {
				...state,
				toast: state.toast.filter((val, i) => i !== action.payload),
			};
		case REQUESTS_ERROR:
			return {
				...state,
				requests: null,
			};
		default:
			return state;
	}
}
