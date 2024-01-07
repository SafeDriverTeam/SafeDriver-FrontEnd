import React, { useState,useEffect  } from 'react';
import { Button, Form, Table, Modal, Container } from 'react-bootstrap';
import NavBarExecutive from './components/NavBarExecutive';
import axios from "./api/axios";
import noSiniestrosImage from './img/asignar.png';
import Cookies from "js-cookie";
const config = {
  headers: {
    'Authorization': 'Bearer ' + Cookies.get("token")
  }
};
function AssignAdjuster() {

    const [siniestros, setSiniestros] = useState('');
    const [selectedAdjuster, setSelectedAdjuster] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedSiniestro, setSelectedSiniestro] = useState(null);
    const [adjusters, setAdjusters] = useState([]);
    
    useEffect(() => {
        axios.get('report/adjusters') 
            .then(response => {
                setAdjusters(response.data);
            })
            .catch(error => {
                console.error('Error fetching adjusters:', error);
            });

        fetchSiniestros(); // Llamar a la función para obtener los siniestros
    }, []);
    

    const fetchSiniestros = () => {
        axios.get('report/getReportsWithoutAdjuster')
            .then(response => {
                setSiniestros(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    

    const handleAssignClick = (siniestroId) => {
        if (selectedAdjuster) {
            setSelectedSiniestro(siniestroId);
            setShowConfirmation(true);
        } else {
            console.log("Ajustador no seleccionado");
        }
    };
    

    const handleConfirmAssign = () => {
        if (selectedSiniestro && selectedAdjuster) {
            axios.put('report/setAdjuster', { 
                reportId: selectedSiniestro, 
                adjusterId: selectedAdjuster 
            })
            .then(response => {
                console.log("Asignación exitosa", response);
                const updatedSiniestros = siniestros.map(siniestro => {
                    if (siniestro.reportId === selectedSiniestro) {
                        return { ...siniestro, adjuster: selectedAdjuster }; 
                    }
                    return siniestro;
                });
                setSiniestros(updatedSiniestros);
                fetchSiniestros()
                setShowConfirmation(false);
            })
            .catch(error => {
                console.error('Error al asignar ajustador:', error);
            });
        } else {
            console.log("Selecciona un ajustador y un siniestro para continuar");
        }
    };
    

    return  (
        <Container fluid>
            <NavBarExecutive />
            <br></br>
            <h2>Asignación de ajustador a siniestro</h2>
            <br></br>

            {siniestros.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID Siniestro</th>
                            <th>Descripción</th>
                            <th>Ajustador Asignado</th>
                            <th>Asignar Ajustador</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siniestros.map((siniestro) => (
                            <tr key={siniestro.reportId}>
                                <td>{siniestro.reportId}</td>
                                <td>{siniestro.declaration}</td>
                                <td>{siniestro.adjuster || 'No asignado ⚠'}</td>
                                <td>
                                    <Form.Group>
                                        <Form.Select 
                                            name="adjuster" 
                                            value={selectedAdjuster} 
                                            onChange={(e) => setSelectedAdjuster(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione un ajustador</option>
                                            {adjusters.map((adjuster) => (
                                                <option key={adjuster.userId} value={adjuster.userId}>
                                                    {adjuster.name} {adjuster.surnames}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Button 
                                            variant="primary" 
                                            onClick={() => handleAssignClick(siniestro.reportId)}
                                        >
                                            Asignar
                                        </Button>
                                    </Form.Group>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div className="text-center">
                    <img src={noSiniestrosImage} alt="No hay siniestros" style={{ width: '300px', marginBottom: '20px' }} />
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>¡No hay siniestros sin ajustador asignado por ahora!</p>
                </div>
            )}

            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de asignar este ajustador al siniestro?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAssign}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AssignAdjuster;
