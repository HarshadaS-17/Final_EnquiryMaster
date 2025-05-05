import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Badge, Spinner } from 'react-bootstrap';
import {
  FaWhatsapp, FaPhone, FaEnvelope, FaUserCircle,
  FaStickyNote, FaCheckCircle, FaFlag, FaCalendarAlt,
  FaClock, FaLayerGroup
} from 'react-icons/fa';
import WhatsAppPopup from '../Master/WhatsAppPopup';
import CallPopup from '../Master/CallPopup';
import EmailPopup from '../Master/EmailPopup';
import axios from 'axios';

// Timeline entry component
const TimelineEntry = ({ date, message, by }) => (
  <div className="d-flex mb-4">
    <div className="timeline-dot me-3 mt-1"></div>
    <div>
      <div className="fw-semibold text-secondary small">{date}</div>
      <div className="fw-bold">{message}</div>
      <div className="text-muted small">by {by}</div>
    </div>
  </div>
);

const statusColors = {
  "Contacted": "success",
  "Not Contacted": "secondary",
  "Interested": "info",
  "Not Interested": "danger",
  "Hot": "danger",
  "Warm": "warning",
  "Cold": "secondary",
  "New": "primary",
  "In Progress": "info",
  "Closed": "dark"
};

const EnquiryView = () => {
  const { enquiryId } = useParams(); // URL me se ID le rahe hain
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/enquiries/${enquiryId}`); // âœ… API endpoint
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch enquiry", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [enquiryId]);

  if (loading) return <div className="p-5 text-center"><Spinner animation="border" variant="primary" /></div>;
  if (!data) return <div className="p-5 text-center text-danger">No data found for this enquiry.</div>;

  const leadDetails = {
    remark: data.remark,
    status: data.status,
    leadStage: data.leadStage,
    leadStatus: data.leadStatus,
    leadType: data.leadType,
    nextFollowUpDate: data.nextFollowUpDate,
    nextFollowUpTime: data.nextFollowUpTime,
  };

  return (
    <div className="p-4" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <h4 className="fw-bold text-secondary mb-4">Client Dashboard</h4>

      {/* Sticky Profile Card */}
      <div style={{ position: 'sticky', top: 0, zIndex: 1020 }}>
        <Card className="mb-4 shadow-sm border-0 rounded-3">
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <FaUserCircle size={50} className="me-3 text-secondary" />
              <div>
                <h6 className="fw-bold mb-0">{data.prospect || "-"}</h6>
                <small className="text-muted">Client ID: {data.id || "-"}</small>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Action Cards */}
      <Row>
        <Col md={4}>
          <Card className="text-center shadow-sm border-0 mb-3 hover-card"
            onClick={() => setShowWhatsApp(true)} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <div className="text-success icon-container mb-2" style={{ fontSize: 28 }}><FaWhatsapp /></div>
              <h6 className="fw-bold">WhatsApp</h6>
              <p className="text-muted small">Click to open WhatsApp chat</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm border-0 mb-3 hover-card"
            onClick={() => setShowCall(true)} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <div className="text-primary icon-container mb-2" style={{ fontSize: 28 }}><FaPhone /></div>
              <h6 className="fw-bold">Phone</h6>
              <p className="text-muted small">Click to open Phone call</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm border-0 mb-3 hover-card"
            onClick={() => setShowEmail(true)} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <div className="text-warning icon-container mb-2" style={{ fontSize: 28 }}><FaEnvelope /></div>
              <h6 className="fw-bold">Email</h6>
              <p className="text-muted small">Click to open Email chat</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Popups */}
      <WhatsAppPopup show={showWhatsApp} handleClose={() => setShowWhatsApp(false)} clientName={data.prospect} />
      <CallPopup show={showCall} handleClose={() => setShowCall(false)} clientName={data.prospect} clientMobile={data.mobile} />
      <EmailPopup show={showEmail} handleClose={() => setShowEmail(false)} clientName={data.prospect} />

      <Row className="mt-4">
        {/* Timeline */}
        <Col md={6}>
          <Card className="shadow-sm mb-3">
            <Card.Header className="bg-white border-bottom fw-bold">Timeline</Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {data.timelineEntries && data.timelineEntries.length > 0 ? (
                data.timelineEntries.map((entry, idx) => (
                  <TimelineEntry key={idx} date={entry.date} message={entry.message} by={entry.by} />
                ))
              ) : (
                <div className="text-muted">No timeline entries.</div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Lead Details */}
        <Col md={6}>
          <Card className="shadow-sm mb-3">
            <Card.Header className="bg-white border-bottom fw-bold">Lead Details</Card.Header>
            <Card.Body>
              <div className="mb-3"><FaStickyNote className="me-2 text-info" /> <strong>Remark:</strong> <span className="text-muted">{leadDetails.remark || "-"}</span></div>
              <div className="mb-3"><FaCheckCircle className="me-2 text-success" /> <strong>Status:</strong> <Badge bg={statusColors[leadDetails.status] || "secondary"} className="ms-2">{leadDetails.status || "-"}</Badge></div>
              <div className="mb-3"><FaLayerGroup className="me-2 text-primary" /> <strong>Lead Stage:</strong> <Badge bg={statusColors[leadDetails.leadStage] || "secondary"} className="ms-2">{leadDetails.leadStage || "-"}</Badge></div>
              <div className="mb-3"><FaFlag className="me-2 text-danger" /> <strong>Lead Status:</strong> <Badge bg={statusColors[leadDetails.leadStatus] || "secondary"} className="ms-2">{leadDetails.leadStatus || "-"}</Badge></div>
              <div className="mb-3"><FaFlag className="me-2 text-warning" /> <strong>Lead Type:</strong> <Badge bg="info" className="ms-2">{leadDetails.leadType || "-"}</Badge></div>
              <div className="mb-3"><FaCalendarAlt className="me-2 text-secondary" /> <strong>Next Follow Up:</strong> <span className="ms-2">{leadDetails.nextFollowUpDate || "-"}</span> <FaClock className="ms-3 me-2 text-dark" /><span>{leadDetails.nextFollowUpTime || "-"}</span></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Styles */}
      <style>
        {`
          .hover-card:hover {
            background-color: #f0f2f5;
            transition: background-color 0.3s ease;
          }
          .icon-container:hover {
            transform: scale(1.2);
            transition: transform 0.2s ease-in-out;
          }
          .timeline-dot {
            width: 12px;
            height: 12px;
            background-color: #6c757d;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 0 2px #6c757d;
          }
        `}
      </style>
    </div>
  );
};

export default EnquiryView;