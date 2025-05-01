import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const callScripts = [
  "Hi! I'm calling regarding your loan enquiry.",
  "Just checking if you have any questions about our services.",
  "We can help you with your application process.",
  "Would you like to schedule a detailed discussion?"
];

const CallPopup = ({ show, handleClose, clientName, clientMobile }) => {
  const [callNotes, setCallNotes] = useState([]);
  const [selectedScript, setSelectedScript] = useState('');
  const [customNote, setCustomNote] = useState('');

  const handleLog = () => {
    const note = selectedScript || customNote;
    if (note.trim()) {
      setCallNotes([...callNotes, { sender: "Salesperson", text: note }]);
      setSelectedScript('');
      setCustomNote('');
    }
  };

  // For mobile devices, this will open the dialer
  const handleCall = () => {
    window.open(`tel:${clientMobile}`, '_self');
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-info text-white">
        <Modal.Title>
          <i className="bi bi-telephone-fill me-2"></i>
          Call Log for <b>{clientName}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#f8fafc' }}>
        <div className="mb-3 border p-3 rounded shadow-sm" style={{ height: '250px', overflowY: 'auto', background: '#f1f1f1' }}>
          {callNotes.length === 0 ? (
            <div className="text-muted text-center mt-4">No call notes yet. Log your call!</div>
          ) : (
            callNotes.map((note, idx) => (
              <div key={idx} className="mb-2">
                <strong>{note.sender}:</strong> {note.text}
              </div>
            ))
          )}
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Select a Call Script</Form.Label>
          <Form.Select value={selectedScript} onChange={e => setSelectedScript(e.target.value)}>
            <option value="">-- Choose Script --</option>
            {callScripts.map((script, index) => (
              <option key={index} value={script}>{script}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Or type call notes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type your call notes here..."
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="info" onClick={handleLog}>
            <i className="bi bi-journal-text me-1"></i>Log Call
          </Button>
          <Button variant="success" onClick={handleCall}>
            <i className="bi bi-telephone-forward me-1"></i>Call Now
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CallPopup;
