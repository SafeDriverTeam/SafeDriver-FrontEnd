import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_APP_SERVER_URL = "http://127.0.0.1:3001/"

function ReportList(props) {
  const [reports, setReports] = useState()

  const fetchReports = async () => {
    try {
      axios.get(API_APP_SERVER_URL + 'report/getByAdjuster/' + 3)
      .then((response) => {
        setReports(response.data.reportList);
        console.log(response);
      });
    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error)
    }
  };

  useEffect(() => {
    fetchReports();
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-12 col-lg offset-0 offset-lg-2'>
          <div className='table-responsive'>
            <table className='table table-responsive'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Lugar</th>
                </tr>
              </thead>
              <tbody>
                {reports && reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.date}</td>
                    <td>{report.description}</td>
                    <td>{report.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportList;
