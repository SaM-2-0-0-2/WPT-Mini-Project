import { FaInfoCircle } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import reactLogo from '../assets/Logo.svg';

export function Intropara() {
  return (
    <Container data-aos="fade-in">
      <Row className="align-items-center">
        <Col sm={4}>
          <img src={reactLogo} alt="IAOH Logo" className="d-flex justify-content-center" style={{ width: '80%', height: 'auto' }} />
        </Col>
        <Col sm={8}>
          <h1 className="text-center introparaheader">IAOH Mumbai</h1>
          <p className="para">
            Indian Association of Occupational Health, Mumbai Branch is registered as Public Trust with Charity Commissioner Regn. No. E-1134 (Bom). It was incorporated on 16 July 1955 and formerly known as Society for Study of Industrial Medicine, India – Bombay Branch. The Association is affiliated to its all India Body viz. “Indian Association of Occupational Health” and is a not-for-profit voluntary professional organization.
          </p>
          <p className="para">
            As a Non-Government Organization (NGO), it is registered under Section 80G. IAOH Mumbai Branch is also registered with the Central Govt for undertaking Corporate Social Responsibility Policy (CSR) activities of Indian Companies and has CSR Registration Certificate (Form CSR-1).
          </p>
        </Col>
      </Row>
    </Container>
  );
}
