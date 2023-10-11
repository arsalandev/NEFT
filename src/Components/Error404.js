import React from "react";
import {} from "react-bootstrap";

import { useMsal } from "@azure/msal-react";

const Error404 = () => {
	const { instance } = useMsal();
	const handleSignout = () => {
		instance.logoutRedirect();
		localStorage.removeItem("MsalToken");
	};
	return (
		<div className="error404">
			<button className="btn btn-danger" onClick={handleSignout}>
				Sign Out
			</button>
			<img src="404.png" alt="error404" className="img-fluid" width="400" />
			<h1 className="mt-5 display-3">Page not found!</h1>
		</div>
	);
};

export default Error404;
