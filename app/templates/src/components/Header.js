import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {

    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Reference Application</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Book</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </div>
      );
};

export default Header;