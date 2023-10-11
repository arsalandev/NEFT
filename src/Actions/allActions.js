import axios from "axios";
import { returnErrors } from "./errorActions";
import { GET_REQUESTS, REQUESTS_ERROR, API_ENDPOINT, GENERATE_TOAST, REMOVE_TOAST } from "./types";

let toast_body = [];

export const generateToast = (type, text) => (dispatch) => {
	toast_body.push({
		type: type,
		text: text,
	});
	dispatch({
		type: GENERATE_TOAST,
		payload: toast_body,
	});
	return true;
};

export const removeToast = (toast) => (dispatch) => {
	toast_body = toast_body.filter((val, i) => i !== toast);
	dispatch({
		type: REMOVE_TOAST,
		payload: toast,
	});
	return true;
};

export const getRequests = (token) => async (dispatch) => {
	const body = {
		callersilo: 10000049,
		callerregion: 10000001,
	};
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const resp = await axios.post(API_ENDPOINT + "api/v/1/requestlist", body, config);
		if (resp.status === 200) {
			dispatch({
				type: GET_REQUESTS,
				payload: resp.data,
			});
			return true;
		}
	} catch (err) {
		dispatch({
			type: REQUESTS_ERROR,
		});
		if (!err.response) {
			dispatch(returnErrors("Network Error", 502, "NETWORK_ERROR"));
		} else if (err.response.status === 401) {
			dispatch(generateToast("fail", "Unauthorized"));
		} else {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch(generateToast("fail", err.response.data.Status));
		}

		return false;
	}
};
