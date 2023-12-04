import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/App.css';
import Modal from "react-bootstrap/Modal";
const API_APP_SERVER_URL = "http://127.0.0.1:3001/";


function ReportList(props) {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDictamenSection, setShowDictamenSection] = useState(false);
  const [judgmentText, setJudgmentText] = useState('');
  const [reportId, setReportId] = useState(-1);
  const [modalDetails, setShowModalDetails] = React.useState(false);

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

  const showReportDetails = (report, show) => {
    setShowModalDetails(show);
    setSelectedReport(report);
    setShowDetails(show);
    setReportId(report.reportId);
    setShowDictamenSection(false);
  };
  
  const handleDictamenChange = (event) => {
    setJudgmentText(event.target.value);
  };

  const saveJudgment = async () => {
    const data = {
      reportId: reportId,
      judgment: judgmentText
    };

    try {
      const response = await axios.put(API_APP_SERVER_URL + 'report/updateReportJudgment', data);
      console.log("Dictamen guardado exitosamente:", response.data);
      setShowModalDetails(false);
      setJudgmentText('');
    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
    }
    console.log("Guardando dictamen:", judgmentText);
    setShowDictamenSection(false);
    setShowDetails(false);
    fetchReports();
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-4 offset-4'>
          <div className='c-grid mx-auto'>
            <h2>Lista de reportes</h2>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div className='table-responsive card'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Lugar</th>
                  <th>Fecha</th>
                  <th>Dictamen</th>
                  <th>Consultar</th>
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
                        onClick={() => showReportDetails(report, true)}>Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal backdrop="static"
       show={modalDetails} onHide={() => setShowModalDetails(false) }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalles del reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { showDetails && selectedReport && (
            <div className='row mt-3'>
              <div className='col-12 col-lg offset-0 offset-lg-0'>
                  <p>ID: {selectedReport.reportId}</p>
                  <p>Fecha: {new Date(selectedReport.date).toLocaleDateString()}</p>
                  <p>Descripción: {selectedReport.declaration}</p>
                  <p>Lugar: {selectedReport.place}</p>
                  <div >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModalDetails(false)}>
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowDictamenSection(true)}>
                    Dar Dictamen
                  </button>
                  </div>
              </div>
            </div>
          )}

          {showDictamenSection && (
            <div className='row mt-3'>
              <div className='col-12 col-lg offset-0 offset-lg-0'>
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
                  onClick={saveJudgment}>
                  Guardar Dictamen
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ReportList;

