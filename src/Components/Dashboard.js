import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { generateToast } from "../Actions/allActions";

const Dashboard = ({ auth: { authResponse }, error: { msg, status }, generateToast }) => {
	return (
		<>
			{authResponse ? (
				<Fragment>
					<div className="d-flex align-items-center justify-content-between">
						<h3>Dashboard</h3>
						<p className="mb-0">{authResponse ? authResponse.AccountId : ""}</p>
					</div>
					<Row>
						<Col md={4}>
							<NavLink to="/requests">
								<div className="dashboard-card">
									<div className="card-head">
										<p>Requests</p>
										<span className="up">
											<i className="fa-regular fa-arrow-up-right"></i>
											+1 %
										</span>
									</div>
									<div className="card-body">
										<h5 className="mb-0">{authResponse ? authResponse.Requests : "-"}</h5>
										<div className="icon">
											<i className="fa-regular fa-hand-point-up"></i>
										</div>
									</div>
								</div>
							</NavLink>
						</Col>
						<Col md={4}>
							<a href="assigned-tasks.html">
								<div className="dashboard-card">
									<div className="card-head">
										<p>Assigned Tasks</p>
										<span className="up">
											<i className="fa-regular fa-arrow-up-right"></i>
											+2 %
										</span>
									</div>
									<div className="card-body">
										<h5 className="mb-0">{authResponse ? authResponse.Tasks : "-"}</h5>
										<div className="icon">
											<i className="fa-regular fa-clipboard-list"></i>
										</div>
									</div>
								</div>
							</a>
						</Col>
						<Col md={4}>
							<a href="internal-tasks.html">
								<div className="dashboard-card">
									<div className="card-head">
										<p>Internal Tasks</p>
										<span className="down">
											<i className="fa-regular fa-arrow-down-right"></i>
											-3 %
										</span>
									</div>
									<div className="card-body">
										<h5 className="mb-0">{authResponse ? authResponse.InternalTasks : "-"}</h5>
										<div className="icon">
											<i className="fa-regular fa-clipboard-list"></i>
										</div>
									</div>
								</div>
							</a>
						</Col>
						<Col md={3}>
							<NavLink to="/events-request">
								<div className="dashboard-card card-2">
									<div className="card-body">
										<div className="icon">
											<i className="fa-regular fa-file-lines"></i>
										</div>
										<p>Events Request Form</p>
									</div>
								</div>
							</NavLink>
						</Col>
						<Col md={3}>
							<a href="content.html">
								<div className="dashboard-card card-2">
									<div className="card-body">
										<div className="icon">
											<i className="fa-regular fa-folder"></i>
										</div>
										<p>Content</p>
									</div>
								</div>
							</a>
						</Col>
						<Col md={3}>
							<a href="reports.html">
								<div className="dashboard-card card-2">
									<div className="card-body">
										<div className="icon">
											<i className="fa-regular fa-chart-pie"></i>
										</div>
										<p>Reports</p>
									</div>
								</div>
							</a>
						</Col>
						<Col md={3}>
							<a href="pos.html">
								<div className="dashboard-card card-2">
									<div className="card-body">
										<div className="icon">
											<i className="fa-regular fa-cart-shopping"></i>
										</div>
										<p>POS</p>
									</div>
								</div>
							</a>
						</Col>
						<Col md={4}>
							<a href="experiences.html">
								<div className="dashboard-card card-2">
									<div className="card-body">
										<div className="icon">
											<i className="fa-regular fa-clipboard-list-check"></i>
										</div>
										<p>Experiences</p>
									</div>
								</div>
							</a>
						</Col>
						<Col md={4}>
							<a href="matrices.html">
								<div className="dashboard-card card-2">
									<div className="card-body">
										<div className="icon">
											<i className="fa-regular fa-grid"></i>
										</div>
										<p>Matrices</p>
									</div>
								</div>
							</a>
						</Col>
						<Col md={4}>
							<a href="messages.html">
								<div className="dashboard-card card-2">
									<div className="card-body">
										<div className="icon">
											<i className="fa-regular fa-envelope"></i>
										</div>
										<p>Messages</p>
									</div>
								</div>
							</a>
						</Col>
					</Row>
				</Fragment>
			) : (
				<div className="loader-container">
					<div className="loader">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	error: state.error,
	auth: state.auth,
});

export default connect(mapStateToProps, { generateToast })(Dashboard);
