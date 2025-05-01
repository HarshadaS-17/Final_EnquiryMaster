import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EnquiryMaster from "./Master/EnquiryMaster";
import CustomerDashboard from "./Master/CustomerDashboard";
import Followup from "./Master/Followup";
import UncontactedCustomer from "./Master/UncontactedCustomer";
import UncontactedMaster from "./Master/UncontactedMaster"; 
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/enquirymaster" />} />
        <Route path="/enquirymaster" element={<EnquiryMaster />} />
        <Route path="/customer/:id" element={<CustomerDashboard />} />
        <Route path="/followup" element={<Followup />} />
        <Route path="/uncontacted/:id" element={<UncontactedMaster />} />
        <Route path="/uncontactedmaster" element={<UncontactedMaster />} /> 
        <Route path="/uncontactedcustomer/1" element={<UncontactedCustomer />} />


      </Routes>
    </Router>
  );
}

export default App;
