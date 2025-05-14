import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Calendar, MapPin, User } from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



const EventCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);

  return (
    <>
      <Container className="py-5">
        
        {/* Upcoming Events Header */}
        <h3
          style={{
            backgroundColor: '#6cace4',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          📌 All Events
        </h3>

        <Row xs={1} md={2} lg={3} className="g-4">
          {events.map((event, index) => (
            <Col key={index} className="d-flex justify-content-center">
              <Card
                className="text-center shadow"
                style={{
                  width: '90%',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
                }}
                onClick={() => window.open(event.link, '_blank')}
              >
                <Card.Body>
                  <Calendar size={48} className="mb-3 text-primary" />
                  <h5 style={{ color: 'black', fontWeight: 'bold' }}>
                    {event.eventname}
                  </h5>
                  <p>
                    <MapPin size={16} className="me-2 text-secondary" />
                    <span style={{ color: 'gray', fontSize: '1.1rem' }}>{event.venue}</span>
                  </p>
                  <p>
                    <User size={16} className="me-2 text-secondary" />
                    <span style={{ color: 'gray', fontSize: '1.1rem' }}>{event.hostname}</span>
                  </p>
                </Card.Body>
                <div
                  className="text-white py-2 mb-4"
                  style={{
                    backgroundColor: '#6cace4',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  📅{' '}
                  {new Date(event.eventdatetime).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default EventCard;
