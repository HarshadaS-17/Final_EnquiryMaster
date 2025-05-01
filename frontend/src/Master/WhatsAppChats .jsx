import React from "react";

const WhatsAppChats = () => {
  const cardStyle = {
    borderRadius: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  return (
    <div className="card mb-3" style={cardStyle}>
      <div className="card-header fw-bold bg-white border-0">
        <i className="bi bi-whatsapp text-success me-2"></i>WhatsApp Chats (3)
      </div>
      <div className="card-body small">
        <p>
          🟢 Top-up eligibility – <span className="text-success">Open</span>
          <br />
          <small>15 Dec, 23</small>
        </p>
        <p>
          ⚪ EMI Dispute – <span className="text-muted">Closed</span>
          <br />
          <small>27 Nov, 23</small>
        </p>
        <p>
          📄 Status on Auto loan request –{" "}
          <span className="text-muted">Closed</span>
          <br />
          <small>10 Jun, 23</small>
        </p>
      </div>
    </div>
  );
};

export default WhatsAppChats;
