import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WhatsAppPopup from '../Master/WhatsAppPopup';
import EnquiryForm from './EnquiryForm';
import EmailPopup from '../Master/EmailPopup';
import CallPopup from '../Master/CallPopup';
import styled from 'styled-components';
import RemarkForm from '../Master/RemarkForm';
import Filter from './Filter';

const BootstrapIconsCDN = () => (   
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
    />
);


// Styled Components
const SubtleShadowButton = styled.button`
    padding: 8px 16px;
    font-size: 19px;
    border: none;
    border-radius: 6px;
    background-color: #fff;
    color: #6c757d;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.3);
    }
`;

const GradientButton = styled.button`
  background: linear-gradient(45deg, #007bff, #00d4ff);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #0056b3, #009ecf);
  }
`;

const MinimalIconButton = styled.button`
    background: none;
    border: none;
    padding: 5px;
    margin: 0 3px;
    cursor: pointer;
    opacity: 0.7;
    transition: transform 0.3s ease, opacity 0.3s ease;
    border-radius: 4px;

    &:hover {
        transform: scale(1.1);
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

const SubtleIcon = styled.i`
    font-size: 1.8em;
    color: #6c757d;
    transition: color 0.3s ease;

    ${MinimalIconButton}:hover & {
        color: #007bff;
    }
`;

const CardButton = styled.button`
    padding: 10px 15px;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    background-color: #f8f9fa;
    color: #495057;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
        background-color: #e9ecef;
        color: #007bff;
    }
`;

const HighlightedTabButton = styled.button`
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;
    color: #6c757d;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: opacity 0.2s;

    &:hover {
        background-color: #e9ecef;
        transform: translateY(-2px);
        color: #495057;
    }

    &.active {
        background-color: #007bff;
        border-color: #007bff;
        color: white;
        box-shadow: 0 2px 5px rgba(0, 123, 255, 0.3);
    }
