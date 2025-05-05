import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const messageTemplates = [
  "Hi! I'm reaching out regarding your loan enquiry.",
  "Just a quick follow-up about your interest in our services.",
  "We’re here to help with any questions you may have.",
  "Can we schedule a call to discuss further?"
];

const WhatsAppPopup = ({ show, handleClose, clientName }) => {
  const [chat, setChat] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = () => {
    const msg = selectedTemplate || customMsg;
    if (msg.trim()) {
      setChat([...chat, { sender: "Salesperson", text: msg }]);
      setSelectedTemplate('');
      setCustomMsg('');

      // Simulate WhatsApp send (replace with actual send logic if needed)
      setTimeout(() => {
        setChat(prevChat => [...prevChat, { sender: clientName, text: "Thanks! I'll get back to you." }]);
      }, 1000);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>
          <i className="bi bi-whatsapp me-2"></i>
          WhatsApp Chat with <b>{clientName}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#f8fafc' }}>
        <div className="mb-3 border p-3 rounded shadow-sm" style={{ height: '250px', overflowY: 'auto', background: '#f1f1f1' }}>
          {chat.length === 0 ? (
            <div className="text-muted text-center mt-4">Start the WhatsApp conversation!</div>
          ) : (
            chat.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))
          )}
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Select a Template</Form.Label>
          <Form.Select value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}>
            <option value="">-- Choose Template --</option>
            {messageTemplates.map((temp, index) => (
              <option key={index} value={temp}>{temp}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Or type a message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type your message here..."
            value={customMsg}
            onChange={(e) => setCustomMsg(e.target.value)}
          />
        </Form.Group>

        <div className="text-end">
          <Button variant="success" onClick={handleSend}>
            <i className="bi bi-send me-1"></i>Send via WhatsApp
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WhatsAppPopup;