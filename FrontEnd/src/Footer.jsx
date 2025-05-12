import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    Instagram,
    Linkedin,
    Youtube
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    const XLogo = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
    );

    return (
        <footer className="bg-primary text-white py-4 position-relative">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>IAOH Mumbai</h5>
                        <p className='text-justify'>
                            Indian Association of Occupational Health, Mumbai Branch is a professional organization 
                            dedicated to the promotion and advancement of occupational health in India.
                        </p>
                        <p>© 2025 IAOH Mumbai. All rights reserved.</p>
                    </Col>
                </Row>

                {/* Social Icons at Bottom Right */}
                <div
                    className="position-absolute"
                    style={{ right: '20px', bottom: '20px' }}
                >
                    <div className="d-flex gap-3">
                        <a href="https://twitter.com/iaoh_india" target="_blank" rel="noopener noreferrer" className="text-white">
                            <XLogo />
                        </a>
                        <a href="https://www.instagram.com/iaohindia/" target="_blank" rel="noopener noreferrer" className="text-white">
                            <Instagram size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/iaohindia/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="text-white">
                            <Linkedin size={24} />
                        </a>
                        <a href="http://www.youtube.com/@indianassociationofoccupat4405" target="_blank" rel="noopener noreferrer" className="text-white">
                            <Youtube size={24} />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
