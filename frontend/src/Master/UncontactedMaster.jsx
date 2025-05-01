import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const BootstrapIconsCDN = () => (
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
);

const UncontactedMaster = () => {

  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      applicant: 'Harshada Shete',
      mobile: '9049446784',
      allocatedTo: 'Punit Sahu',
      nextFollowUpDate: '08/04/2025',
      status: 'Uncontacted',
      createdOn: '05/04/2025',
      createdBy: 'Lakashaman Vadade'
    }
  ]);

  const [showFilter, setShowFilter] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    applicant: '',
    mobile: '',
    allocatedTo: '',
    nextFollowUpDate: '',
    status: '',
    createdBy: ''
  });

  const toggleFilter = () => setShowFilter(!showFilter);
  const toggleImport = () => setShowImport(!showImport);
  const toggleForm = () => setShowForm(!showForm);

  const deleteEnquiry = (id) => {
    setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      id: enquiries.length + 1,
      createdOn: new Date().toLocaleDateString()
    };
    setEnquiries([...enquiries, newEntry]);
    setFormData({
      applicant: '',
      mobile: '',
      allocatedTo: '',
      nextFollowUpDate: '',
      status: '',
      createdBy: ''
    });
    setShowForm(false);
  };

  return (
    <>
      <BootstrapIconsCDN />
      <div className="mt-4 position-relative" style={{
        width: '100vw',
        minHeight: '100vh',
        padding: '20px',
        margin: '0',
        backgroundColor: '#f8f9fa',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>UNCONTACTED</h2>
          <div>
            <button className="btn btn-primary me-2" onClick={toggleForm}>+ Create New Enquiry</button>
            <button className="btn btn-outline-secondary me-2" onClick={toggleImport}>Import</button>
            <button className="btn btn-outline-secondary" onClick={toggleFilter}>Filters</button>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => navigate('/enquirymaster')} style={{ textDecoration: 'none' }}>
              All
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => navigate('/uncontactedmaster')} style={{ textDecoration: 'none' }}>
              UNCONTACTED
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => navigate('/followup')} style={{ textDecoration: 'none' }}>
              FOLLOW UPS
            </button>
          </li>
        </ul>

        {/* Search Filters */}
        <div className="row mb-3">
          <div className="col-md-4"><input type="text" className="form-control" placeholder="Search..." /></div>
          <div className="col-md-4"><input type="text" className="form-control" placeholder="Search By Team Member" /></div>
          <div className="col-md-4"><input type="text" className="form-control" placeholder="Search By Group" /></div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Actions</th>
                <th>Id</th>
                <th>Applicant</th>
                <th>Mobile No.</th>
                <th>Allocate To</th>
                <th>Next Followup Date</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(enquiry => (
                <tr key={enquiry.id}>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => navigate(`/uncontactedcustomer/${enquiry.id}`)} // ✅ Path set here
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteEnquiry(enquiry.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                  <td>{enquiry.id}</td>
                  <td>{enquiry.applicant}</td>
                  <td>{enquiry.mobile}</td>
                  <td>{enquiry.allocatedTo}</td>
                  <td>{enquiry.nextFollowUpDate}</td>
                  <td><span className="badge bg-success">{enquiry.status}</span></td>
                  <td>{enquiry.createdOn}</td>
                  <td>{enquiry.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enquiry Form as Modal */}
        {showForm && (
          <>
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create New Enquiry</h5>
                    <button type="button" className="btn-close" onClick={toggleForm}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Applicant Name</label>
                        <input type="text" name="applicant" className="form-control" value={formData.applicant} onChange={handleInputChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Mobile</label>
                        <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleInputChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Allocated To</label>
                        <input type="text" name="allocatedTo" className="form-control" value={formData.allocatedTo} onChange={handleInputChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Next Follow Up Date</label>
                        <input type="date" name="nextFollowUpDate" className="form-control" value={formData.nextFollowUpDate} onChange={handleInputChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <input type="text" name="status" className="form-control" value={formData.status} onChange={handleInputChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Created By</label>
                        <input type="text" name="createdBy" className="form-control" value={formData.createdBy} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Save Enquiry</button>
                      <button type="button" className="btn btn-secondary" onClick={toggleForm}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Import Section */}
        {showImport && (
          <div className="card mt-5">
            <div className="card-header fw-bold">1. Upload Excel File</div>
            <div className="card-body">
              <div className="border border-secondary p-5 text-center" style={{ borderStyle: 'dashed', borderRadius: '6px' }}>
                <label htmlFor="excelUpload" className="form-label text-muted">Drag and drop file here, or click to select file</label>
                <input type="file" id="excelUpload" accept=".xlsx" className="form-control" style={{ maxWidth: '300px', margin: '0 auto' }} />
                <small className="text-muted d-block mt-2">Only .xlsx files allowed</small>
              </div>
            </div>
          </div>
        )}

        {/* Filter Sidebar */}
        {showFilter && (
          <>
            <div className="position-fixed top-0 end-0 h-100 bg-white shadow" style={{ width: '300px', zIndex: 1050 }}>
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-primary text-white">
                <h5 className="mb-0">Apply Filters</h5>
                <button className="btn-close btn-close-white" onClick={toggleFilter}></button>
              </div>
              <div className="p-3">
                <div className="mb-3"><label className="form-label fw-bold">Team Members</label><input className="form-control" /></div>
                <div className="mb-3"><label className="form-label fw-bold">Group</label><input className="form-control" /></div>
                <div className="mb-3"><label className="form-label fw-bold">Lead Source</label><input className="form-control" /></div>
                <div className="mb-3"><label className="form-label fw-bold">Product Type</label><input className="form-control" /></div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="form-label fw-bold mb-0">Date</label>
                    <a href="#" className="text-primary small" onClick={(e) => e.preventDefault()}>Clear</a>
                  </div>
                  <input className="form-control" />
                </div>
              </div>
            </div>
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25" style={{ zIndex: 1040 }} onClick={toggleFilter}></div>
          </>
        )}
      </div>
    </>
  );
};

export default UncontactedMaster;
