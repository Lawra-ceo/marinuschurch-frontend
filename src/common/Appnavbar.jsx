import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';




const AppNavbar = () => {
  return (
     <Navbar expand="lg" style={{ position: 'sticky', top: 0, zIndex: 1020, backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <Container>
        <Navbar.Brand href="/"><img src='./images/logo4.jpg' alt='logo' className='logo'></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Centered Nav Links */}
          <Nav className="mx-auto gap-4" style={{ fontWeight: "500" }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/anbiyam">Anbiyam</Nav.Link>
            <Nav.Link href="/service">Services</Nav.Link>
            <Nav.Link href="/pious">pious</Nav.Link>
            <Nav.Link href="/gallery">Gallery</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default AppNavbar;

