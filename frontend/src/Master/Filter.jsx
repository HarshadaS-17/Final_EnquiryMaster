import React from 'react';

const FilterSidebar = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <>
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow"
        style={{ width: '300px', zIndex: 1050 }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-primary text-white">
          <h5 className="mb-0">Apply Filters</h5>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        <div className="p-3">
          <div className="mb-3">
            <label className="form-label fw-bold">Team Members</label>
            <input className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Group</label>
            <input className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Lead Source</label>
            <input className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Product Type</label>
            <input className="form-control" />
          </div>
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form-label fw-bold mb-0">Date</label>
              <a href="#" className="text-primary small" onClick={e => e.preventDefault()}>Clear</a>
            </div>
            <input className="form-control" />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>
    </>
  );
};

export default FilterSidebar;   
