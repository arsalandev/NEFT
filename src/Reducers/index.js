import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import allReducer from "./allReducer";

export default combineReducers({
	auth: authReducer,
	error: errorReducer,
	all: allReducer,
});
