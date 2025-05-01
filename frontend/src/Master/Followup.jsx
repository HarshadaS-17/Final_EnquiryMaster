import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';

function Followup() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const [appointments, setAppointments] = useState({
        '2023-11-01': [{ name: 'Jenny Wilson', service: 'Home Loan', time: '14:00-16:00' }],
        '2023-11-10': [{ name: 'Jane Cooper', service: 'Personal Loan', time: '14:00-16:00' }],
        '2023-11-13': [{ name: 'Arlene McCoy', service: 'Car Loan', time: '14:00-16:00' }],
        '2023-11-15': [{ name: 'Wade Warren', service: 'Home Loan', time: '14:00-16:00' }],
        '2023-11-18': [{ name: 'Cody Fisher', service: 'Personal Loan', time: '14:00-' }],
        '2023-11-27': [{ name: 'Devon Lane', service: 'Education Loan', time: '14:00-16:00' }],
        '2023-11-31': [{ name: 'Dianne Russell', service: 'Personal Loan', time: '14:00-16:00' }],
    });

    const [selectedMonth, setSelectedMonth] = useState(11);
    const [selectedYear, setSelectedYear] = useState(2023);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', service: '', time: '', date: '' });
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const [year, month, day] = formData.date.split("-");
        const dateKey = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        const newEntry = {
            name: formData.name,
            service: formData.service,
            time: formData.time,
        };

        setAppointments((prev) => {
            const updatedAppointments = { ...prev };

            if (selectedAppointment) {
                const updatedDayAppointments = updatedAppointments[selectedAppointment.dateKey].filter(
                    (appointment) => appointment !== selectedAppointment
                );

                if (updatedDayAppointments.length === 0) {
                    delete updatedAppointments[selectedAppointment.dateKey];
                } else {
                    updatedAppointments[selectedAppointment.dateKey] = updatedDayAppointments;
                }
            }

            updatedAppointments[dateKey] = [...(updatedAppointments[dateKey] || []), newEntry];

            return updatedAppointments;
        });

        setShowModal(false);
        setFormData({ name: '', service: '', time: '', date: '' });
        setSelectedAppointment(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const formatDate = (date) => {
        if (date === 1 || date === 21 || date === 31) return date + "st";
        if (date === 2 || date === 22) return date + "nd";
        if (date === 3 || date === 23) return date + "rd";
        return date + "th";
    };

    const renderAppointments = (day) => {
        const key = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dailyAppointments = appointments[key];
        if (!dailyAppointments) return null;

        return dailyAppointments
            .filter((appointment) =>
                appointment.name.toLowerCase().includes(searchTerm)
            )
            .map((appointment, idx) => {
                let bgColor = '#e0f7fa';
                if ([
                    'Home Loan',
                    'Personal Loan',
                    'Education Loan',
                    'Car Loan'
                ].includes(appointment.service)) {
                    bgColor = '#fce4ec';
                }

                return (
                    <div
                        key={idx}
                        className="appointment-card mt-2 p-2 rounded"
                        style={{ backgroundColor: bgColor }}
                        onClick={() => {
                            setFormData({
                                name: appointment.name,
                                service: appointment.service,
                                time: appointment.time,
                                date: key,
                            });
                            setSelectedAppointment({ ...appointment, dateKey: key });
                            setShowModal(true);
                        }}
                    >
                        <div className="fw-bold">{appointment.name}</div>
                        <div className="text-muted">{appointment.service}</div>
                        <div className="small">{appointment.time}</div>
                    </div>
                );
            });
    };

    const getDaysInMonth = () => new Date(selectedYear, selectedMonth, 0).getDate();
    const getFirstDayOfMonth = () => new Date(selectedYear, selectedMonth - 1, 1).getDay();

    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = getFirstDayOfMonth();

    let dayCounter = 1;
    let calendarRows = [];

    for (let i = 0; i < 6; i++) {
        let currentRow = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) {
                currentRow.push(<td key={`${i}-${j}`} className="calendar-cell empty-cell"></td>);
            } else if (dayCounter <= daysInMonth) {
                currentRow.push(
                    <td key={dayCounter} className="calendar-cell">
                        <div className="date-label">{formatDate(dayCounter)}</div>
                        {renderAppointments(dayCounter)}
                    </td>
                );
                dayCounter++;
            } else {
                currentRow.push(<td key={`${i}-${j}`} className="calendar-cell empty-cell"></td>);
            }
        }
        calendarRows.push(<tr key={i}>{currentRow}</tr>);
        if (dayCounter > daysInMonth) break;
    }

    const monthOptions = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="followup-page">
            <Container fluid className="p-4">
                <Row className="align-items-center mb-4">
                    <Col>
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="Search appointments..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center gap-3">
                        <Button variant="secondary" className="shadow-sm">Transfer</Button>
                        <Button variant="primary" className="shadow-sm" onClick={() => setShowModal(true)}>+ Add Schedule</Button>
                    </Col>
                </Row>

                <Row className="justify-content-between align-items-center mb-3">
                    <Col xs="auto" className="d-flex gap-2">
                        <Button variant="outline-primary" active>Month</Button>
                        <Button variant="outline-primary">Week</Button>
                        <Button variant="outline-primary">Day</Button>
                    </Col>
                    <Col xs="auto" className="d-flex gap-2 align-items-center">
                        <Form.Select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                            {monthOptions.map((month, index) => (
                                <option key={index + 1} value={index + 1}>{month}</option>
                            ))}
                        </Form.Select>
                        <Form.Select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                            {[2022, 2023, 2024, 2025].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>

                <div className="calendar-wrapper">
                    <table className="calendar-table">
                        <thead>
                            <tr>
                                {days.map((day, i) => (
                                    <th key={i} className="calendar-head">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{calendarRows}</tbody>
                    </table>
                </div>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedAppointment ? "Edit Schedule" : "Add Schedule"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Client Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Loan Type</Form.Label>
                            <Form.Control as="select" name="service" value={formData.service} onChange={handleFormChange} required>
                                <option>Home Loan</option>
                                <option>Personal Loan</option>
                                <option>Education Loan</option>
                                <option>Car Loan</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="text" name="time" value={formData.time} onChange={handleFormChange} placeholder="e.g. 14:00-16:00" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date (YYYY-MM-DD)</Form.Label>
                            <Form.Control type="text" name="date" value={formData.date} onChange={handleFormChange} placeholder="e.g. 2023-11-28" required />
                        </Form.Group>
                        <Button type="submit" variant="primary">{selectedAppointment ? "Update Schedule" : "Save Schedule"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <style>{`
                .followup-page {
                    background: #f8f9fa;
                    min-height: 100vh;
                }
                .calendar-wrapper {
                    overflow-x: auto;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.05);
                }
                .calendar-table {
                    width: 100%;
                    table-layout: fixed;
                    border-collapse: collapse;
                }
                .calendar-head {
                    background-color: #007bff;
                    color: white;
                    text-align: center;
                    padding: 10px;
                    font-weight: 500;
                    border: 1px solid #dee2e6;
                }
                .calendar-cell {
                    height: 120px;
                    padding: 8px;
                    vertical-align: top;
                    border: 1px solid #dee2e6;
                    background-color: #fff;
                    transition: background 0.3s ease;
                }
                .calendar-cell:hover {
                    background-color: #f1f3f5;
                }
                .empty-cell {
                    background-color: #f8f9fa;
                }
                .date-label {
                    font-weight: bold;
                    font-size: 0.85rem;
                }
                .appointment-card {
                    font-size: 0.75rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}

export default Followup;
