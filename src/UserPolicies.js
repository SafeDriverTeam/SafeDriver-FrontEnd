import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import NavBarAdmin from './components/NavBarAdmin';
import { format, parseISO } from 'date-fns';
import axios from "./api/axios";
import Cookies from "js-cookie";
const config = {
  headers: {
    'Authorization': 'Bearer ' + Cookies.get("token")
  }
};
const user = JSON.parse(localStorage.getItem('user'));

function UserPolicies() {
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.userId) {
                    const response = await axios.get(`policy/getPoliciesByUserId/${user.userId}`);
                    setPolicies(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
              
            }
        };

        fetchPolicies();
    }, []);
    
    console.log(user.userId)
    const formatDate = (dateString) => {
        try {
            const date = parseISO(dateString);
            return format(date, 'dd/MM/yyyy'); 
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString; 
        }
    };

    function formatPolicyType(type) {
        switch(type) {
            case 1:
                return 'Básico';
            case 2:
                return 'Premium';
            default:
                return 'Desconocido'; 
        }
    }
    

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
                        <tr key={policy.policyId}>
                            <td>{policy.policyId}</td>
                            <td>{formatDate(policy.acquisitionDate)}</td>
                            <td>${policy.amount}</td>
                            <td>{formatDate(policy.expirationDate)}</td>
                            <td>{policy.vehicleId}</td>
                            <td>{formatPolicyType(policy.typePolicy)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </>
    );
}

export default UserPolicies;
