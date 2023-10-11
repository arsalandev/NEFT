import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeToast } from "../Actions/allActions";

const Toast = ({ all: { toast }, removeToast }) => {
	const [showToast, setShowToast] = useState(null);
	const [allToasts, setAllToasts] = useState([]);
	useEffect(() => {
		setTimeout(() => {
			setShowToast(toast.length ? true : false);
		}, 1000);
	}, [toast.length]);

	useEffect(() => {
		setAllToasts(toast);
	}, [toast]);

	return (
		<div className={`toasts ${showToast ? "show" : "hide"}`}>
			{allToasts.map((i, v) => (
				<div key={v} className={`toast ${i.type === "success" ? "success" : "fail"}`}>
					<div className="toast-body">
						<div className="d-flex align-items-center justify-content-between">
							<div className="d-flex align-items-center">
								<i className={i.type === "success" ? "fa-regular fa-check-circle" : "fa-regular fa-circle-xmark"}></i>
								<h6 className="mb-0">{i.text}</h6>
							</div>
							<button className="btn-close" onClick={() => removeToast(v)}></button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	all: state.all,
});

export default connect(mapStateToProps, { removeToast })(Toast);
