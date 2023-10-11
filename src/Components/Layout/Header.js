import React, { useState } from "react";
import { logout } from "../../Actions/authActions";
import { connect } from "react-redux";

import UserAvatar from "../../user.png";
import { useMsal } from "@azure/msal-react";

const Header = ({ logout, auth: { authResponse, profileImage, messages }, sidebarToggled, setSidebarToggled }) => {
	const [userDropdown, setUserDropdown] = useState(false);
	const [notificationsDropdown, setNotificationsDropdown] = useState(false);

	const toggleMenuSidebar = () => {
		setSidebarToggled(!sidebarToggled);
	};

	const { instance } = useMsal();

	return (
		<header className="header">
			<div className="header-wrapper">
				<div className="header-start">
					<span className="header-action-btn menu-toggle" onClick={toggleMenuSidebar}>
						<i className={`fa-regular ${!sidebarToggled ? "fa-bars-sort" : "fa-bars"}`}></i>
					</span>
				</div>
				<div className="header-end">
					<div className="dropdown">
						<div
							className="header-action-btn notifications"
							onClick={() => {
								setNotificationsDropdown(!notificationsDropdown);
								setUserDropdown(false);
							}}
						>
							<i className="fa-regular fa-bell fs-5"></i>
							<span>{messages ? messages.Data.length : 0}</span>
						</div>
						<ul className={`dropdown-menu animate slideIn notification-dropdown ${notificationsDropdown ? "show" : ""}`}>
							<li className="heading">Notifications</li>
							{messages ? (
								messages.Data.length > 0 ? (
									messages.Data.map((i) => (
										<li key={i}>
											<span className="dot"></span>
											<div className="message">
												<span>
													<b>{i.ErrorData}</b>
												</span>
												<small className="text-body-secondary">{i.ErrorNumber}</small>
											</div>
										</li>
									))
								) : (
									<li>No Notifications</li>
								)
							) : (
								<li>No Notifications</li>
							)}
						</ul>
					</div>
					<div className="dropdown">
						<div
							className="header-action-btn user"
							onClick={() => {
								setUserDropdown(!userDropdown);
								setNotificationsDropdown(false);
							}}
						>
							<img src={profileImage ? profileImage : UserAvatar} alt="user" />
							{authResponse ? authResponse.AccountName : ""}
						</div>
						<ul className={`dropdown-menu animate slideIn ${userDropdown ? "show" : ""}`}>
							<li className="dropdown-item">
								<button className="btn btn-link" onClick={() => logout(instance)}>
									<i className="fa-solid fa-right-from-bracket text-body-secondary pe-1"></i>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

const mapStateToProps = (state) => ({
	error: state.error,
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
