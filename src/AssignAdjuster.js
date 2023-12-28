import React, { useState } from 'react';
import { Button, Form, Table, Modal, Container } from 'react-bootstrap';
import NavBarAdmin from './components/NavBarAdmin';
function AssignAdjuster() {
    const initialSiniestros = [
        { id: 1, description: 'Choque leve', adjuster: '' },
        { id: 2, description: 'Robo de vehículo', adjuster: 'Ajustador 1' },
        { id: 3, description: 'Daño por granizo', adjuster: '' },
    ];

    const [siniestros, setSiniestros] = useState(initialSiniestros);
    const [selectedAdjuster, setSelectedAdjuster] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedSiniestro, setSelectedSiniestro] = useState(null);

    const handleAssignClick = (siniestroId) => {
        if (selectedAdjuster) {
            setSelectedSiniestro(siniestroId);
            setShowConfirmation(true);
        } else {
            //TODO Mostrar algún mensaje de error o marcar el combo box como inválido
        }
    };

    const handleConfirmAssign = () => {
        // Aquí iría la lógica para asignar el ajustador al siniestro
        setShowConfirmation(false);
    };

    return (
        
        <Container fluid>
            <NavBarAdmin />
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
                        <tr key={siniestro.id}>
                            <td>{siniestro.id}</td>
                            <td>{siniestro.description}</td>
                            <td>{siniestro.adjuster || 'No asignado ⚠'}</td>
                            <td>
                                <Form.Group>
                                    <Form.Select
                                        value={selectedAdjuster}
                                        onChange={(e) => setSelectedAdjuster(e.target.value)}
                                    >
                                        <option value="">Seleccione un ajustador</option>
                                        {/* Suponiendo que tienes un array de ajustadores */}
                                        {/* adjusters.map((adjuster) => (
                                            <option key={adjuster.id} value={adjuster.id}>
                                                {adjuster.name}
                                            </option>
                                        )) */}
                                    </Form.Select>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleAssignClick(siniestro.id)}
                                    >
                                        Asignar
                                    </Button>
                                </Form.Group>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

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
