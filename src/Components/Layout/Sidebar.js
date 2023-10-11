import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "../../logo.png";

const Sidebar = () => {
	const [formsDropdown, setFormsDropdown] = useState(false);
	const location = useLocation();
	useEffect(() => {
		if (location.pathname.includes("/events-request")) {
			setFormsDropdown(true);
		}
	}, [location.pathname]);
	return (
		<Fragment>
			<div className="side-nav">
				<div className="side-logo p-4 text-center">
					<img src={Logo} alt="logo" width="80" />
				</div>
				<div className="side-content">
					<div className="nav-title">Application</div>
					<ul>
						<li>
							<NavLink to="/dashboard" className={location.pathname.includes("/dashboard") ? "active" : ""}>
								<i className="fa-regular fa-table-columns"></i>
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li className="dropdown">
							<button
								className={`btn btn-link d-flex align-items-center justify-content-between ${formsDropdown ? "" : "collapsed"} ${
									location.pathname.includes("/events-request") ? "active" : ""
								}`}
								onClick={() => setFormsDropdown(!formsDropdown)}
							>
								<div className="d-flex align-items-center">
									<i className="fa-regular fa-file-lines mb-0"></i>
									<span>Forms</span>
								</div>
								<i className="fa-solid fa-angle-down mt-1 me-0"></i>
							</button>
							<Collapse in={formsDropdown}>
								<div className="nav-dropdown">
									<div className="nav-title">Available Forms</div>
									<ul>
										<li>
											<NavLink to="/events-request" className={location.pathname.includes("/events-request") ? "active" : ""}>
												<span>Events Request</span>
											</NavLink>
										</li>
									</ul>
								</div>
							</Collapse>
						</li>
						<li>
							<NavLink to="/">
								<i className="fa-regular fa-folder"></i>
								<span>Content</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/">
								<i className="fa-regular fa-chart-pie"></i>
								<span>Reports</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/">
								<i className="fa-regular fa-cart-shopping"></i>
								<span>POS</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/">
								<i className="fa-regular fa-clipboard-list-check"></i>
								<span>Experiences</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/">
								<i className="fa-regular fa-grid"></i>
								<span>Matrices</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/">
								<i className="fa-regular fa-envelope"></i>
								<span>Messages</span>
							</NavLink>
						</li>
					</ul>
					<div className="nav-title">Feedback</div>
					<ul>
						<li>
							<NavLink to="/">
								<i className="fa-regular fa-message"></i>
								<span>Site Feedback</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	error: state.error,
	auth: state.auth,
});

export default connect(mapStateToProps)(Sidebar);
