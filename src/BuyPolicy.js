import React, { useState, useEffect } from "react";
import {  Tooltip, OverlayTrigger, Button, Form, Container, Card, Row, Col,  Toast, ToastContainer, Modal } from "react-bootstrap";
import NavBarAdmin from "./components/NavBarAdmin";
import "./CSS/App.css"; 
import AOS from 'aos';
import axios from "./api/axios";
import 'aos/dist/aos.css';
import Cookies from "js-cookie";
const config = {
  headers: {
    'Authorization': 'Bearer ' + Cookies.get("token")
  }
};
const user = JSON.parse(localStorage.getItem('user'));

function BuyInsurancePolicy() {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [errors, setErrors] = useState({});
    const expirationDate = new Date();
    const [showModal, setShowModal] = useState(false);
    const [vehicleRegistered, setVehicleRegistered] = useState(false);
    const [totalAmount, setTotalAmount] = useState(5000);
    const [formData, setFormData] = useState({
        serialNumber: '',
        brand: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        policyTerm: '1 AÑO', 
        coverageType: 'BÁSICO', 
    });

    const [vehicleData, setVehicleData] = useState({
        brand: '',
        model: '',
        year: '',
        color: '',
        plate: ''
    });

    const policyTypeMapping = {
        'BÁSICO': 1,
        'TOTAL': 2,
        'PREMIUM': 3
    };
    

    const createVehicle = async (vehicleData) => {
        try {
            const response = await axios.post(`vehicle/createVehicle`, vehicleData);
            return response.data;
        } catch (error) {
            console.error('Error creating vehicle:', error);
            throw error;
        }
    };

    const createPolicy = async (policyData) => {
        try {
            const response = await axios.post(`/policy/createPolicy`, policyData);
            return response.data;
        } catch (error) {
            console.error('Error creating policy:', error);
            throw error;
        }
    };    

    useEffect(() => {
        AOS.init({
            duration: 1500, 
            once: true, 
        });
    }, []);

    const handleVehicleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.serialNumber) {
            newErrors.serialNumber = "El NIV es obligatorio.";
        } else if (!/^[0-9A-Z]{17}$/.test(formData.serialNumber)) {
            newErrors.serialNumber = "El NIV debe tener 17 caracteres alfanuméricos.";
        }

        if (!formData.licensePlate) {
            newErrors.licensePlate = "El número de placas es obligatorio.";
        } else if (!/^[A-Z]{3}-\d{3}$/.test(formData.licensePlate)) {
            newErrors.licensePlate = "Formato inválido. Ejemplo: 'AAA-123'.";
        }

        if (!formData.color) {
            newErrors.color = "El color es obligatorio.";
        } else if (!/^[a-zA-Z]+$/.test(formData.color)) {
            newErrors.color = "El color debe contener solo letras.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setToastMessage("Hay errores en el formulario."); 
            setShowToast(true);
        } else {
                try {
                    const vehicleData = {
                        brand: formData.brand,
                        model: formData.model,
                        year: formData.year,
                        color: formData.color,
                        plate: formData.licensePlate,
                        userId: user.userId
                    }; 
                    const response = await createVehicle(vehicleData);
                    console.log('Vehicle created:', response.vehicleId);
                    setFormData({ ...formData, vehicleId: response.vehicleId });
                    setVehicleRegistered(true); 
                    setFormData({ ...formData, vehicleId: response.vehicleId });
                } catch (error) {
                    console.error('Error al crear el vehículo:', error);
                    setVehicleRegistered(false); 
            }
        }
    };
    
    const calculateTotalAmount = (fieldName, fieldValue) => {

        const tarifas = {
            'BÁSICO': {
                '1 AÑO': 1000,
                '2 AÑOS': 1800,
                '5 AÑOS': 4000,
                '10 AÑOS': 7000,
            },
            'TOTAL': {
                '1 AÑO': 1500,
                '2 AÑOS': 2800,
                '5 AÑOS': 6000,
                '10 AÑOS': 10000,
            },
            'PREMIUM': {
                '1 AÑO': 2000,
                '2 AÑOS': 3500,
                '5 AÑOS': 8000,
                '10 AÑOS': 15000,
            },
        };
        let selectedCoverage = formData.coverageType;
        let selectedPolicyTerm = formData.policyTerm;

        if (fieldName === "policyTerm") {
            selectedPolicyTerm = fieldValue;
        } else if (fieldName === "coverageType") {
            selectedCoverage = fieldValue;
        }

        const selectedAmount = tarifas[selectedCoverage][selectedPolicyTerm];
        setTotalAmount(selectedAmount);
        };

        

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        calculateTotalAmount(name, value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.serialNumber) {
            newErrors.serialNumber = "El NIV es obligatorio.";
        } else if (!/^[0-9A-Z]{17}$/.test(formData.serialNumber)) {
            newErrors.serialNumber = "El NIV debe tener 17 caracteres alfanuméricos.";
        }

        if (!formData.licensePlate) {
            newErrors.licensePlate = "El número de placas es obligatorio.";
        } else if (!/^[A-Z]{3}-\d{3}$/.test(formData.licensePlate)) {
            newErrors.licensePlate = "Formato inválido. Ejemplo: 'AAA-123'.";
        }

        if (!formData.color) {
            newErrors.color = "El color es obligatorio.";
        } else if (!/^[a-zA-Z]+$/.test(formData.color)) {
            newErrors.color = "El color debe contener solo letras.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setToastMessage("Hay errores en el formulario."); 
            setShowToast(true);
        } else {
            calculateTotalAmount(); 
            setShowModal(true);
        }
    };
    

    return (
        <React.Fragment>
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
          
        <Container fluid>
           <NavBarAdmin />
            <div className="insurance-banner" data-aos="slide-right"> </div>
            <Container fluid className="text-center header-container">
                <h1 className="mt-4" data-aos="fade-up">En SafeDriver nos preocupamos por ti y tu dinero</h1>
                <p className="mx-auto description-text"  data-aos="fade-up">
                    En SafeDriver nos comprometemos a ofrecerte los mejores servicios para que 
                    tú y tu vehículo estén protegidos en todo momento. Con nuestras pólizas personalizadas,
                    encontrarás la cobertura que mejor se ajusta a tus necesidades y presupuesto.
                </p>
                <p className="mx-auto description-text"  data-aos="fade-up">
                    Nuestro objetivo es brindarte tranquilidad mientras estás en la carretera,
                    asegurándonos de que tengas acceso a asistencia rápida y eficaz siempre que la necesites.
                    Ya sea que estés buscando protección contra accidentes, robos o cualquier imprevisto,
                    estamos aquí para apoyarte. Elige SafeDriver como tu aliado en el camino y viaja siempre seguro.
                </p>
            </Container>
            <Row className="my-4">
                {/* Plan Básico */}
                <Col md={4} data-aos="fade-up">
                    <Card >
                        <Card.Body className="card-custom">
                            <Card.Title >Básico</Card.Title>
                            <Card.Text className="card-custom">
                            El Plan Básico está diseñado para brindarte protección esencial a un precio accesible. Ideal para conductores que buscan cobertura básica, este plan incluye:
                            <br /><br /><strong>Daño a Terceros:</strong> Cubre los daños que puedas causar a otros vehículos o propiedades en un accidente.
                            <br /><strong>Daños Físicos a Terceros:</strong> Ofrece protección en caso de lesiones físicas a terceros derivadas de un accidente.
                            <br /><strong>Asistencia Legal</strong> Proporciona asesoría y apoyo legal para enfrentar procesos judiciales relacionados con accidentes de tránsito.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Plan Total */}
                <Col md={4} data-aos="fade-up" >
                    <Card  >
                        <Card.Body className="card-custom">
                            <Card.Title >Total</Card.Title>
                            <Card.Text className="card-custom">
                            El Plan Total es perfecto para aquellos que buscan una cobertura más amplia. Este plan incluye todas las ventajas del Plan Básico, más algunas adicionales para una mayor tranquilidad:
                            <br /><br /><strong>Servicios Médicos:</strong> Proporciona cobertura para gastos médicos en caso de accidentes.
                            <br /><strong>Robo Total de Auto:</strong> Asegura tu vehículo contra robo total.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Plan Premium */}
                <Col md={4} data-aos="fade-up">
                    <Card >
                        <Card.Body className="card-custom">
                            <Card.Title className="card-custom">Premium</Card.Title>
                            <Card.Text className="card-custom">
                            El Plan Premium es nuestra oferta más completa, brindando una protección integral para ti y tu vehículo.Incluye todas las características del Plan Total, además de servicios exclusivos:
                            <br /> <br /><strong>Auxilio Vial:</strong> Asistencia en carretera para situaciones de emergencia, como averías o accidentes.
                            <br /><strong>Daño a Auto Personal:</strong> Cobertura de daños a tu propio vehículo, incluyendo accidentes y eventos naturales.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Form className="buyInsuranceForm" onSubmit={handleSubmit} data-aos="fade-up">
                <h2>DATOS DEL VEHÍCULO</h2>
                
                {/* Campos en línea - Número de serie y Marca */}
                <div className="form-inline-group">
                <Form.Group>
                    <Form.Label>Número de serie (NIV)</Form.Label>
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right-serialNumber`}>
                                Aquí puedes introducir el número de serie único del vehículo.
                            </Tooltip>
                        }
                    >
                        <Form.Control
                            type="text"
                            name="serialNumber"
                            placeholder="1HGBH41JXMN109186"
                            value={formData.serialNumber}
                            onChange={handleInputChange}
                            isInvalid={!!errors.serialNumber}
                        />
                    </OverlayTrigger>
                    <Form.Control.Feedback type="invalid">
                        {errors.serialNumber}
                    </Form.Control.Feedback>
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
                        isInvalid={!!errors.color}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.color}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Número de placas del vehículo</Form.Label>
                    <Form.Control
                        type="text"
                        name="licensePlate"
                        placeholder="AAA-123"
                        value={formData.licensePlate}
                        onChange={handleInputChange}
                        isInvalid={!!errors.licensePlate}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.licensePlate}
                    </Form.Control.Feedback>
                </Form.Group>
                </div>
                
                <Button 
                    variant={vehicleRegistered ? "success" : "secondary"} 
                    onClick={handleVehicleSubmit}
                    disabled={vehicleRegistered} 
                >
                    {vehicleRegistered ? <><i className="bi bi-check2"></i> Registrado</> : 'Registrar Vehículo'}
                </Button>
                
                
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
                            <option>5 AÑOS</option>
                            <option>10 AÑOS</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right-brand`}>
                                El tipo de cobertura se define por Básico, Total y Premium.
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
                            <option>BÁSICO</option>
                            <option>TOTAL</option>
                            <option>PREMIUM</option>
                           
                        </Form.Control>
                    </Form.Group>
                </div>
                <h2>Monto Total a Pagar: ${totalAmount}</h2>
               
                <Button variant="primary" type="submit">
                    Proceder al pago
                </Button>
            </Form>
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmación de Compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>Monto Total a Pagar: <strong>${totalAmount}</strong></p> 
                <p>Confirma que deseas comprar la póliza de seguro para tu vehículo.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={async () => {
                    try {
                        expirationDate.setFullYear(expirationDate.getFullYear() + parseInt(formData.policyTerm));
                        const policyData = {
                                acquisitionDate: new Date().toISOString(),
                                amount: totalAmount,
                                expirationDate,
                                vehicleId: formData.vehicleId,
                                userId: user.userId,
                                typePolicy: policyTypeMapping[formData.coverageType] || 0 
                        };
                        await createPolicy(policyData);
                        setShowModal(false);
                        // Mostrar mensaje de éxito o redirigir según sea necesario
                    } catch (error) {
                        // Manejar el error
                    }
                }}>
                    Confirmar Compra
                </Button>
            </Modal.Footer>
        </Modal>

        </React.Fragment>
    );
}

export default BuyInsurancePolicy;
