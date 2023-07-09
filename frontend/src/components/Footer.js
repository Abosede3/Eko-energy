import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './HeaderFooter.css' // Import the CSS file for styling

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 footer'>
            © Eko Energy. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
