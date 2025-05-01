// EnquiryForm.jsx
import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EnquiryForm = ({ show, handleClose, handleSubmit, formData, handleInputChange, employees }) => {
    if (!show) {
        return null;
    }

    const employmentTypeOptions = ['Salaried', 'Self-Employed Business', 'Self-Employed Professional', 'Unemployed'];
    const leadSourceOptions = ['Website', 'Advertisement', 'Referral', 'Other'];
    const productTypeOptions = ['Home Loan', 'Loan Against Property', 'Balance Transfer ', 'Business Loan'];

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{formData.id ? 'Edit Enquiry' : 'Create New Enquiry'}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="applicant" className="form-label">Prospect</label>
                                    <input type="text" className="form-control" id="applicant" name="applicant" value={formData.applicant} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="mobile" className="form-label">Mobile</label>
                                    <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="alternatePhone" className="form-label">Alternate Phone</label>
                                    <input type="text" className="form-control" id="alternatePhone" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                                    <DatePicker
                                        selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                                        onChange={date => handleInputChange({ target: { name: 'dateOfBirth', value: date } })}
                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select Date of Birth"
                                        style={{
                                            height: '38px',
                                            padding: '0.375rem 0.75rem',
                                            fontSize: '1rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #ced4da',
                                            boxSizing: 'border-box',
                                            width: '100%',
                                            backgroundColor: '#fff'
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="panNo" className="form-label">PAN No.</label>
                                    <input type="text" className="form-control" id="panNo" name="panNo" value={formData.panNo} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="employmentType" className="form-label">Employment Type</label>
                                    <select className="form-select" id="employmentType" name="employmentType" value={formData.employmentType} onChange={handleInputChange}>
                                        <option value="">Select Employment Type</option>
                                        {employmentTypeOptions.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="leadSource" className="form-label">Lead Source</label>
                                    <select className="form-select" id="leadSource" name="leadSource" value={formData.leadSource} onChange={handleInputChange}>
                                        <option value="">Select Lead Source</option>
                                        {leadSourceOptions.map(source => (
                                            <option key={source} value={source}>{source}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="productType" className="form-label">Product Type</label>
                                    <select className="form-select" id="productType" name="productType" value={formData.productType} onChange={handleInputChange}>
                                        <option value="">Select Product Type</option>
                                        {productTypeOptions.map(product => (
                                            <option key={product} value={product}>{product}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Allocated To section removed */}
                            </div>

                            {/* Conditional Fields for Salaried */}
                            {formData.employmentType === 'Salaried' && (
                                <>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="companyName" className="form-label">Company Name</label>
                                            <input type="text" className="form-control" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="monthlyIncome" className="form-label">Monthly Income</label>
                                            <input type="number" className="form-control" id="monthlyIncome" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="payingEMI" className="form-label">Currently Paying EMI</label>
                                            <input type="number" className="form-control" id="payingEMI" name="payingEMI" value={formData.payingEMI} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="totalWorkExperience" className="form-label">Total Work Experience (Years)</label>
                                            <input type="number" className="form-control" id="totalWorkExperience" name="totalWorkExperience" value={formData.totalWorkExperience} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Conditional Fields for Self-Employed Business */}
                            {formData.employmentType === 'Self-Employed Business' && (
                                <>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="businessType" className="form-label">Business Type</label>
                                            <input type="text" className="form-control" id="businessType" name="businessType" value={formData.businessType} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="annualProfitAfterTax" className="form-label">Annual Profit After Tax</label>
                                            <input type="number" className="form-control" id="annualProfitAfterTax" name="annualProfitAfterTax" value={formData.annualProfitAfterTax} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="annualTurnover" className="form-label">Annual Turnover</label>
                                            <input type="number" className="form-control" id="annualTurnover" name="annualTurnover" value={formData.annualTurnover} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="payingEMI_Business" className="form-label">Currently Paying EMI</label>
                                            <input type="number" className="form-control" id="payingEMI_Business" name="payingEMI" value={formData.payingEMI} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="totalRunningBusinessYears" className="form-label">Total Running Business Years</label>
                                            <input type="number" className="form-control" id="totalRunningBusinessYears" name="totalRunningBusinessYears" value={formData.totalRunningBusinessYears} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Conditional Fields for Self-Employed Professional */}
                            {formData.employmentType === 'Self-Employed Professional' && (
                                <>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="occupationType" className="form-label">Professional Type</label>
                                            <input type="text" className="form-control" id="professionalType" name="professionalType" value={formData.professionalType} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="annualGrossReceipts" className="form-label">Annual Gross Receipts</label>
                                            <input type="number" className="form-control" id="annualGrossReceipts" name="annualGrossReceipts" value={formData.annualGrossReceipts} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="payingEMI_Professional" className="form-label">Currently Paying EMI</label>
                                            <input type="number" className="form-control" id="payingEMI_Professional" name="payingEMI" value={formData.payingEMI} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="totalPracticeYears" className="form-label">Total Years in Practice</label>
                                            <input type="number" className="form-control" id="totalPracticeYears" name="totalPracticeYears" value={formData.totalPracticeYears} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="occupationType" className="form-label">Occupation Type</label>
                                            <input type="text" className="form-control" id="occupationType" name="occupationType" value={formData.occupationType} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiryForm;
