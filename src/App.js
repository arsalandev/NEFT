import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Sidebar from "./Components/Layout/Sidebar";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./Components/PrivateRoute";
import Requests from "./Components/Pages/Requests";
import EventsRequest from "./Components/Pages/EventsRequest";

import { getImage, getMessages, getPermissions, getSecurity, getToolMatrix, loggedUser } from "./Actions/authActions";

import "./styles.scss";

import { MsalProvider } from "@azure/msal-react";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import Toast from "./Components/Toast";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { logout } from "./Actions/authActions";

function App() {
	const [sidebarToggled, setSidebarToggled] = useState(false);
	const [eventPayload, setEventPayload] = useState(null);
	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(false);
		store.dispatch(logout(pca));
	};
	const handleShow = () => setShow(true);

	const pca = new PublicClientApplication({
		auth: {
			clientId: "6465bc0f-1b38-49c8-bd21-fa02ad4d71cb",
			authority: "https://login.microsoftonline.com/02df268f-289f-48e4-9daf-2d839cc96a8e",
			redirectUri: "/",
		},
	});
	pca.addEventCallback((event) => {
		if (event.eventType === EventType.LOGIN_SUCCESS) {
			localStorage.setItem("MsalInstance", JSON.stringify(event.payload));
			setEventPayload(event.payload);
		}
	});

	useEffect(() => {
		let msal_instance = localStorage.getItem("MsalInstance");
		//console.log(eventPayload);
		if (msal_instance) {
			store.dispatch(loggedUser(msal_instance));
			store.dispatch(getImage(msal_instance));
			setTimeout(() => {
				store.dispatch(getMessages(localStorage.getItem("token")));
				store.dispatch(getSecurity(localStorage.getItem("token")));
				store.dispatch(getPermissions(localStorage.getItem("token")));
				store.dispatch(getToolMatrix(localStorage.getItem("token")));
				let token = localStorage.getItem("token");
				if (token != null) {
					const decode = JSON.parse(atob(token.split(".")[1]));
					// console.log(decode);
					if (decode.exp * 1000 < new Date().getTime()) {
						handleShow();
					} else {
						console.log("Still Valid");
					}
				}
			}, 1000);
		}
	}, [eventPayload]);

	const PostLogin = () => (
		<>
			<Toast />
			<div className={`main-layout ${sidebarToggled ? "toggled" : ""}`}>
				<div className="layout-container">
					<Sidebar />
					<div className="main-content">
						<Header sidebarToggled={sidebarToggled} setSidebarToggled={setSidebarToggled} />
						<div className="content-body">
							<div className="page-container">
								<Routes>
									<Route element={<PrivateRoute />}>
										<Route path="/dashboard" element={<Dashboard />} />
										<Route path="/requests" element={<Requests />} />
										<Route path="/events-request" element={<EventsRequest />} />
									</Route>
								</Routes>
								<Footer />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal show={show} centered onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Token Expired</Modal.Title>
				</Modal.Header>
				<Modal.Body>Please Logout This Session</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Logout
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);

	return (
		<MsalProvider instance={pca}>
			<Provider store={store}>
				<Router>
					<Routes>
						<Route exact path="/" element={<Login />} />
						<Route path="/*" element={<PostLogin />} />
					</Routes>
				</Router>
			</Provider>
		</MsalProvider>
	);
}

export default App;
