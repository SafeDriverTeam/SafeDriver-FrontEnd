import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/App.css';
const API_APP_SERVER_URL = "http://127.0.0.1:3001/";


function ReportList(props) {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDictamenSection, setShowDictamenSection] = useState(false);
  const [judgmentText, setDictamenText] = useState('');
  const [reportId, setReportId] = useState(-1);

  const fetchReports = async () => {
    try {
      const response = await axios.get(API_APP_SERVER_URL + 'report/getByAdjuster/' + 3);
      setReports(response.data.reportList);
    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const showReportDetails = (report) => {
    setSelectedReport(report);
    setShowDetails(true);
    setReportId(report.reportId);
  };
  
  const handleDictamenChange = (event) => {
    setDictamenText(event.target.value);
  };

  const saveDictamen = async () => {
    const data = {
      reportId: reportId,
      judgment: judgmentText
    };

    try {
      const response = await axios.put(API_APP_SERVER_URL + 'report/updateReportJudgment', data);
      console.log("Dictamen guardado exitosamente:", response.data);
      setShowDictamenSection(false);
    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
    }
    console.log("Guardando dictamen:", judgmentText);
    setShowDictamenSection(false);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 col-lg offset-0 offset-lg-2'>
          <h2>Lista de reportes</h2>
        </div>
      </div>
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
                  <th>Dictamen</th>
                </tr>
              </thead>
              <tbody>
                {reports && reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.reportId}</td>
                    <td>{report.declaration}</td>
                    <td>{report.place}</td>
                    <td>{new Date(report.date).toLocaleDateString()}</td>
                    <td>{report.judgment}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => showReportDetails(report)}>Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showDetails && selectedReport && (
        <div className='row mt-3'>
          <div className='col-12 col-lg offset-0 offset-lg-2'>
            <h3>Detalles del reporte:</h3>
            <p>ID: {selectedReport.reportId}</p>
            <p>Fecha: {new Date(selectedReport.date).toLocaleDateString()}</p>
            <p>Descripción: {selectedReport.declaration}</p>
            <p>Lugar: {selectedReport.place}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowDictamenSection(true)}
            >
              Dar Dictamen
            </button>
          </div>
        </div>
      )}

      {showDictamenSection && (
        <div className='row mt-3'>
          <div className='col-12 col-lg offset-0 offset-lg-2'>
            <h3>Escribir dictamen:</h3>
            <textarea
              value={judgmentText}
              onChange={handleDictamenChange}
              className="form-control"
              rows="4"
              placeholder="Ingrese el dictamen para el reporte"></textarea>
            <button
              type="button"
              className="btn btn-success mt-2"
              onClick={saveDictamen}>
              Guardar Dictamen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportList;

