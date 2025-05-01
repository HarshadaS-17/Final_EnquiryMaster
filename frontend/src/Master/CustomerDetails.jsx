import React, { useEffect, useState } from "react";
import {
  Card, Button, Row, Col, Table, Input, Form, FormGroup, Label,
  Badge, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeadStatuses } from "../../../../Redux/Slice/CRMSlice/leadStatusSlice";
import { useLocation } from "react-router-dom";

const CustomerDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [status, setStatus] = useState("Not Connected");
  const [followUpDate, setFollowUpDate] = useState("2025-04-29");
  const [timeline, setTimeline] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [assignedTo, setAssignedTo] = useState("Lakashaman Vadade");
  const [newAssignee, setNewAssignee] = useState("Lakashaman Vadade");

  const { leadStatuses } = useSelector((state) => state?.leadStatus || {});

  useEffect(() => {
    dispatch(getAllLeadStatuses());
  }, [dispatch]);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleAssignModal = () => setAssignModalOpen(!assignModalOpen);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const entry = {
      action: `Status Updated to ${newStatus}`,
      timestamp: new Date().toISOString(),
    };
    setTimeline((prev) => [entry, ...prev]);
  };

  const handleFollowUpDateChange = (e) => setFollowUpDate(e.target.value);
  const handleClearFollowUp = () => setFollowUpDate("");

  const handleConvertToCase = () => {
    const entry = {
      action: `Lead Converted to Case with status: ${status}`,
      timestamp: new Date().toISOString(),
    };
    setTimeline((prev) => [entry, ...prev]);
    alert(`Lead converted to case with status: ${status}`);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      author: "Lakashaman Vadade",
      text: newComment,
      time: new Date().toISOString(),
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const mobile = state?.mobile;

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <Col md="8">
          <h5 style={{ fontWeight: "600", fontSize: "1.25rem" }}>
            {`${state?.status}`}
            <Badge color="primary" className="ms-2" style={{ backgroundColor: "#0d6efd", fontSize: "0.85rem" }}>
              {status}
            </Badge>
          </h5>
          <p className="text-muted">
            Followup Date: <strong>{followUpDate || ""}</strong>
          </p>
        </Col>
        <Col md="4" className="text-end">
          <Button size="sm" color="primary" className="me-2" style={{ fontWeight: "500", padding: "0.4rem 0.75rem" }}>✏️ Edit</Button>
          <Button size="sm" color="danger" style={{ fontWeight: "500", padding: "0.4rem 0.75rem" }}>🗑️ Delete</Button>
        </Col>
      </Row>

      <Card style={{ padding: "1.5rem", marginBottom: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 0 10px rgba(0,0,0,0.05)", borderLeft: "5px solid #0d6efd", backgroundColor: "#f8f9fa" }}>
        <Row>
          <Col md="6">
            <p><strong>Name:</strong> {`${state?.firstName}`}</p>
            <p><strong>Date of Birth:</strong> {`${new Date(state?.dob).toLocaleDateString()}`}</p>
            <p><strong>PAN No.:</strong> {`${state?.pan}`}</p>
            <p><strong>Product:</strong> {`${state?.productType}`}</p>
          </Col>
          <Col md="6">
            <p><strong>Mobile:</strong> {mobile}</p>
            <p><strong>Email:</strong> {`${state?.email}`}</p>
            <p><strong>Employment Type:</strong> {`${state?.employmentType}`}</p>
          </Col>
        </Row>
        <div className="d-flex gap-2 mt-3 flex-wrap">
          <Button color="success" onClick={handleConvertToCase}>Convert to Case</Button>
          <a href={`tel:${mobile}`} className="btn btn-info">📞 Call</a>
          <a href={`https://wa.me/${mobile}`} target="_blank" rel="noopener noreferrer" className="btn btn-success">💬 WhatsApp</a>
          <a href={`sms:${mobile}`} className="btn btn-secondary">✉️ SMS</a>
        </div>
      </Card>

      <Row>
        <Col md="6">
          <Card style={{ padding: "1rem", marginBottom: "1.5rem", borderLeft: "4px solid #ffc107", backgroundColor: "#fff3cd", borderRadius: "0.75rem", boxShadow: "0 0 6px rgba(0,0,0,0.05)" }}>
            <h6 style={{ color: "#856404", fontWeight: "600", marginBottom: "1rem" }}>📋 Follow-Up Assignment</h6>
            <p>
              <strong>Assign To:</strong> {assignedTo}
              <Button color="link" size="sm" onClick={toggleAssignModal} className="ms-2 p-0">✏️</Button>
            </p>
            <p><strong>Assign By:</strong> Lakashaman Vadade <span className="text-muted">(21 Apr 2025)</span></p>

            <Form>
              <FormGroup>
                <Label>Status</Label>
                <Input type="select" value={status} onChange={handleStatusChange}>
                  {leadStatuses?.map((item) => (
                    <option key={item._id} value={item.name}>{item.name}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Follow up Date</Label>
                <Input type="date" value={followUpDate} onChange={handleFollowUpDateChange} />
              </FormGroup>
              <Button color="warning" size="sm" onClick={handleClearFollowUp}>Clear Followup</Button>
            </Form>
          </Card>
        </Col>

        <Col md="6">
          <Card style={{ padding: "1rem", marginBottom: "1.5rem", borderLeft: "4px solid #17a2b8", backgroundColor: "#e9f7fb", borderRadius: "0.75rem", boxShadow: "0 0 6px rgba(0,0,0,0.05)" }}>
            <h6 style={{ color: "#0c5460", fontWeight: "600", marginBottom: "1rem" }}>💬 Comments</h6>
            <div className="mb-3 border rounded p-2 bg-light">
              {comments.map((cmt, idx) => (
                <div key={idx} className="mb-2">
                  <p className="mb-0"><strong>{cmt.author}</strong> <span className="text-muted small">{new Date(cmt.time).toLocaleString()}</span></p>
                  <p>{cmt.text}</p>
                </div>
              ))}
            </div>
            <Input type="textarea" placeholder="Leave a comment..." className="mb-2" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <Button color="primary" size="sm" onClick={handlePostComment}> Post Comment</Button>
          </Card>
        </Col>
      </Row>

      <Card style={{ padding: "1rem", marginBottom: "1.5rem", backgroundColor: "#fdfdfd", borderRadius: "0.75rem", boxShadow: "0 0 6px rgba(0,0,0,0.04)" }}>
        <h6 style={{ fontWeight: "600", marginBottom: "1rem" }}>Timeline</h6>
        <ul style={{ listStyle: "none", paddingLeft: "1rem" }}>
          {timeline.map((item, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem", position: "relative" }}>
              <span style={{ color: "#0d6efd", position: "absolute", left: "-1rem" }}>•</span>
              <strong>{item.action}</strong> – {new Date(item.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </Card>

      <Card style={{ padding: "1rem", backgroundColor: "#ffffff", borderRadius: "0.75rem", boxShadow: "0 0 6px rgba(0,0,0,0.03)" }}>
        <h6 style={{ fontWeight: "600", marginBottom: "1rem" }}> Task</h6>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Allocated By</th>
              <th>Assign To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="text-center">No Task Added</td>
            </tr>
          </tbody>
        </Table>
        <Button color="primary" onClick={toggleModal}>+ Add Task</Button>
      </Card>

      <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
        <ModalHeader toggle={toggleModal}>Create New Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Task Title</Label>
              <Input type="text" placeholder="Enter Task title" />
            </FormGroup>
            <FormGroup>
              <Label>Select Role</Label>
              <Input type="select">
                <option>Select</option>
                <option>Manager</option>
                <option>Executive</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Assign To</Label>
              <Input type="select">
                <option>Select</option>
                <option>Lakashaman Vadade</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Task Description</Label>
              <Input type="textarea" />
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Due Date</Label>
                  <Input type="date" />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Priority</Label>
                  <Input type="select">
                    <option>Select Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Add Task</Button>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={assignModalOpen} toggle={toggleAssignModal} centered>
        <ModalHeader toggle={toggleAssignModal}>Change Account Manager</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Assign To</Label>
              <Input
                type="select"
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
              >
                <option>Lakashaman Vadade</option>
                <option>Another Executive</option>
                <option>Manager</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setAssignedTo(newAssignee);
              toggleAssignModal();
            }}
          >
            Update
          </Button>
          <Button color="secondary" onClick={toggleAssignModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomerDetails;