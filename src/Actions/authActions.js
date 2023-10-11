import axios from "axios";
import { returnErrors } from "./errorActions";

import {
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	API_ENDPOINT,
	PROFILE_IMAGE,
	GET_MESSAGES,
	GET_SECURITY,
	GET_PERMISSIONS,
	GET_TOOLMATRIX,
} from "./types";
import { generateToast } from "./allActions";

export const loggedUser = (msalToken) => async (dispatch, getState) => {
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};
	const MsalToken = {
		Token: msalToken,
		//User: "Codex@neftbrands.com",
	};
	if (msalToken) {
		try {
			const resp = await axios.post(API_ENDPOINT + `api/v/1/authenticated`, MsalToken, config);
			if (resp.status === 200) {
				localStorage.setItem("token", resp.data.Token);
				dispatch({
					type: LOGIN_SUCCESS,
					payload: resp.data,
				});
				return true;
			}
			return false;
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
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
	}
};

export const logout = (msalInstance) => {
	msalInstance.logoutRedirect({
		postLogoutRedirectUri: "/",
	});
	return {
		type: LOGOUT_SUCCESS,
	};
};

export const getImage = (msalToken) => async (dispatch) => {
	let access_token = JSON.parse(msalToken);
	const config = {
		headers: {
			Authorization: `Bearer ${access_token.accessToken}`,
		},
		responseType: "blob",
	};
	if (access_token) {
		try {
			const resp = await axios.get("https://graph.microsoft.com/v1.0/me/photo/$value", config);
			if (resp.status === 200) {
				const url = window.URL || window.webkitURL;
				const blobUrl = url.createObjectURL(resp.data);
				dispatch({
					type: PROFILE_IMAGE,
					payload: blobUrl,
				});
				return true;
			}
			return false;
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
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
	}
};

export const getMessages = (token) => async (dispatch) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const body = {
		callersilo: 10000049,
		callerregion: 10000001,
		messagesilo: 10000049,
	};
	try {
		const resp = await axios.post(API_ENDPOINT + "api/v/1/requestmessages", body, config);
		if (resp.status === 200) {
			dispatch({
				type: GET_MESSAGES,
				payload: resp.data,
			});
			return true;
		}
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
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

export const getSecurity = (token) => async (dispatch) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const body = {
		callersilo: 10000049,
		callerregion: 10000001,
		securitygroup: "496d3e23-5762-4d48-b53f-61156a98d3c7",
	};
	try {
		const resp = await axios.post(API_ENDPOINT + "api/v/1/silosecuritygroup", body, config);
		if (resp.status === 200) {
			dispatch({
				type: GET_SECURITY,
				payload: resp.data,
			});
			return true;
		}
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
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

export const getPermissions = (token) => async (dispatch) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const body = {
		callersilo: 10000049,
		callerregion: 10000001,
		permissiongroup: "dc6ae85e-75a0-471c-96b7-70dbd4f3be40",
	};
	try {
		const resp = await axios.post(API_ENDPOINT + "api/v/1/permissionsgroup", body, config);
		if (resp.status === 200) {
			dispatch({
				type: GET_PERMISSIONS,
				payload: resp.data,
			});
			return true;
		}
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
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

export const getToolMatrix = (token) => async (dispatch) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const body = {
		callersilo: 10000049,
		callerregion: 10000001,
	};
	try {
		const resp = await axios.post(API_ENDPOINT + "api/v/1/toolmatrix", body, config);
		if (resp.status === 200) {
			dispatch({
				type: GET_TOOLMATRIX,
				payload: resp.data,
			});
			return true;
		}
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
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
