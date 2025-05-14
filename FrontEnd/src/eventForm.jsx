import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { getAdminName } from "./utils/UserData";
import './components/styles/eform.css';
import AdminNavbar from './AdminNavBar';

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventname: '',
    venue: '',
    eventdatetime: '',
    link: '',
    hostname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post('http://localhost:3000/admin/add/event', formData)
    .then((response) => {
      alert('Event added successfully');
      setFormData({
        eventname: '',
        venue: '',
        eventdatetime: '',
        link: '',
        hostname: ''  // Preserve the hostname
      });
    })
    .catch((error) => {
      console.error(error);
      alert('Error adding event');
    });
};


  return (
    <div className='body'>
      <AdminNavbar />
      <Container className="mt-5 mb-5 d-flex justify-content-center">
        <Card className="mt-5 p-4 shadow w-100 mb-5" style={{ maxWidth: '800px' }}>
          <h3 className="text-center mb-4">Add an Event</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="eventname"
                    value={formData.eventname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Venue:</Form.Label>
                  <Form.Control
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="eventdatetime"
                    value={formData.eventdatetime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Link:</Form.Label>
                  <Form.Control
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Host Name:</Form.Label>
              <Form.Control
                type="text"
                name="hostname"
                value={formData.hostname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Center-aligned Submit Button */}
            <div className="d-flex justify-content-center">
              <Button type="submit" className="button">
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default EventForm;
