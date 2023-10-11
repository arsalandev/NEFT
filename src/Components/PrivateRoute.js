import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	if (!localStorage.getItem("MsalInstance")) {
		return <Navigate to="/" />;
	}
	return children ? children : <Outlet />;
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
