import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Form, Row, Col, Table } from 'react-bootstrap';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const UncontactedCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showWhatsAppChats, setShowWhatsAppChats] = useState(false);
  const [showPhoneCalls, setShowPhoneCalls] = useState(false);
  const [showEmailChat, setShowEmailChat] = useState(false);

  const containerStyle = {
    width: '100vw',
    minWidth: '100vw',
    margin: '0',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    boxSizing: 'border-box',
  };

  const contactRowStyle = { display: 'flex', gap: '1rem', marginBottom: '1rem' };
  const contactItemStyle = { flex: 1, textAlign: 'center', padding: '0.75rem', cursor: 'pointer', transition: 'transform 0.2s' };
  const contactIconBase = { width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s, boxShadow 0.2s', margin: '0 auto' };
  const contactItemHover = { transform: 'translateY(-5px)' };

  const renderContactItem = (icon, color, label, count, onClick) => (
    <div
      onClick={onClick}
      style={contactItemStyle}
      onMouseEnter={e => e.currentTarget.style.transform = contactItemHover.transform}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <div
        style={{ ...contactIconBase, backgroundColor: color }}
        onMouseEnter={e => Object.assign(e.currentTarget.style, { transform: 'scale(1.1)', boxShadow: '0 4px 8px rgba(0,0,0,0.15)' })}
        onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'none', boxShadow: 'none' })}
      >
        {icon}
      </div>
      <div className="mt-2 fw-bold small">{label}</div>
      <div className="text-muted small">{count}</div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-primary mb-0">
          {id} <span className="badge bg-secondary ms-2">UNCONTACTED</span>
        </h5>
      </div>

      <div className="d-flex flex-wrap gap-4" style={{ width: '100%' }}>
        <div className="flex-grow-1" style={{ minWidth: '60%' }}>
          <Card className="mb-3 shadow-sm rounded">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <DetailRow label="Name" value="Harshada Shete" />
                  <DetailRow label="Date of Birth" value="12 Apr, 2025" />
                  <DetailRow label="PAN No" value="ABCDE1234K" />
                  <DetailRow label="Product" value="Agri Loan" />
                </Col>
                <Col md={6}>
                  <DetailRow label="Mobile" value="1212445566" />
                  <DetailRow label="Email" value="Harshada@gmail.com" />
                  <DetailRow label="Employment Type" value="Salaried" />
                  <DetailRow label="Retirement Age" value="60" />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <div style={contactRowStyle}>
            {renderContactItem(<FaWhatsapp size={18} color="white" />, '#25D366', 'WhatsApp', 12, () => setShowWhatsAppChats(!showWhatsAppChats))}
            {renderContactItem(<FaPhone size={18} color="white" />, '#0d6efd', 'Calls', 20, () => setShowPhoneCalls(!showPhoneCalls))}
            {renderContactItem(<FaEnvelope size={18} color="white" />, '#ffc107', 'Emails', 25, () => setShowEmailChat(!showEmailChat))}
          </div>

          {showWhatsAppChats && <ActiveWhatsAppChat />}
          {showPhoneCalls && <ActivePhoneCalls />}
          {showEmailChat && <ActiveEmailChat />}

          <Card className="shadow-sm rounded">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white">
              <strong>Task</strong>
              <Button size="sm" variant="outline-success">Add Task</Button>
            </Card.Header>
            <Card.Body>
              <Table bordered size="sm">
                <thead className="table-light">
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
                    <td colSpan={5} className="text-center text-muted">No tasks yet</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        <div style={{ minWidth: '35%' }}>
          <Card className="mb-3 shadow-sm rounded">
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label><strong>Assign To:</strong></Form.Label>
                <Form.Control type="text" defaultValue="Lakeshman Vedade" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select defaultValue="Converted">
                  <option>Uncontacted</option>
                  <option>Contacted</option>
                  <option>Converted</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Follow up on</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="mb-3 shadow-sm rounded">
            <Card.Body>
              <Form.Group>
                <Form.Label><strong>Leave a Comment</strong></Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your comment..." />
              </Form.Group>
              <Button className="mt-2" variant="primary">Post Comment</Button>
            </Card.Body>
          </Card>

          <Card className="shadow-sm rounded">
            <Card.Header><strong>Timeline</strong></Card.Header>
            <Card.Body>
              <TimelineEntry
                timestamp="Apr 11, 2025 03:17 PM"
                actor="Harshada Shete"
                action="Added to Enquiry"
                by="Lakashaman Vadade"
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <p className="mb-2"><strong>{label}:</strong> <span className="text-muted">{value}</span></p>
);

