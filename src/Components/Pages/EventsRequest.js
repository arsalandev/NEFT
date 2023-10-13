import React, { useEffect, useState } from "react";
import { Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getEventRegions, requestEvent } from "../../Actions/allActions";
import dayjs from "dayjs";

const EventsRequest = ({ all: { eventRegions }, getEventRegions, requestEvent }) => {
	const [eventRegionsList, setEventRegionsList] = useState(null);
	const [validated, setValidated] = useState(false);
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
	const [summaryForm, setSummaryForm] = useState({
		callersilo: 10000001,
		callerregion: 10000001,
		taskrequest: 10000001,
		tasktitle: "",
		taskdescription: "",
		eventregion: 0,
		eventtype: 0,
		eventdatetimestart: "",
		eventdatetimeend: "",
		eventtemperaturefahrenheit: 0,
		eventtemperaturerain: null,
		eventbaronsite: null,
		eventaudiencecount: 0,
		eventnotes: "",
	});
	const [questionsForm, setQuestionsForm] = useState({
		callersilo: 10000001,
		callerregion: 10000001,
		tasktype: 10000001,
		title:"",
		question1:"",
		question2:"",
		question3:"",
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

	const SummaryFormSubmit = async (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			console.log("false");
		}
		setValidated(true);
		if (form.checkValidity()) {
			console.log("true");
			console.log(summaryForm, "summaryForm");
			summaryForm.eventdatetimestart = dayjs(summaryForm.eventdatetimestart).format("YYYY-MM-DD HH:mm:ss");
			summaryForm.eventdatetimeend = dayjs(summaryForm.eventdatetimeend).format("YYYY-MM-DD HH:mm:ss");
			summaryForm.eventtemperaturerain = summaryForm.eventtemperaturerain === "true" ? true : false;
			summaryForm.eventbaronsite = summaryForm.eventbaronsite === "true" ? true : false;
			e.preventDefault();
			e.stopPropagation();
			const res = await requestEvent(summaryForm, localStorage.getItem("token"));
			console.log(res, "res");
			if (res) {
				tabChangeForm(e, "questions", "", "summary", "next");
				setValidated(false);
			}
		}
	};

	const QuestionsFormSubmit = async (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			console.log("false");
		}
		setValidated(true);
		if (form.checkValidity()) {
			console.log("true");
			console.log(questionsForm, "questionsForm");
			e.preventDefault();
			e.stopPropagation();
			// const res = await requestEvent(summaryForm, localStorage.getItem("token"));
			// console.log(res, "res");
			// if (res) {
				tabChangeForm(e, "account", "summary", "questions", "next")
			// }
		}
	}

	useEffect(() => {
		getEventRegions(localStorage.getItem("token"));
	}, [getEventRegions]);

	useEffect(() => {
		if (eventRegions) {
			setEventRegionsList(eventRegions);
		}
	}, [eventRegions]);

	return (
		<div className="widget">
			<div className="widget-head">Events Request Form</div>
			<div className="widget-body">
				<div className="step-arrow-nav">
					<Tabs activeKey={tabChange} className="mb-4 custom-nav" justify onSelect={handleSelect}>
						<Tab eventKey="summary" title="Summary" disabled tabClassName={activeTabs.summary ? "done" : ""}>
							<Form noValidate validated={validated} onSubmit={SummaryFormSubmit}>
								<Row>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Event Region <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select
											defaultValue=""
											required
											name="eventregion"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: parseInt(e.target.value),
												})
											}
										>
											<option value="" disabled>
												Select Event Region...
											</option>
											{eventRegionsList
												? eventRegionsList.length > 0
													? eventRegionsList.map((i, v) => (
															<option key={v} value={i.EventPermId}>
																{i.EventDescriptionLong}
															</option>
													  ))
													: ""
												: ""}
										</Form.Select>
										<Form.Control.Feedback type="invalid">Please Select An Event Region</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Event Type <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select
											defaultValue=""
											required
											name="eventtype"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: parseInt(e.target.value),
												})
											}
										>
											<option value="" disabled>
												Select Event Type...
											</option>
											{eventRegionsList
												? eventRegionsList.length > 0
													? eventRegionsList.map((i, v) => (
															<option key={v} value={i.EventPermId}>
																{i.EventDescriptionLong}
															</option>
													  ))
													: ""
												: ""}
										</Form.Select>
										<Form.Control.Feedback type="invalid">Please Select An Event Type</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Event Title <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control
											type="text"
											required
											name="tasktitle"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: e.target.value,
												})
											}
										/>
										<Form.Control.Feedback type="invalid">Please Enter Event Title</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Event Description <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control
											type="text"
											required
											name="taskdescription"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: e.target.value,
												})
											}
										/>
										<Form.Control.Feedback type="invalid">Please Enter Event Description</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Start Date <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control
											type="datetime-local"
											required
											name="eventdatetimestart"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: e.target.value,
												})
											}
										/>
										<Form.Control.Feedback type="invalid">Please Enter Event Start Date</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											End Date <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control
											type="datetime-local"
											required
											name="eventdatetimeend"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: e.target.value,
												})
											}
										/>
										<Form.Control.Feedback type="invalid">Please Enter Event End Date</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Expected Temperature <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control
											type="number"
											required
											name="eventtemperaturefahrenheit"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: parseInt(e.target.value),
												})
											}
										/>
										<Form.Control.Feedback type="invalid">Please Enter Expected Temperature</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Expected To Rain <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select
											defaultValue=""
											required
											name="eventtemperaturerain"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: e.target.value,
												})
											}
										>
											<option value="" disabled>
												Select Expected To Rain...
											</option>
											<option value="true">Yes</option>
											<option value="false">No</option>
										</Form.Select>
										<Form.Control.Feedback type="invalid">Please Select Expected To Rain</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Bar On Site <small className="text-danger">*</small>
										</Form.Label>
										<Form.Select
											defaultValue=""
											required
											name="eventbaronsite"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: e.target.value,
												})
											}
										>
											<option value="" disabled>
												Select Bar On Site...
											</option>
											<option value="true">Yes</option>
											<option value="false">No</option>
										</Form.Select>
										<Form.Control.Feedback type="invalid">Please Select Bar On Site</Form.Control.Feedback>
									</Col>
									<Col lg={3} className="mb-3">
										<Form.Label>
											Expected Audience Count <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control
											type="number"
											required
											name="eventaudiencecount"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: parseInt(e.target.value),
												})
											}
										/>
										<Form.Control.Feedback type="invalid">Please Enter Expected Audience Count</Form.Control.Feedback>
									</Col>
									<Col lg={12} className="mb-3">
										<Form.Label>Expected Notes</Form.Label>
										<Form.Control
											as="textarea"
											rows={4}
											name="eventnotes"
											onChange={(e) =>
												setSummaryForm({
													...summaryForm,
													[e.target.name]: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
								<div className="d-flex align-items-start justify-content-end gap-3 mt-4">
									<button type="submit" className="btn btn-main next">
										Next <i className="fa-regular fa-arrow-right"></i>
									</button>
								</div>
							</Form>
						</Tab>
						<Tab eventKey="questions" title="Questions" disabled tabClassName={activeTabs.questions ? "done" : ""}>
							<Form noValidate validated={validated} onSubmit={QuestionsFormSubmit}>
								<Row>
									<Col lg={6} className="mb-3">
										<Form.Label>
											Title <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control 
											type="text"
											required
											name="title"
											onChange={(e) =>
												setQuestionsForm({
													...questionsForm,
													[e.target.name]: e.target.value,
												})	
											} 
										/>
									</Col>
									<Col lg={6} className="mb-3">
										<Form.Label>
											Question 1 <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control 
											type="text" 
											required
											name="question1"
											onChange={(e) =>
												setQuestionsForm({
													...questionsForm,
													[e.target.name]: e.target.value,
												})	
											} 
										/>
									</Col>
									<Col lg={6} className="mb-3">
										<Form.Label>
											Question 2 <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control 
											type="text"
											required
											name="question2"
											onChange={(e) =>
												setQuestionsForm({
													...questionsForm,
													[e.target.name]: e.target.value,
												})	
											}
										/>
									</Col>
									<Col lg={6} className="mb-3">
										<Form.Label>
											Question 3 <small className="text-danger">*</small>
										</Form.Label>
										<Form.Control 
											type="text" 
											required
											name="question3"
											onChange={(e) =>
												setQuestionsForm({
													...questionsForm,
													[e.target.name]: e.target.value,
												})	
											}
										/>
									</Col>
								</Row>
								<div className="d-flex align-items-start justify-content-between gap-3 mt-4">
									<button onClick={(e) => tabChangeForm(e, "account", "summary", "questions", "previous")} className="btn btn-main previous">
										<i className="fa-regular fa-arrow-left"></i> Previous
									</button>
									<button type="submit" className="btn btn-main next">
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

const mapStateToProps = (state) => ({
	all: state.all,
});

export default connect(mapStateToProps, { getEventRegions, requestEvent })(EventsRequest);
