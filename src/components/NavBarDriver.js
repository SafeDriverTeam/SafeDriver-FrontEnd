import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBarDriver = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">SafeDriver</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Póliza de seguro" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">
                                Comprar póliza
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/">
                                Pólizas compradas
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Reporte de siniestro" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">
                                Levantar reporte
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/">
                                Historial de reportes
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarDriver;
