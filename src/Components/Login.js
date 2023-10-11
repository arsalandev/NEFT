import { useEffect } from "react";

import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { instance } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const handleSignIn = async () => {
		await instance.initialize();
		instance.loginRedirect();
	};
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			if (localStorage.getItem("MsalInstance")) {
				navigate("/dashboard");
			} else {
				// setTimeout(() => {
					handleSignIn();
				// }, 1000);
			}	
		}, 2000);

		
	});

	return (
		<>
			<div className="loader-container with-login">
					<div className="loader">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			{/* <button className="btn btn-success" onClick={handleSignIn}>
				Sign In
			</button> */}
		</>
	);
};

export default Login;
