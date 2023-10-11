import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { connect } from "react-redux";
import { getRequests } from "../../Actions/allActions";

const Requests = ({ getRequests, all: requests }) => {
	const [products, setProducts] = useState([]);

	// let Products = [
	// 	{
	// 		id: "10001",
	// 		title: "French & Famous",
	// 		description: "French & Famous Event",
	// 		category: "Events",
	// 		type: "Event: Standup: All Relevant Silos",
	// 		status: "Request: PreSubmit",
	// 	},
	// ];

	useEffect(() => {
		getRequests(localStorage.getItem("token"));
	}, [getRequests]);

	useEffect(() => {
		let requests_data = requests.requests;
		if (requests_data) {
			setProducts(requests_data.Data);
		}
	}, [requests]);

	return (
		<div className="widget">
			<div className="widget-head">Requests</div>
			<div className="widget-body">
				<DataTable
					value={products}
					showGridlines
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 25, 50]}
					//paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
				>
					<Column field="RequestTaskPermId" header="ID"></Column>
					<Column field="RequestTitle" header="Title"></Column>
					<Column field="RequestDescription" header="Description"></Column>
					<Column field="RequestTypeCategoryDescriptionLong" header="Category"></Column>
					<Column field="RequestTypeDescriptionLong" header="Type"></Column>
					<Column field="RequestStatusDescriptionLong" header="Status"></Column>
				</DataTable>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	error: state.error,
	all: state.all,
});

export default connect(mapStateToProps, { getRequests })(Requests);
