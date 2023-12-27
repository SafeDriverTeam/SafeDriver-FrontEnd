import React, { useState } from "react";
import {  Tooltip, OverlayTrigger, Button, Form, Container } from "react-bootstrap";
import NavBarAdmin from "./components/NavBarAdmin";
import "./CSS/App.css"; // Asegúrate de que la ruta es correcta

function BuyInsurancePolicy() {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        serialNumber: '',
        brand: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        policyTerm: '',
        coverageType: '',
        totalAmount: '',
    });

    // Manejo del cambio en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí enviarías los datos a la API o backend
        console.log(formData);
    };

    return (
        <Container fluid>
           <NavBarAdmin />
            <div className="insurance-banner"> </div>
            <Container fluid className="text-center header-container">
                <h1 className="mt-4">En SafeDriver nos preocupamos por ti y tu dinero</h1>
                <p className="mx-auto description-text">
                    En SafeDriver nos comprometemos a ofrecerte los mejores servicios para que 
                    tú y tu vehículo estén protegidos en todo momento. Con nuestras pólizas personalizadas,
                    encontrarás la cobertura que mejor se ajusta a tus necesidades y presupuesto.
                </p>
                <p className="mx-auto description-text">
                    Nuestro objetivo es brindarte tranquilidad mientras estás en la carretera,
                    asegurándonos de que tengas acceso a asistencia rápida y eficaz siempre que la necesites.
                    Ya sea que estés buscando protección contra accidentes, robos o cualquier imprevisto,
                    estamos aquí para apoyarte. Elige SafeDriver como tu aliado en el camino y viaja siempre seguro.
                </p>
            </Container>
            <Form className="buyInsuranceForm" onSubmit={handleSubmit}>
                <h2>DATOS DEL VEHÍCULO</h2>
                
                {/* Campos en línea - Número de serie y Marca */}
                <div className="form-inline-group">
                <Form.Group>
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right-serialNumber`}>
                                Aquí puedes introducir el número de serie único del vehículo.
                            </Tooltip>
                        }
                    >
                        <Form.Label>
                            Número de serie (NIV)
                            <span className="info-icon">ℹ️</span>
                        </Form.Label>
                    </OverlayTrigger>
                    <Form.Control
                        type="text"
                        name="serialNumber"
                        placeholder="1HGBH41JXMN109186"
                        value={formData.serialNumber}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                    <Form.Group>
                    <Form.Label>Marca</Form.Label>
                    <Form.Select 
                        name="brand" 
                        value={formData.brand} 
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione la marca</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Honda">Honda</option>
                        {/* Agrega más marcas según sea necesario */}
                    </Form.Select>
                </Form.Group>
                </div>

                {/* Campos en línea - Modelo y Año */}
                <div className="form-inline-group">
                <Form.Group>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Select 
                        name="model" 
                        value={formData.model} 
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione el modelo</option>
                        <option value="Corolla">Corolla</option>
                        <option value="Sentra">Sentra</option>
                        <option value="Civic">Civic</option>
                        {/* Agrega más modelos según sea necesario */}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Año</Form.Label>
                    <Form.Select 
                        name="year" 
                        value={formData.year} 
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione el año</option>
                        {
                        Array.from(new Array(new Date().getFullYear() - 1979), (val, index) => 1980 + index).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))
                        }
                    </Form.Select>
                </Form.Group>
                </div>

                {/* Campos en línea - Color y Número de placas */}
                <div className="form-inline-group">
                    <Form.Group>
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type="text"
                            name="color"
                            placeholder="Rojo"
                            value={formData.color}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Número de placas del vehículo</Form.Label>
                        <Form.Control
                            type="text"
                            name="licensePlate"
                            placeholder="AAA-123"
                            value={formData.licensePlate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </div>

                <h2>PÓLIZA</h2>
                
                
                <div className="form-inline-group">
                    <Form.Group>
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right-brand`}>
                                Seleccione la duración de la póliza de seguro para tu vehículo.
                            </Tooltip>
                        }
                    >
                        <Form.Label>
                            Plazo de póliza
                            <span className="info-icon">ℹ️</span>
                        </Form.Label>
                    </OverlayTrigger>
                        <Form.Control
                            as="select"
                            name="policyTerm"
                            value={formData.policyTerm}
                            onChange={handleInputChange}
                        >
                            <option>1 AÑO</option>
                            <option>2 AÑOS</option>
                            {/* Agrega más opciones según sea necesario */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right-brand`}>
                                El tipo de cobertura se define por Básico: y Premium:
                            </Tooltip>
                        }
                    >
                        <Form.Label>
                            Tipo de Cobertura
                            <span className="info-icon">ℹ️</span>
                        </Form.Label>
                    </OverlayTrigger>
                        <Form.Control
                            as="select"
                            name="coverageType"
                            value={formData.coverageType}
                            onChange={handleInputChange}
                        >
                            <option>PREMIUM</option>
                            <option>BÁSICA</option>
                            {/* Agrega más opciones según sea necesario */}
                        </Form.Control>
                    </Form.Group>
                </div>

               
                <Button variant="primary" type="submit">
                    Proceder al pago
                </Button>
            </Form>
        </Container>
    );
}

export default BuyInsurancePolicy;
