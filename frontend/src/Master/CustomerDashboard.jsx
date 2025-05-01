import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  borderRadius: '1rem',
  boxShadow: '0 0.25rem 0.75rem rgba(0,0,0,0.05)',
  backgroundColor: '#fff',
};

const iconBoxStyle = (color) => ({
  backgroundColor: color,
  color: 'white',
  borderRadius: '0.5rem',
  width: '40px',
  height: '40px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  marginBottom: '0.5rem',
});

const EmailChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', time: '09:45 AM', text: 'Hello, I want to update my KYC details.' },
    { id: 2, sender: 'Support', time: '09:48 AM', text: 'Sure! Please send the updated documents.' },
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
    <div className="card mb-3" style={cardStyle}>
      <div className="card-header fw-bold bg-white border-0">
        <i className="bi bi-envelope-fill text-warning me-2"></i>Active Email Chat
      </div>
      <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {filteredMessages.map(msg => (
          <div className="mb-2" key={msg.id}>
            <div className="d-flex justify-content-between">
              <strong>{msg.sender}:</strong>
              <small className="text-muted">{msg.time}</small>
            </div>
            <div className={msg.sender === 'Support' ? 'bg-warning text-white p-2 rounded mt-1' : 'bg-light p-2 rounded mt-1'}>{msg.text}</div>
          </div>
        ))}
        <div className="mt-3 d-flex">
          <input type="text" className="form-control me-2" placeholder="Type your reply..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSend(); }} />
          <button className="btn btn-warning text-white" onClick={handleSend}><i className="bi bi-send-fill"></i></button>
        </div>
      </div>
    </div>
  );
};

const WhatsAppChats = () => {
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
    <div className="card mb-3" style={cardStyle}>
      <div className="card-header fw-bold bg-white border-0">
        <i className="bi bi-chat-dots text-success me-2"></i>Active WhatsApp Chat
      </div>
      <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {filteredMessages.map(msg => (
          <div className="mb-2" key={msg.id}>
            <div className="d-flex justify-content-between">
              <strong>{msg.sender}:</strong>
              <small className="text-muted">{msg.time}</small>
            </div>
            <div className={msg.sender === 'Support' ? 'bg-success text-white p-2 rounded mt-1' : 'bg-light p-2 rounded mt-1'}>{msg.text}</div>
          </div>
        ))}
        <div className="mt-3 d-flex">
          <input type="text" className="form-control me-2" placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSend(); }} />
          <button className="btn btn-success" onClick={handleSend}><i className="bi bi-send-fill"></i></button>
        </div>
      </div>
    </div>
  );
};

