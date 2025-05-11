import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/AboutUs.css';

const AboutUs = () => {
  const sections = useRef([]);
  const images = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          } else {
            entry.target.classList.remove('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    images.current.forEach((image) => {
      if (image) observer.observe(image);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Container fluid>

      {/* Header Section */}
      <Row
        ref={(el) => sections.current.push(el)}
        className="position-relative text-center fade-section header-section"
        style={{ height: '400px', overflow: 'hidden' }}
      >
        <Image
          src="/header-image.jpg"
          alt="Colorful cityscape"
          fluid
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <h1 className="position-absolute top-50 start-50 translate-middle header-title" style={{ color: 'white', WebkitTextStroke: '1.5px black' }}>
          About IAOH Mumbai
        </h1>
      </Row>

      {/* Main Content */}
      <Container className="my-5">
        <h2 className="fade-section main-heading" ref={(el) => sections.current.push(el)}>
          IAOH Mumbai
        </h2>
        <p
          ref={(el) => sections.current.push(el)}
          className="fade-section main-paragraph"
        >
          Indian Association of Occupational Health, Mumbai Branch is registered as a Public Trust with Charity Commissioner Regn. No. E-1134 (Bom).
          It was incorporated on 16 July 1955 and formerly known as Society for Study of Industrial Medicine, India – Bombay Branch.
          The Association is affiliated to its all India Body viz. "Indian Association of Occupational Health" and is a not-for-profit voluntary professional organization.
        </p>
        <p
          ref={(el) => sections.current.push(el)}
          className="fade-section main-paragraph"
        >
          As a Non-Government Organization (NGO), it is registered under Section 80G. IAOH Mumbai Branch is also registered with the Central Govt for undertaking
          Corporate Social Responsibility Policy (CSR) activities of Indian Companies and has CSR Registration Certificate (Form CSR-1).
        </p>
      </Container>

      {/* Conference Image */}
      <Container className="mb-5">
        <Image
          src="/conference.jpg"
          alt="Conference Image"
          fluid
          ref={(el) => images.current.push(el)}
          className="fade-section zoom-image"
        />
      </Container>

      {/* Objectives Section */}
      <Container fluid className="bg-dark text-white py-5">
        <Container>
          <h3 className="fw-bold mb-4 fade-section" ref={(el) => sections.current.push(el)}>
            Aims and Objectives of the association are
          </h3>
          <ul className="objectives-list">
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To study problems and conduct and manage research for the causes, treatment and prevention of occupational diseases.
            </li>
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To provide guidance to Industries with regard to the problems of occupational and environmental medicine and hygiene.
            </li>
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To secure effective and complete organization of the members of the Association.
            </li>
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To maintain liaison with National and International Organizations interested in Occupational and Environmental Health problems.
            </li>
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To unite, amalgamate with or absorb, create or constitute or assist in creating or constituting any other society or Association with similar and allied objects.
            </li>
          </ul>
        </Container>
      </Container>

      {/* For Achieving Objectives */}
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Image
              src="/objectives.png"
              alt="Objectives Image"
              fluid
              ref={(el) => images.current.push(el)}
              className="fade-section zoom-image objectives-image"
            />

          </Col>
          <Col md={6}>
            <h4 className="text-primary fw-bold mb-3 fade-section" ref={(el) => sections.current.push(el)}>
              For achieving these objectives, the Association:
            </h4>
            <ul className="objectives-list">
              <li ref={(el) => sections.current.push(el)} className="fade-section">
                Holds periodical meetings and conferences of the members of the Association and the medical profession in general.
              </li>
              <li ref={(el) => sections.current.push(el)} className="fade-section">
                Arranges congresses, conferences, lectures, discussions, and demonstrations on various aspects of occupational health, safety, and allied sciences.
              </li>
              <li ref={(el) => sections.current.push(el)} className="fade-section">
                Publishes and circulates appropriate communication of a character specially adopted to the needs of the members.
              </li>
              <li ref={(el) => sections.current.push(el)} className="fade-section">
                Encourages research in occupational medicine and allied sciences with grants out of the funds of the Association.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AboutUs;
