import axios from 'axios';
import React, { useState, useEffect } from 'react';


function ClientReportsList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://172.28.80.1:3001/report/getByAdjuster/3');
        console.log(response.data.reportList);
        setReports(response.data.reportList);
      } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h1>Reportes:</h1>
        <ul>
          {reports.map(report => (
            <li key={report.reportId}>
              <p>ID: {report.reportId}</p>
              <p>Declaración: {report.declaration}</p>
              <p>Fecha: {report.date}</p>
              <p>Lugar: {report.place}</p>
              <p>Juicio: {report.judgment}</p>
              <p>ID de Póliza: {report.policyId}</p>
              <p>ID de Usuario: {report.userId}</p>
              <hr />
            </li>
          ))}
        </ul>
    </div>
  );
};

export default ClientReportsList;
