// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EnquiryMaster from "./Master/EnquiryMaster";
import EnquiryView from "./Master/EnquiryView";
import CallPopup from "./Master/CallPopup";
import EmailPopup from "./Master/EmailPopup";
import WhatsAppPopup from "./Master/WhatsAppPopup";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State ko yahan bana lo
  const [enquiries, setEnquiries] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/enquirymaster" />} />
        <Route path="/enquirymaster" element={
          <EnquiryMaster enquiries={enquiries} setEnquiries={setEnquiries} />
        } />
        <Route path="/enquiry/:id" element={
          <EnquiryView enquiries={enquiries} />
        } />
        <Route path="/whatsapppopup" element={<WhatsAppPopup />} />
        <Route path="/callpopup" element={<CallPopup />} />
        <Route path="/emailpopup" element={<EmailPopup />} />
      </Routes>
    </Router>
  );
}

export default App;
