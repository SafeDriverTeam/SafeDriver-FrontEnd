import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBarDriver = () => {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/registerEmployee">
                    <img
                        alt=""
                        src="./logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    SafeDriver
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown
                            title="Póliza de seguro"
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item href="/">
                                Comprar póliza
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/">
                                Pólizas compradas
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="Reporte de siniestro"
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item href="/RegisterReport">
                                Levantar reporte
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/HistoryReports">
                                Historial de reportes
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Nav pullRight>
                    <Nav.Link href="/">Salir</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBarDriver;
