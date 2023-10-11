import React, { useState } from "react";
import { Tabs, Tab, Form, Row, Col } from "react-bootstrap";

const EventsRequest = () => {
	const [tabChange, setTabChange] = useState("summary");
	const [activeTabs, setActiveTabs] = useState({
		summary: false,
		questions: false,
		account: false,
		address: false,
		documents: false,
		costs: false,
		nuances: false,
		postmartem: false,
	});
	const handleSelect = (key) => {
		setTabChange(key);
	};
	const tabChangeForm = (e, next, previous, current, type) => {
		e.preventDefault();
		if (type === "next") {
			setActiveTabs({
				...activeTabs,
				[current]: true,
			});
			setTabChange(next);
		} else {
			setActiveTabs({
				...activeTabs,
				[current]: false,
			});
			setTabChange(previous);
		}
	};
	return (
		<div className="widget">
			<div className="widget-head">Events Request Form</div>
			<div className="widget-body">
				<div className="step-arrow-nav">
					<Tabs activeKey={tabChange} className="mb-4 custom-nav" justify onSelect={handleSelect}>
						<Tab eventKey="summary" title="Summary" disabled tabClassName={activeTabs.summary ? "done" : ""}>
							<Form>
								<Row>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Event Region <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select defaultValue="">
											<option value="" disabled>
												Select Event Region...
											</option>
										</Form.Select>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Event Type <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select defaultValue="">
											<option value="" disabled>
												Select Event Type...
											</option>
										</Form.Select>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Event Title <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Event Description <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Start Date <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="datetime-local" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											End Date <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="datetime-local" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Expected Temperature <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Expected To Rain <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select defaultValue="">
											<option value="" disabled>
												Select Expected To Rain...
											</option>
										</Form.Select>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Bar On Site <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select defaultValue="">
											<option value="" disabled>
												Select Bar On Site...
											</option>
										</Form.Select>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Expected Audience Count <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={12} className="mb-3">
										<Form.Label>Expected Notes</Form.Label>
										<Form.Control as="textarea" rows={4} />
									</Col>
								</Row>
								<div className="d-flex align-items-start justify-content-end gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, "questions", null, "summary", "next")} className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
						<Tab eventKey="questions" title="Questions" disabled tabClassName={activeTabs.questions ? "done" : ""}>
							<Form>
								<Row>
									<Col lg={6} className="mb-3">
										<Form.Label>
											Title <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={6} className="mb-3">
										<Form.Label>
											Question 1 <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={6} className="mb-3">
										<Form.Label>
											Question 2 <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={6} className="mb-3">
										<Form.Label>
											Question 3 <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
								</Row>
								<div className="d-flex align-items-start justify-content-between gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, "account", "summary", "questions", "previous")} className="btn btn-main previous">
										<i className="fa-regular fa-arrow-left"></i> Previous
									</button>
									<button onClick={(e) => tabChangeForm(e, "account", "summary", "questions", "next")} className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
						<Tab eventKey="account" title="Account" disabled tabClassName={activeTabs.account ? "done" : ""}>
							<Form>
								<Row>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Name Prefix <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select defaultValue="">
											<option value="" disabled>
												Select Name Prefix...
											</option>
										</Form.Select>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Name Formatted <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											First Name <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Middle Name <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Last Name <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Name Suffix <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Name Yomi <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="text" />
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Date of Birth <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control type="date" />
									</Col>
								</Row>
								<div className="d-flex align-items-start justify-content-between gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, "address", "questions", "account", "previous")} className="btn btn-main previous">
										<i className="fa-regular fa-arrow-left"></i> Previous
									</button>
									<button onClick={(e) => tabChangeForm(e, "address", "questions", "account", "next")} className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
						<Tab eventKey="address" title="Address" disabled tabClassName={activeTabs.address ? "done" : ""}>
							<Form>
								<div className="d-flex align-items-start justify-content-between gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, "documents", "account", "address", "previous")} className="btn btn-main previous">
										<i className="fa-regular fa-arrow-left"></i> Previous
									</button>
									<button onClick={(e) => tabChangeForm(e, "documents", "account", "address", "next")} className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
						<Tab eventKey="documents" title="Documents" disabled tabClassName={activeTabs.documents ? "done" : ""}>
							<Form>
								<div className="d-flex align-items-start justify-content-between gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, "costs", "address", "documents", "previous")} className="btn btn-main previous">
										<i className="fa-regular fa-arrow-left"></i> Previous
									</button>
									<button onClick={(e) => tabChangeForm(e, "costs", "address", "documents", "next")} className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
						<Tab eventKey="costs" title="Costs" disabled tabClassName={activeTabs.costs ? "done" : ""}>
							<Form>
								<div className="d-flex align-items-start justify-content-between gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, "nuances", "documents", "costs", "previous")} className="btn btn-main previous">
										<i className="fa-regular fa-arrow-left"></i> Previous
									</button>
									<button onClick={(e) => tabChangeForm(e, "nuances", "documents", "costs", "next")} className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
						<Tab eventKey="nuances" title="Nuances" disabled tabClassName={activeTabs.nuances ? "done" : ""}>
							<Form>
								<div className="d-flex align-items-start justify-content-between gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, "postmortem", "costs", "nuances", "previous")} className="btn btn-main previous">
										<i className="fa-regular fa-arrow-left"></i> Previous
									</button>
									<button onClick={(e) => tabChangeForm(e, "postmortem", "costs", "nuances", "next")} className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
						<Tab eventKey="postmortem" title="Postmortem" disabled tabClassName={activeTabs.postmartem ? "done" : ""}>
							<Form>
								<div className="d-flex align-items-start justify-content-between gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, null, "nuances", "postmortem", "previous")} className="btn btn-main previous">
										<i className="fa-regular fa-arrow-left"></i> Previous
									</button>
									<button onClick={(e) => tabChangeForm(e, null, "nuances", "postmortem", "next")} className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default EventsRequest;