`;

const EnquiryMaster = () => {
    const navigate = useNavigate();

    // Dropdown options
    const employmentTypeOptions = ['Salaried', 'Self-Employed Business', 'Self-Employed Professional', 'Unemployed'];
    const leadSourceOptions = ['Website', 'Advertisement', 'Referral', 'Other'];
    const productTypeOptions = ['Home Loan', 'Loan Against Property', 'Business Loan', 'Balance Transfer '];

    // Popups & UI states
    const [showWhatsapp, setShowWhatsapp] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showCall, setShowCall] = useState(false);
    const [selectedClient, setSelectedClient] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Filter States
    const [filterApplicant, setFilterApplicant] = useState('');
    const [filterMobile, setFilterMobile] = useState('');
    const [filterAllocatedTo, setFilterAllocatedTo] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDateOfBirth, setFilterDateOfBirth] = useState('');
    

    // Table & Form states
    const [formData, setFormData] = useState({
        prospect: '',
        mobile: '',
        allocatedTo: '',
        nextFollowUpDate: '',
        alternatePhone: '',
        dateOfBirth: '',
        panNo: '',
        employmentType: '',
        email: '',
        leadSource: '',
        productType: '',
        status: 'Not Contacted',
        companyName: '',
        monthlyIncome: '',
        payingEMI: '',
        totalWorkExperience: '',
        businessType: '',
        annualProfitAfterTax: '',
        annualTurnover: '',
        totalRunningBusinessYears: '',
        occupationType: '',
        professionalType: '',
        annualGrossReceipts: ''
    });
    const [editId, setEditId] = useState(null);
    const [enquiries, setEnquiries] = useState([]);


    // Sample employee data
    const [employees] = useState([
        { id: 1, name: 'Harshada Shete' },
        { id: 2, name: 'Shrey' },
        { id: 3, name: 'Punit' },
    ]);

    // Remark state
    const [showRemark, setShowRemark] = useState(false);
    const [remark, setRemark] = useState('');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [trackingProcess, setTrackingProcess] = useState({});
    const [remarkEnquiryId, setRemarkEnquiryId] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(''); // Added currentStatus
    const [historyEnquiryId, setHistoryEnquiryId] = useState(null); // Track which row's history is being viewed
    const [showHistory, setShowHistory] = useState(false); // State to show remark history
    const [expandedEnquiryId, setExpandedEnquiryId] = useState(null); // Track which row is expanded

    // Function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Not Contacted': return '#ffc107'; // yellow
            case 'Contacted': return '#17a2b8'; // blue
            case 'Qualified': return '#28a745'; // green
            case 'Lost': return '#dc3545'; // red
            default: return '#6c757d'; // grey
        }
    };

    // Popup handlers
    <WhatsAppPopup
    show={showWhatsapp}
    handleClose={() => setShowWhatsapp(false)}
    clientName={selectedClient}
  />
  
    const handleEmailClick = (clientName) => {
        setSelectedClient(clientName);
        setShowEmail(true);
    };
    const handleCallClick = (clientName) => {
        setSelectedClient(clientName);
        setShowCall(true);
    };
    const toggleFilter = () => setShowFilter(!showFilter);
    const toggleImport = () => setShowImport(!showImport);
    const toggleForm = () => {
        setShowForm(true);
        setEditId(null);
        setFormData(prev => ({
            ...prev,
            prospect: '',
            mobile: '',
            allocatedTo: '',
            nextFollowUpDate: '',
            alternatePhone: '',
            dateOfBirth: '',
            panNo: '',
            employmentType: '',
            email: '',
            leadSource: '',
            productType: '',
            status: 'Not Contacted',
            companyName: '',
            monthlyIncome: '',
            payingEMI: '',
            totalWorkExperience: '',
            businessType: '',
            annualProfitAfterTax: '',
            annualTurnover: '',
            totalRunningBusinessYears: '',
            occupationType: '',
            professionalType: '',
            annualGrossReceipts: ''
        }));
    };

    // Delete row
    const deleteEnquiry = (id) => {
        setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
    };

    // Edit row
    const handleEdit = (enquiry) => {
        setFormData(enquiry);
        setEditId(enquiry.id);
        setShowForm(true);
    };

    // Form field change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input changed:', name, value);
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Add/Edit submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            setEnquiries(enquiries.map(enq => enq.id === editId ? { ...formData, id: editId } : enq));
            setEditId(null);
        } else {
            const today = new Date().toLocaleDateString();
            const newEntry = {
                ...formData,
                id: enquiries.length + 1,
                createdOn: today,
                status: 'Not Contacted', // Default status for new leads
                employmentType: formData.employmentType,
                productType: formData.productType,
                leadSource: formData.leadSource
            };
            setEnquiries([...enquiries, newEntry]);
        }
        setFormData(prev => ({
            ...prev,
            prospect: '',
            mobile: '',
            allocatedTo: '',
            nextFollowUpDate: '',
            alternatePhone: '',
            dateOfBirth: '',
            panNo: '',
            employmentType: '',
            email: '',
            leadSource: '',
            productType: '',
            status: 'Not Contacted',
            companyName: '',
            monthlyIncome: '',
            payingEMI: '',
            totalWorkExperience: '',
            businessType: '',
            annualProfitAfterTax: '',
            annualTurnover: '',
            totalRunningBusinessYears: '',
            occupationType: '',
            professionalType: '',
            annualGrossReceipts: ''
        }));
        setShowForm(false);
    };
    
    const handleSaveRemark = (
        enquiryId, 
        newRemark, 
        newStatus, 
        nextFollowUpDateTime, 
        leadStage, 
        leadStatus, 
        leadType
      ) => {
        setEnquiries(prevEnquiries =>
          prevEnquiries.map(enq => {
            if (enq.id === enquiryId) {
              const updatedEnquiry = {
                ...enq,
                status: newStatus,
                remark: newRemark,
                nextFollowUpDate: nextFollowUpDateTime,
                leadStage,
                leadStatus,
                leadType,
                remarkHistory: [
                  ...(enq.remarkHistory || []),
                  {
                    timestamp: new Date().toLocaleString(),
                    remark: newRemark,
                    status: newStatus,
                    nextFollowUpDate: nextFollowUpDateTime,
                    leadStage,
                    leadStatus,
                    leadType
                  }
                ]
              };
              return updatedEnquiry;
            } else {
              return enq;
            }
          })
        );
        setShowRemark(false);
        setRemarkEnquiryId(null);
        setCurrentStatus('');
      };

      const handleAllocateEmployee = (enquiryId, employeeId) => {
        setEnquiries(prevEnquiries =>
          prevEnquiries.map(enq =>
            enq.id === enquiryId ? { ...enq, allocatedTo: employeeId } : enq
          )
        );
      };
      
      
    // Form close
    const handleClose = () => {
        setShowForm(false);
        setEditId(null);
        setFormData(prev => ({
            ...prev,
            prospect: '',
            mobile: '',
            allocatedTo: '',
            nextFollowUpDate: '',
            // createdBy: '',
            alternatePhone: '',
            dateOfBirth: '',
            panNo: '',
            employmentType: '',
            email: '',
            leadSource: '',
            productType: '',
            status: 'Not Contacted',
            companyName: '',
            monthlyIncome: '',
            payingEMI: '',
            totalWorkExperience: '',
            businessType: '',
            annualProfitAfterTax: '',
            annualTurnover: '',
            totalRunningBusinessYears: '',
            occupationType: '',
            professionalType: '',
            annualGrossReceipts: ''
        }));
    };

    // Remark handlers
    const handleRemarkClick = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setRemark(enquiry.remark || '');
        setRemarkEnquiryId(enquiry.id);
        setCurrentStatus(enquiry.status || ''); // Set current status
        setShowRemark(true);
    };

    // History handler
    const handleHistoryClick = (enquiry) => {
        setHistoryEnquiryId(enquiry.id);
        setShowHistory(true);
    };

    // Tracking process handler
    const handleTrackingClick = (enquiry) => {
        const trackingData = {
            [enquiry.id]: [
                { timestamp: new Date(), event: 'Enquiry Created' },
                { timestamp: new Date(), event: 'Contacted Client' }
            ]
        };
        setTrackingProcess(trackingData);
    };

    const closeHistory = () => {
        setHistoryEnquiryId(null);
        setShowHistory(false);
    };

    // Expand handler
    const handleExpandClick = (enquiryId) => {
        setExpandedEnquiryId(expandedEnquiryId === enquiryId ? null : enquiryId);
    };

    return (
        <>
            <BootstrapIconsCDN />
            <div
  className="mt-4 position-relative"
  style={{
    width: '100vw',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    fontSize: '16px',
  }}
>
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 style={{ fontSize: '24px' }}>ENQUIRY</h2>

    <div className="d-flex gap-2">
      <GradientButton onClick={toggleForm}>
        <i className="bi bi-plus-circle me-1"></i>
        Create New Enquiry
      </GradientButton>

      <SubtleShadowButton onClick={toggleImport}>
        <i className="bi bi-upload me-1"></i>
        Import
      </SubtleShadowButton>

      <button
        className="btn btn-outline-secondary"
        onClick={() => setShowFilter(true)}
      >
        <i className="bi bi-funnel-fill me-1"></i> Filters
      </button>
    </div>
  </div>



                {/* Tabs */}
                <ul className="nav nav-tabs mb-3" id="myTab" role="tablist" style={{ fontSize: '14px' }}>
                    <li className="nav-item" role="presentation">
                        <HighlightedTabButton
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                        >
                            All Enquiries
                        </HighlightedTabButton>
                    </li>
                    
                </ul>

                {/* Tab Contents */}
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        {/* All Enquiries Content */}
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        {/* My Enquiries Content */}
                    </div>
                </div>

                {showFilter && (
    <Filter 
        onClose={() => setShowFilter(false)}
        filterApplicant={filterApplicant}
        setFilterApplicant={setFilterApplicant}
        filterMobile={filterMobile}
        setFilterMobile={setFilterMobile}
        filterAllocatedTo={filterAllocatedTo}
        setFilterAllocatedTo={setFilterAllocatedTo}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterDateOfBirth={filterDateOfBirth}
        setFilterDateOfBirth={setFilterDateOfBirth}
    />
)}


                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-bordered align-middle" style={{ fontSize: '14px' }}>
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Prospect</th>
                                <th>Mobile</th>
                                <th>Allocated</th>
                                <th>WhatsApp</th>
                                <th>Email</th>
                                <th>Call</th>
                                <th>Lead Type</th>
                                <th>Next Followup</th>
                                <th>Status</th>
                                <th>Created On</th>
                                <th>Lead Source</th>
                                <th>Product Type</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.length > 0 ? (
                                enquiries
                                    .filter(enquiry => 
                                        (!filterApplicant || enquiry.applicant.toLowerCase().includes(filterApplicant.toLowerCase())) &&
                                        (!filterMobile || enquiry.mobile.includes(filterMobile)) &&
                                        (!filterAllocatedTo || enquiry.allocatedTo === filterAllocatedTo) &&
                                        (!filterStatus || enquiry.status === filterStatus) &&
                                        (!filterDateOfBirth || enquiry.dateOfBirth === filterDateOfBirth)
                                    )
                                    .map((enquiry) => (
                                        <React.Fragment key={enquiry.id}>
                                            <tr className={expandedEnquiryId === enquiry.id ? 'table-active' : ''} style={{ cursor: 'pointer' }}>
                                                <td>{enquiry.id}</td>
                                                <td>{enquiry.applicant}</td>
                                                <td>{enquiry.mobile}</td>
                                                <td>
          <select
            value={enquiry.allocatedTo || ''}
            onChange={(e) => handleAllocateEmployee(enquiry.id, e.target.value)}
            className="form-select"
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </td>
        <td>
  <MinimalIconButton onClick={() => handleWhatsappClick(enquiry.applicant)}>
    <SubtleIcon className="bi bi-whatsapp text-success" />
  </MinimalIconButton>
</td>

                                                <td>
                                                    <MinimalIconButton onClick={() => handleEmailClick(enquiry.applicant)}>
                                                        <SubtleIcon className="bi bi-envelope text-primary" />
                                                    </MinimalIconButton>
                                                </td>
                                                <td>
                                                    <MinimalIconButton onClick={() => handleCallClick(enquiry.applicant)}>
                                                        <SubtleIcon className="bi bi-telephone text-info" />
                                                    </MinimalIconButton>
                                                </td>
                                                <td>{enquiry.allocatedTo || <span style={{color: '#dc3545'}}>Not allocated</span>}</td>
                                                <td>{enquiry.nextFollowUpDate}</td>
                                                <td>
                                                    <span className={`badge bg-${
                                                        enquiry.status === 'Not Contacted' ? 'warning' :
                                                        enquiry.status === 'Contacted' ? 'info' :
                                                        enquiry.status === 'Qualified' ? 'success' :
                                                        enquiry.status === 'Lost' ? 'danger' : 'secondary'
                                                    }`}>
                                                        {enquiry.status}
                                                    </span>
                                                </td>
                                                <td>{enquiry.createdOn}</td>
                                                <td>{enquiry.leadSource}</td>
                                                <td>{enquiry.productType}</td>


                                                <td>
                                                    <div className="d-flex">
                                                    <MinimalIconButton onClick={() => handleView(enquiry)}>
                                                       <SubtleIcon className="bi bi-eye text-primary" />
                                                    </MinimalIconButton>
                                                        <MinimalIconButton onClick={() => handleEdit(enquiry)}>
                                                            <SubtleIcon className="bi bi-pencil-square text-primary" />
                                                        </MinimalIconButton>
                                                        <MinimalIconButton onClick={() => deleteEnquiry(enquiry.id)}>
                                                            <SubtleIcon className="bi bi-trash text-danger" />
                                                        </MinimalIconButton>
                                                        <MinimalIconButton onClick={() => handleRemarkClick(enquiry)}>
                                                            <SubtleIcon className="bi bi-chat-left-text text-info" />
                                                        </MinimalIconButton>
                                                        <MinimalIconButton onClick={() => handleHistoryClick(enquiry)}>
                                                            <SubtleIcon className="bi bi-clock-history text-secondary" />
                                                        </MinimalIconButton>
                                                        <MinimalIconButton onClick={() => handleExpandClick(enquiry.id)}>
                                                            <SubtleIcon className={`bi bi-chevron-${expandedEnquiryId === enquiry.id ? 'up' : 'down'} text-dark`} />
                                                        </MinimalIconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedEnquiryId === enquiry.id && (
                                                <tr>
                                                    <td colSpan="13">
                                                        <div className="p-3 bg-light rounded">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <p><strong>Email:</strong> {enquiry.email}</p>
                                                                    <p><strong>DOB:</strong> {enquiry.dateOfBirth}</p>
                                                                    <p><strong>PAN:</strong> {enquiry.panNo}</p>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <p><strong>Employment Type:</strong> {enquiry.employmentType}</p>
                                                                    {enquiry.employmentType === 'Salaried' && (
                                                                        <>
                                                                            <p><strong>Company:</strong> {enquiry.companyName}</p>
                                                                            <p><strong>Monthly Income:</strong> {enquiry.monthlyIncome}</p>
                                                                        </>
                                                                    )}
                                                                    {enquiry.employmentType === 'Self-Employed Business' && (
                                                                        <>
                                                                            <p><strong>Business Type:</strong> {enquiry.businessType}</p>
                                                                            <p><strong>Annual Turnover:</strong> {enquiry.annualTurnover}</p>
                                                                        </>
                                                                    )}
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <p><strong>Latest Remark:</strong> {enquiry.remark || 'No remarks yet'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="13" className="text-center py-4">No enquiries found. Create a new enquiry to get started.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Enquiry Form Modal */}
                {showForm && (
                    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{editId ? 'Edit Enquiry' : 'Create New Enquiry'}</h5>
                                    <button type="button" className="btn-close" onClick={handleClose}></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Prospect*</label>
                                                <input
                                                    type="text"
                                                    name="applicant"
                                                    value={formData.applicant}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Mobile Number*</label>
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Alternate Phone</label>
                                                <input
                                                    type="text"
                                                    name="alternatePhone"
                                                    value={formData.alternatePhone}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Date of Birth</label>
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">PAN Number</label>
                                                <input
                                                    type="text"
                                                    name="panNo"
                                                    value={formData.panNo}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Employment Type</label>
                                                <select
                                                    name="employmentType"
                                                    value={formData.employmentType}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                >
                                                    <option value="">Select Employment Type</option>
                                                    {employmentTypeOptions.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Lead Source</label>
                                                <select
                                                    name="leadSource"
                                                    value={formData.leadSource}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                >
                                                    <option value="">Select Lead Source</option>
                                                    {leadSourceOptions.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Product Type</label>
                                                <select
                                                    name="productType"
                                                    value={formData.productType}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                >
                                                    <option value="">Select Product Type</option>
                                                    {productTypeOptions.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        
                                        </div>
                                       

                                        {/* Conditional fields based on employment type */}
                                        {formData.employmentType === 'Salaried' && (
                                            <div className="employment-details">
                                                <h5 className="mt-4 mb-3">Salaried Details</h5>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Company Name</label>
                                                        <input
                                                            type="text"
                                                            name="companyName"
                                                            value={formData.companyName}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Monthly Income</label>
                                                        <input
                                                            type="number"
                                                            name="monthlyIncome"
                                                            value={formData.monthlyIncome}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Paying EMI</label>
                                                        <input
                                                            type="number"
                                                            name="payingEMI"
                                                            value={formData.payingEMI}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Total Work Experience (Years)</label>
                                                        <input
                                                            type="number"
                                                            name="totalWorkExperience"
                                                            value={formData.totalWorkExperience}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {formData.employmentType === 'Self-Employed Business' && (
                                            <div className="employment-details">
                                                <h5 className="mt-4 mb-3">Business Details</h5>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Business Type</label>
                                                        <input
                                                            type="text"
                                                            name="businessType"
                                                            value={formData.businessType}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Annual Profit After Tax</label>
                                                        <input
                                                            type="number"
                                                            name="annualProfitAfterTax"
                                                            value={formData.annualProfitAfterTax}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Annual Turnover</label>
                                                        <input
                                                            type="number"
                                                            name="annualTurnover"
                                                            value={formData.annualTurnover}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Total Running Business Years</label>
                                                        <input
                                                            type="number"
                                                            name="totalRunningBusinessYears"
                                                            value={formData.totalRunningBusinessYears}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {formData.employmentType === 'Self-Employed Professional' && (
                                            <div className="employment-details">
                                                <h5 className="mt-4 mb-3">Professional Details</h5>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Occupation Type</label>
                                                        <input
                                                            type="text"
                                                            name="occupationType"
                                                            value={formData.occupationType}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Professional Type</label>
                                                        <input
                                                            type="text"
                                                            name="professionalType"
                                                            value={formData.professionalType}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Annual Gross Receipts</label>
                                                        <input
                                                            type="number"
                                                            name="annualGrossReceipts"
                                                            value={formData.annualGrossReceipts}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Create'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

               
                 {/* WhatsApp Popup Modal */}
    <WhatsAppPopup
      show={showWhatsapp}
      handleClose={() => setShowWhatsapp(false)}
      clientName={selectedClient}
    />
  
                {/* Email Popup */}
                {showEmail && (
                    <EmailPopup
                        clientName={selectedClient}
                        onClose={() => setShowEmail(false)}
                    />
                )}

                {/* Call Popup */}
                {showCall && (
                    <CallPopup
                        clientName={selectedClient}
                        onClose={() => setShowCall(false)}
                    />
                )}
{showRemark && (
  <RemarkForm
    show={showRemark}
    onHide={() => {
      setShowRemark(false);
      setRemarkEnquiryId(null);
    }}
    enquiryId={remarkEnquiryId}
    currentStatus={currentStatus}
    enquiry={selectedEnquiry}
    onSaveRemark={handleSaveRemark}
  />
)}


                {/* History Popup */}
                {showHistory && historyEnquiryId && (
                    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Remark History</h5>
                                    <button type="button" className="btn-close" onClick={closeHistory}></button>
                                </div>
                                <div className="modal-body">
                                    {enquiries.find(e => e.id === historyEnquiryId)?.remarkHistory?.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Timestamp</th>
                                                        <th>Remark</th>
                                                        <th>Status</th>
                                                        <th>Next Follow Up</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {enquiries.find(e => e.id === historyEnquiryId)?.remarkHistory?.map((history, index) => (
                                                        <tr key={index}>
                                                            <td>{history.timestamp}</td>
                                                            <td>{history.remark}</td>
                                                            <td>
                                                                <span className={`badge bg-${
                                                                    history.status === 'Not Contacted' ? 'warning' :
                                                                    history.status === 'Contacted' ? 'info' :
                                                                    history.status === 'Qualified' ? 'success' :
                                                                    history.status === 'Lost' ? 'danger' : 'secondary'
                                                                }`}>
                                                                    {history.status}
                                                                </span>
                                                            </td>
                                                            <td>{history.nextFollowUpDate}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-center py-4">No remark history available.</p>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeHistory}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Import Modal */}
                {showImport && (
                    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Import Enquiries</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowImport(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Upload Excel File</label>
                                        <input type="file" className="form-control" accept=".xlsx, .xls, .csv" />
                                    </div>
                                    <div className="alert alert-info">
                                        <small>
                                            <i className="bi bi-info-circle me-2"></i>
                                            Please upload an Excel file with the required columns. Download the template for reference.
                                        </small>
                                    </div>
                                    <div className="text-center mb-3">
                                        <button className="btn btn-outline-primary btn-sm">
                                            <i className="bi bi-download me-1"></i>
                                            Download Template
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowImport(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary">Import</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default EnquiryMaster;