const TimelineEntry = ({ timestamp, actor, action, by }) => (
  <div className="d-flex mb-3">
    <div className="me-3 text-primary d-flex flex-column align-items-center">
      <div className="bg-primary rounded-circle" style={{ width: '10px', height: '10px' }}></div>
      <div className="border-start border-2 border-primary h-100"></div>
    </div>
    <div>
      <div className="fw-bold">{timestamp}</div>
      <div>{actor} <span className="text-muted">{action} by</span> {by}</div>
    </div>
  </div>
);

const ActiveWhatsAppChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', time: '10:01 AM', text: 'Hi, I wanted to check on my loan status.' },
    { id: 2, sender: 'Support', time: '10:03 AM', text: 'Sure! Let me pull that up for you.' },
  ]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { id: Date.now(), sender: 'You', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: input }]);
    setInput('');
  };

  const filteredMessages = messages.filter(msg => msg.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <Card className="mb-3">
      <Card.Header className="fw-bold bg-white border-0">
        <i className="bi bi-whatsapp me-2 text-success"></i>Active WhatsApp Chat
      </Card.Header>
      <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <Form.Control
          type="text"
          className="mb-3"
          placeholder="Search messages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {filteredMessages.map(msg => (
          <div key={msg.id} className="mb-2">
            <div className="d-flex justify-content-between">
              <strong>{msg.sender}:</strong>
              <small className="text-muted">{msg.time}</small>
            </div>
            <div className={msg.sender === 'Support' ? 'bg-success text-white p-2 rounded mt-1' : 'bg-light p-2 rounded mt-1'}>
              {msg.text}
            </div>
          </div>
        ))}
        <div className="mt-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <Button variant="success" className="ms-2" onClick={handleSend}>
            <i className="bi bi-send-fill"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const ActivePhoneCalls = () => {
  const [input, setInput] = useState('');
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');

  const messages = [
    { id: 1, sender: 'You', text: 'Hi, I have a query about my recent call.', time: '11:05 AM', status: 'Connected', note: 'Asked about loan process.' },
    { id: 2, sender: 'Support', text: 'Hello! How can I assist you with your call?', time: '11:07 AM', status: 'Connected' },
    { id: 3, sender: 'You', text: 'Missed your last call, please call again.', time: '11:20 AM', status: 'Missed' },
  ];

  const filtered = messages.filter(m => m.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <Card className="mb-3">
      <Card.Header className="fw-bold bg-white border-0 d-flex justify-content-between align-items-center">
        <span><i className="bi bi-telephone text-primary me-2"></i>Active Phone Calls</span>
        <Button size="sm" variant="primary">Call Now</Button>
      </Card.Header>
      <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <Form.Control
          type="text"
          className="mb-3"
          placeholder="Search calls or notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {filtered.map(msg => (
          <div key={msg.id} className="mb-2">
            <div><strong>{msg.sender}:</strong></div>
            <div className="d-flex align-items-center justify-content-between">
              <div>{msg.text}</div>
              <small className={`badge ${msg.status === 'Missed' ? 'bg-danger' : 'bg-success'}`}>{msg.status}</small>
            </div>
            {msg.note && <div className="text-muted small">📋 Note: {msg.note}</div>}
            <div className="text-end text-muted small">{msg.time}</div>
          </div>
        ))}
        <div className="mt-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add a note..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <Button variant="primary" className="mt-2" onClick={() => alert('Note added')}>
            Add Note
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const ActiveEmailChat = () => {
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);

  // Mock function to simulate email sending
  const sendEmail = (replyMessage) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate either success or failure
        Math.random() > 0.5 ? resolve('Email sent successfully!') : reject('Failed to send email');
      }, 2000);
    });
  };

  const handleSendEmail = async () => {
    if (reply.trim() === '') {
      setMessageStatus('Please enter a message before sending!');
      return;
    }

    setSending(true);
    setMessageStatus(null);

    try {
      const response = await sendEmail(reply); // Replace with actual email sending logic
      setMessageStatus(response);
    } catch (error) {
      setMessageStatus(error);
    } finally {
      setSending(false);
      setReply(''); // Clear the reply field after sending
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header className="fw-bold bg-white border-0">
        <i className="bi bi-envelope text-warning me-2"></i>Active Email Chat
      </Card.Header>
      <Card.Body>
        <div className="mb-2">
          <strong>From:</strong> Harshada@gmail.com<br />
          <strong>To:</strong> support@bank.com<br />
          <strong>Subject:</strong> Loan Enquiry
        </div>
        <div className="bg-light p-3 rounded">
          Hello, I would like to know the status of my loan application submitted last week.
        </div>
        <hr />
        
        <Form.Group>
          <Form.Label>Reply</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Type your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </Form.Group>

        {messageStatus && (
          <Alert variant={messageStatus.includes('success') ? 'success' : 'danger'} className="mt-3">
            {messageStatus}
          </Alert>
        )}

        <Button
          className="mt-2"
          variant="warning"
          onClick={handleSendEmail}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send Email'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UncontactedCustomer;