const PhoneCalls = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'You',
      time: '11:05 AM',
      text: 'Hi, I have a query about my recent call.',
      callStatus: 'Connected',
      note: 'Asked about loan process.',
    },
    {
      id: 2,
      sender: 'Support',
      time: '11:07 AM',
      text: 'Hello! How can I assist you with your call?',
      callStatus: 'Connected',
      note: '',
    },
    {
      id: 3,
      sender: 'You',
      time: '11:20 AM',
      text: 'Missed your last call, please call again.',
      callStatus: 'Missed',
      note: '',
    },
  ]);
  const [input, setInput] = useState('');
  const [callStatus, setCallStatus] = useState('Idle');
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');

  // Simulate a call
  const handleCall = () => {
    setCallStatus('Ringing');
    setTimeout(() => {
      setCallStatus('Connected');
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: 'You',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Started a call.',
          callStatus: 'Connected',
          note: '',
        },
      ]);
      setTimeout(() => setCallStatus('Idle'), 3000);
    }, 2000);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: input,
        callStatus: callStatus === 'Connected' ? 'Connected' : 'Message',
        note: note,
      },
    ]);
    setInput('');
    setNote('');
  };

  // Filter messages by search
  const filteredMessages = messages.filter(
    msg =>
      msg.text.toLowerCase().includes(search.toLowerCase()) ||
      (msg.note && msg.note.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="card mb-3" style={cardStyle}>
      <div className="card-header fw-bold bg-white border-0 d-flex align-items-center justify-content-between">
        <span>
          <i className="bi bi-telephone-fill text-primary me-2"></i>
          Active Phone Calls
        </span>
        <button
          className={`btn btn-${callStatus === 'Ringing' ? 'warning' : callStatus === 'Connected' ? 'success' : 'primary'} btn-sm`}
          onClick={handleCall}
          disabled={callStatus === 'Ringing' || callStatus === 'Connected'}
        >
          <i className="bi bi-telephone-forward-fill me-1"></i>
          {callStatus === 'Idle' && 'Call Now'}
          {callStatus === 'Ringing' && 'Ringing...'}
          {callStatus === 'Connected' && 'Connected'}
        </button>
      </div>
      <div className="card-body" style={{ maxHeight: '350px', overflowY: 'auto' }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search calls or notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {filteredMessages.length === 0 && (
          <div className="text-muted text-center">No calls or messages found.</div>
        )}
        {filteredMessages.map((msg, idx) => (
          <div className="mb-2" key={msg.id}>
            <div className="d-flex justify-content-between align-items-center">
              <strong className={msg.sender === 'Support' ? 'text-primary' : ''}>{msg.sender}:</strong>
              <small className="text-muted">{msg.time}</small>
            </div>
            <div
              className={
                msg.sender === 'Support'
                  ? 'bg-primary text-white p-2 rounded mt-1'
                  : 'bg-light p-2 rounded mt-1'
              }
            >
              {msg.text}
              {msg.callStatus && (
                <span className={`badge ms-2 bg-${msg.callStatus === 'Connected' ? 'success' : msg.callStatus === 'Missed' ? 'danger' : 'secondary'}`}>
                  {msg.callStatus}
                </span>
              )}
            </div>
            {msg.note && (
              <div className="text-muted small mt-1">
                <i className="bi bi-journal-text me-1"></i>Note: {msg.note}
              </div>
            )}
          </div>
        ))}
        <div className="mt-3 d-flex flex-column flex-md-row gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type your reply or call note..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Add note (optional)"
            value={note}
            onChange={e => setNote(e.target.value)}
            style={{ maxWidth: 180 }}
          />
          <button className="btn btn-primary text-white" onClick={handleSend}>
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [taskTitle, setTaskTitle] = useState('');
  const [allocatedBy, setAllocatedBy] = useState('');
  const [assignTo, setAssignTo] = useState('');

  const handleSaveTask = () => {
    const taskData = {
      title: taskTitle,
      allocatedBy,
      assignTo,
    };
    console.log("Task Saved:", taskData);
    setShowModal(false);
    setTaskTitle('');
    setAllocatedBy('');
    setAssignTo('');
  };

  const [showWhatsAppChats, setShowWhatsAppChats] = useState(false);
  const [showEmailChat, setShowEmailChat] = useState(false);
  const [showPhoneCalls, setShowPhoneCalls] = useState(false);

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
     <h2 style={{marginTop:'0px',}}>Customer Dashboard</h2>

    

      {/* Main Content */}
      <div className="px-4 py-3">
        <div className="row g-3">
          {/* Left Sidebar */}
          <div className="col-lg-3">
            <div className="card mb-3" style={cardStyle}>
              <div className="card-body d-flex align-items-center">
                <img
                  src="../src/assets/images/profile.jpeg"
                  alt="Profile"
                  className="rounded-circle me-3"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <div>
                  <h6 className="mb-1 fw-bold">Mr. Punit Sahu</h6>
                  <small className="text-muted">Since 11 Jan, 1996</small><br />
                  <small className="text-muted">Business Owner</small>
                </div>
              </div>
            </div>

            <div className="card" style={cardStyle}>
              <div className="card-body small">
                <div className="row">
                  <div className="col-6 mb-3">
                    <strong><i className="bi bi-person-fill me-2 text-dark"></i>Name:</strong><br />
                    Mary T. Laplante
                  </div>
                  <div className="col-6 mb-3">
                    <strong><i className="bi bi-envelope-fill me-2 text-primary"></i>Email:</strong><br />
                    marytlaplante@dayrep.com
                  </div>
                  <div className="col-6 mb-3">
                    <strong><i className="bi bi-telephone-fill me-2 text-danger"></i>Mobile:</strong><br />
                    +1 904-376-7031
                  </div>
                  <div className="col-6 mb-3">
                    <strong><i className="bi bi-cash-stack me-2 text-success"></i>Lifetime Loan Value:</strong><br />
                    ₹10,00,000
                  </div>
                  <div className="col-6 mb-3">
                    <strong><i className="bi bi-briefcase-fill me-2 text-warning"></i>Business Name:</strong><br />
                    Sherman’s
                  </div>
                  <div className="col-6 mb-3">
                    <strong><i className="bi bi-gear-fill me-2 text-secondary"></i>Business Nature:</strong><br />
                    Transportation
                  </div>
                  <div className="col-6 mb-3">
                    <strong><i className="bi bi-bar-chart-fill me-2 text-info"></i>Annual Turnover:</strong><br />
                    ₹2.5 Cr
                  </div>
                  <div className="col-6 mb-3">
                    <strong><i className="bi bi-calendar3 me-2 text-primary"></i>Date of Birth:</strong><br />
                    21/02/1997
                  </div>
                  <div className="col-12">
                    <strong><i className="bi bi-geo-alt-fill me-2 text-danger"></i>Address:</strong><br />
                    368 Cherry Tree Drive, Jacksonville
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="col-lg-6">
            <div className="card mb-3" style={cardStyle}>
              <div className="card-body d-flex justify-content-around text-center">
                <div onClick={() => setShowWhatsAppChats(prev => !prev)} style={{ cursor: 'pointer' }}>
                  <div style={iconBoxStyle('#25D366')}>
                    <i className="bi bi-whatsapp"></i>
                  </div>
                  <div className="fw">WhatsApp</div>
                  <h5>12</h5>
                </div>

                <div onClick={() => setShowPhoneCalls(prev => !prev)} style={{ cursor: 'pointer' }}>
                  <div style={iconBoxStyle('#0d6efd')}>
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div className="fw">Calls</div>
                  <h5>20</h5>
                </div>

                <div onClick={() => setShowEmailChat(prev => !prev)} style={{ cursor: 'pointer' }}>
                  <div style={iconBoxStyle('#ffc107')}>
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div className="fw">Emails</div>
                  <h5>25</h5>
                </div>
              </div>
            </div>

            {showWhatsAppChats && <WhatsAppChats />}
            {showPhoneCalls && <PhoneCalls />}
            {showEmailChat && <EmailChat />}

            {/* Task Section */}
            <div className="card mb-3" style={cardStyle}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0">Task</h6>
                  <button className="btn btn-primary btn-sm" onClick={handleShow}>
                    <i className="bi bi-plus-circle me-1"></i>Add Task
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
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
                        <td>1</td>
                        <td>Call Customer</td>
                        <td>Raj</td>
                        <td>Anjali</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-outline-secondary btn-sm">
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-outline-danger btn-sm">
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <h6 className="fw-bold mb-3"><i className="bi bi-clock-history me-2"></i>Today</h6>
                <div style={{ position: 'relative', marginLeft: '20px', paddingLeft: '20px', borderLeft: '2px solid #dee2e6' }}>
                  {[
                    { icon: 'check2', color: '#198754', text: 'Loan approved', date: '24 May, 5:15 pm' },
                    { icon: 'ticket-perforated', color: '#0d6efd', text: 'Ticket created: “Status on my 2 wheeler loan…”', date: '10 Jun, 3:02 pm' },
                    { icon: 'file-earmark-arrow-down', color: '#0dcaf0', text: 'SOA Document sent to Customer', date: '27 May, 8:00 pm' },
                  ].map((item, i) => (
                    <div key={i} style={{ position: 'relative', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: '2px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        color: '#fff',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <i className={`bi bi-${item.icon}`}></i>
                      </div>
                      <div style={{ marginLeft: '10px' }}>
                        <div className="fw-bold">{item.text}</div>
                        <small>{item.date}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="#" className="text-decoration-none text-primary small d-block mt-3 text-end">View all Activities</a>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-lg-3">
            <div className="card mb-3" style={cardStyle}>
              <div className="card-header fw-bold bg-white border-0">
                <i className="bi bi-whatsapp text-success me-2"></i>WhatsApp Chats (3)
              </div>
              <div className="card-body small">
                <p>🟢 Top-up eligibility – <span className="text-success">Open</span><br /><small>15 Dec, 23</small></p>
                <p>⚪ EMI Dispute – <span className="text-muted">Closed</span><br /><small>27 Nov, 23</small></p>
                <p>📄 Status on Auto loan request – <span className="text-muted">Closed</span><br /><small>10 Jun, 23</small></p>
              </div>
            </div>

            <div className="card" style={cardStyle}>
              <div className="card-header fw-bold d-flex justify-content-between align-items-center bg-white border-0">
                <span>Existing Loans (3)</span>
                <span className="badge bg-secondary">10 yrs</span>
              </div>
              <div className="card-body small">
                <p><strong>Total Loan:</strong> ₹15 Lakh</p>
                <hr />
                <p className="fw-bold">Auto Loan – ₹5,00,000</p>
                <small>10 Mar, 22</small>
                <hr />
                <p className="fw-bold text-danger">Personal Loan – ₹3,00,000</p>
                <small className="text-danger">Payment Due</small><br />
                <small>2 Apr, 20</small>
                <hr />
                <a href="#" className="text-decoration-none text-primary small">View all</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add Task */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Allocated By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Allocated by"
                value={allocatedBy}
                onChange={e => setAllocatedBy(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Assign To</label>
              <input
                type="text"
                className="form-control"
                placeholder="Assign to"
                value={assignTo}
                onChange={e => setAssignTo(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveTask}>Save Task</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerDashboard;
