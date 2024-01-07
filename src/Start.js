import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AppStart.css';
import { Container, Row, Col, Navbar, Nav, Image } from 'react-bootstrap';

function Start() {
    return (
        <div>
            <div className="start">
              <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="./logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    SafeDriver
                </Navbar.Brand>
                <Nav pullRight>
                    <Nav.Link href="/home">Ingresar</Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>


            <div className="container-fluid">
                <Container fluid className="py-5 back">
                </Container>
            </div>


            <div>
            <Container className="my-1 py-5 text-center">
                <h1>Bienvenido a HCI SafeDriver</h1>
                <p>Protege tu auto con los mejores seguros.</p>
                <Image className='logo' src="./logo.png" fluid />
            </Container>
    
            <Container>
                <Row>
                <Col className='margins'>
                    <Row>
                    <h2 id="about">Sobre Nosotros</h2>
                    <p>En SafeDriver, nos dedicamos a proteger lo que más valoras: tu vehículo y tu tranquilidad. Somos una empresa comprometida con la excelencia en el servicio, brindando soluciones integrales de seguros de automóviles adaptadas a las necesidades únicas de cada conductor. Nuestro enfoque se centra en la seguridad, la confianza y la satisfacción del cliente, ofreciendo coberturas flexibles, atención personalizada y asesoramiento experto. Con un equipo de profesionales apasionados y una trayectoria de confianza y transparencia, nos esforzamos por ser tu socio confiable en la protección de tu vehículo, acompañándote en cada viaje con tranquilidad y respaldo.</p>
                    </Row>
                    <Row>
                    <h2 id="mission">Misión</h2>
                    <p>Nuestra misión es proporcionar soluciones integrales de seguros de automóviles que superen las expectativas de nuestros clientes. Estamos comprometidos con la seguridad y la tranquilidad de quienes confían en nosotros para proteger sus activos más preciados. A través de un equipo altamente capacitado, valores éticos y un enfoque centrado en el cliente, nos esforzamos por ofrecer servicios personalizados, ágiles y de calidad, adaptados a las necesidades cambiantes del mercado.</p>
                    </Row>
                    <Row>
                    <h2 id="vision">Visión</h2>
                    <p>Ser la empresa líder en la industria de seguros de automóviles, ofreciendo soluciones confiables y accesibles que brinden tranquilidad y protección a nuestros clientes en cada viaje que emprendan. Nos esforzamos por mantenernos a la vanguardia de la tecnología y las prácticas sostenibles, brindando un servicio excepcional y construyendo relaciones a largo plazo basadas en la confianza y la transparencia.</p>
                    </Row>

                </Col>
                <Col className='margins'>
                    <Row>
                    <h2 id="history">Historia</h2>
                    <p>SafeDriver fue fundada en 2005 por un grupo de emprendedores que buscaban brindar soluciones integrales de seguros de automóviles a conductores de todo el país. Con el objetivo de ofrecer un servicio personalizado y de calidad, la empresa se ha convertido en una de las compañías de seguros de automóviles más grandes del país, con más de 100 sucursales y 1.000 empleados.</p>
                    </Row>
                </Col>
                <Col className='margins'>
                    <Row>
                        <h2 id="services">Nuestros Servicios</h2>
                        <ul>
                        <li>Seguro de responsabilidad civil</li>
                        <li>Seguro de daños propios</li>
                        <li>Asistencia en carretera</li>
                        </ul>
                    </Row>
                    <Row>
                        <h2 id="values">Nuestros Valores</h2>
                        <ul>
                        <li>Compromiso</li>
                        <li>Confianza</li>
                        <li>Excelencia</li>
                        <li>Integridad</li>
                        <li>Responsabilidad</li>
                        <li>Transparencia</li>
                        </ul>
                    </Row>
                    <Row>
                        <Image src="./clients.jpg" fluid />
                    </Row>

                </Col>
                </Row>
        
                <hr />
        
                <h2 id="contact">Contacto</h2>
                <p>Información de contacto de la empresa.</p>
                <Row>
                <Col>
                    <h3>Oficina Central</h3>
                    <p>Av. Xalapa</p>
                    <p>Horario de atención: 9:00 a 18:00</p>
                    <p>Teléfono: 555-45213</p>
                </Col>
                <Col>
                    <h3>Sucursal Norte</h3>
                    <p>Av. Orizaba</p>
                    <p>Horario de atención: 9:00 a 18:00</p>
                    <p>Teléfono: 555-57893</p>
                </Col>
                </Row>  
            </Container>
            </div>
          </div>
        </div>
      );
    }

export default Start;
