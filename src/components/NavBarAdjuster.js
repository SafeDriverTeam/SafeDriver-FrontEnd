import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBarAdjuster = () => {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="/adjusterReport">
                    <img
                        alt=""
                        src="./logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    SafeDriver
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/adjusterReport">
                            Reportes asignados
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav pullRight>
                    <Nav.Link href="/">Salir</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBarAdjuster;
