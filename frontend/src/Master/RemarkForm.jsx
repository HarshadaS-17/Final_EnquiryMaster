import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const leadStageOptions = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];
const leadStatusOptions = ['Open', 'In Progress', 'Closed', 'On Hold'];
const leadTypeOptions = ['Hot', 'Warm', 'Cold'];

const RemarkForm = ({
    show,
    onHide,
    enquiryId,
    currentStatus,
    enquiry,
    onSaveRemark
}) => {
    const [remarkText, setRemarkText] = useState('');
    const [status, setStatus] = useState(currentStatus || 'Not Contacted');
    const [nextFollowUpDate, setNextFollowUpDate] = useState('');
    const [nextFollowUpTime, setNextFollowUpTime] = useState('');
    const [leadStage, setLeadStage] = useState('');
    const [leadStatus, setLeadStatus] = useState('');
    const [leadType, setLeadType] = useState('');

    useEffect(() => {
        if (enquiry) {
            setRemarkText(enquiry.remark || '');
            setNextFollowUpDate(enquiry.nextFollowUpDate?.split('T')[0] || '');
            setNextFollowUpTime(enquiry.nextFollowUpDate?.split('T')[1]?.slice(0, 5) || '');
            setLeadStage(enquiry.leadStage || '');
            setLeadStatus(enquiry.leadStatus || '');
            setLeadType(enquiry.leadType || '');
        }
        setStatus(currentStatus || 'Not Contacted');
    }, [enquiry, currentStatus]);

    const handleSave = () => {
        // Combine date and time for follow up
        const followUpDateTime = nextFollowUpDate && nextFollowUpTime
            ? `${nextFollowUpDate}T${nextFollowUpTime}`
            : nextFollowUpDate;

        // Call parent function to save data
        onSaveRemark(
            enquiryId,
            remarkText,
            status,
            followUpDateTime,
            leadStage,
            leadStatus,
            leadType
        );

        // Clear form fields
        setRemarkText('');
        setStatus('Not Contacted');
        setNextFollowUpDate('');
        setNextFollowUpTime('');
        setLeadStage('');
        setLeadStatus('');
        setLeadType('');
        // Modal ko close nahi karna save ke baad!
    };

    const handleTransfer = () => {
        // Transfer ka kaam
        console.log('Transfer clicked for enquiryId:', enquiryId);
        onHide(); // Transfer ke baad modal close karo
    };

    const showAdditionalFields = status !== 'Not Interested';

    return (
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={true}>
            <Modal.Header closeButton>
                <Modal.Title>Add Remark</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={remarkText}
                            onChange={(e) => setRemarkText(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Not Contacted">Not Contacted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Not Interested">Not Interested</option>
                        </Form.Select>
                    </Form.Group>

                    {showAdditionalFields && (
                        <>
                            {/* Lead Stage */}
                            <Form.Group className="mb-3">
                                <Form.Label>Lead Stage</Form.Label>
                                <Form.Select
                                    value={leadStage}
                                    onChange={e => setLeadStage(e.target.value)}
                                >
                                    <option value="">Select Stage</option>
                                    {leadStageOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            {/* Lead Status */}
                            <Form.Group className="mb-3">
                                <Form.Label>Lead Status</Form.Label>
                                <Form.Select
                                    value={leadStatus}
                                    onChange={e => setLeadStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    {leadStatusOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            {/* Lead Type */}
                            <Form.Group className="mb-3">
                                <Form.Label>Lead Type</Form.Label>
                                <Form.Select
                                    value={leadType}
                                    onChange={e => setLeadType(e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    {leadTypeOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            {/* Follow Up Date and Time */}
                            <Form.Group className="mb-3">
                                <Form.Label>Next Follow Up Date</Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="date"
                                        value={nextFollowUpDate}
                                        onChange={e => setNextFollowUpDate(e.target.value)}
                                    />
                                    <Form.Control
                                        type="time"
                                        value={nextFollowUpTime}
                                        onChange={e => setNextFollowUpTime(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                        </>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleSave}>
                    Save Remark
                </Button>

                    
            </Modal.Footer>
        </Modal>
    );
};

export default RemarkForm;