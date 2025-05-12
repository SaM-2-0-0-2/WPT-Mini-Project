import React, { useEffect, useState, useRef } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const peopleData = {
  president: {
    name: "Dr. Joel Samuel",
    role: "President of IAOH Mumbai (2025-27)",
    description: "I am humbled and honoured to be the President of IAOH Mumbai branch for a period of two years (2025-27).",
    message: "Let us work together in the journey to prevent, promote, cure and rehabilitate health of all people exposed to various health hazards due to their occupation.",
    email: "jasamuel32@gmail.com",
    image: "/joel.png"
  },
  officeBearers: [
    { name: "Dr. Divyang Shah", role: "President", email: "divyang.shah2@larsentoubro.com", image: "/DivyangShah.jpg" },
    { name: "Dr. (Maj) Bishwadeep Paul", role: "Immediate Past President", email: "paul.b1@tpg.com", image: "/paul.png" },
    { name: "Dr. Aditya Paliwal", role: "Hon. Secretary", email: "aditya.paliwal@ril.com", image: "/AdityaPaliwal.jpg" },
    { name: "Dr. Vinit Gaikwad", role: "Hon. Finance Secretary", email: "gaikwadvinit7@gmail.com", image: "/Vinit.jpg" },
    { name: "Dr. Shelly Sagar", role: "Hon. Jr. Secretary", email: "shelly.sagar@bayer.com", image: "/Shelly.png" },
    { name: "Dr. Amruta Desai", role: "Hon. Jr. Finance Secretary", email: "amruta.desai@unilever.com", image: "/Amruta-Desai.jpg" }
  ],
  developers: [
    { name: "Rohan Sharma", role: "Developer", email: "rohansharma0395.3@gmail.com", image: "/Rohan.jpg" },
    { name: "Shriram Narendra Sabade", role: "Developer", email: "shriramnsabade@gmail.com", image: "/Shriram.jpg" },
    { name: "Shankar Sitaram Parab", role: "Developer", email: "parabshankar1810@gmail.com", image: "/Shankar.jpg" }
  ]
};

const Ourteam = () => {
  const [visible, setVisible] = useState({});
  const textRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible((prev) => ({
            ...prev,
            [entry.target.dataset.index]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.2 }
    );

    textRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      textRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      <Container className="py-5">
        <div className="p-3 mb-5" style={{ backgroundColor: 'lightblue', borderRadius: '40px', border: '2px solid skyblue', color: 'black' }}>
          <h2
            className="text-center mb-4"
            style={{
              fontSize: '3rem', /* Increased title font size */
              fontWeight: 'bold',
              opacity: visible['title'] ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
            data-index="title"
            ref={(el) => (textRefs.current[0] = el)}
          >
            From the Desk of President
          </h2>

          <Row className="mb-5 align-items-center">
            <Col md={4} className="text-center">
              <Card.Img src={peopleData.president.image} style={{ width: '100%', height: '400px', borderRadius: '12px', objectFit: 'cover' }} />
            </Col>
            <Col md={8}>
              <h3
                className="text-center fw-bold mb-3"
                style={{ fontSize: '2rem', opacity: visible['president-name'] ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                data-index="president-name"
                ref={(el) => (textRefs.current[1] = el)}
              >
                {peopleData.president.name}
              </h3>
              <p
                style={{ fontSize: '1.2rem', opacity: visible['president-description'] ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                data-index="president-description"
                ref={(el) => (textRefs.current[2] = el)}
              >
                {peopleData.president.description}
              </p>
              <p
                style={{ fontSize: '1.2rem', opacity: visible['president-message'] ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                data-index="president-message"
                ref={(el) => (textRefs.current[3] = el)}
              >
                <i>{peopleData.president.message}</i>
              </p>
              <p
                style={{ fontSize: '1.2rem', opacity: visible['president-email'] ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                data-index="president-email"
                ref={(el) => (textRefs.current[4] = el)}
              >
                {peopleData.president.email}
              </p>
            </Col>
          </Row>
        </div>

        <h3 className="text-center mb-4">Office Bearers<hr/></h3>
        <Row xs={1} md={2} className="g-4">
          {peopleData.officeBearers.map((person, index) => (
            <Col key={index} className="d-flex align-items-stretch">
              <Card className="w-100 h-100 text-center p-3 d-flex flex-column">
                <Card.Img
                  variant="top"
                  src={person.image}
                  style={{
                    height: '500px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title
                      style={{
                        fontSize: '1.2rem',
                        opacity: visible[`office-${index}`] ? 1 : 0,
                        transition: 'opacity 1s ease-in-out'
                      }}
                      data-index={`office-${index}`}
                      ref={(el) => (textRefs.current[5 + index] = el)}
                    >
                      {person.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '1rem' }}>{person.role}</Card.Text>
                  </div>
                  <p className="mt-3 mb-0">{person.email}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

          
        <h3 className="text-center mt-5 mb-4">Developers<hr/></h3>
        <Row xs={1} md={3} className="g-3">
          {peopleData.developers.map((person, index) => (
            <Col key={index} className="d-flex">
              <Card className="text-center p-3 w-100 h-100 d-flex flex-column">
                <Card.Img
                  variant="top"
                  src={person.image}
                  style={{ height: '500px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{person.name}</Card.Title>
                    <Card.Text style={{ fontSize: '1rem' }}>{person.role}</Card.Text>
                  </div>
                  <p className="mt-auto">{person.email}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </>
  );
};

export default Ourteam;