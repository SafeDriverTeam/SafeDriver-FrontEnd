import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import NavBarAdmin from './components/NavBarAdmin'; // Asegúrate de que la ruta de importación sea correcta

function UserPolicies() {
    // Supongamos que tienes una función para obtener las pólizas de un usuario
    // Por ahora, usaré datos ficticios para el ejemplo
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        // Aquí harías la llamada a tu API para obtener las pólizas del usuario
        // Simularemos datos ficticios
        setPolicies([
            {
                id: 1,
                acquisitionDate: '2023-01-01',
                amount: '1200',
                expirationDate: '2024-01-01',
                vehicleId: 'V123',
                userId: 'U456',
                policyType: 'Completa'
            },
            // ... más pólizas ...
        ]);
    }, []);

    return (
        <>
            <NavBarAdmin />
            <Container>
                <h2>Mis Pólizas</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha de Adquisición</th>
                            <th>Monto</th>
                            <th>Fecha de Expiración</th>
                            <th>ID del Vehículo</th>
                            <th>Tipo de Póliza</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policies.map(policy => (
                            <tr key={policy.id}>
                                <td>{policy.id}</td>
                                <td>{policy.acquisitionDate}</td>
                                <td>${policy.amount}</td>
                                <td>{policy.expirationDate}</td>
                                <td>{policy.vehicleId}</td>
                                <td>{policy.policyType}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default UserPolicies;
