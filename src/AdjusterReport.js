import React, { useState, useEffect } from 'react';
import axios from "./api/axios";
import './CSS/App.css';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import Cookies from "js-cookie";
const REPORTS_URL = "report/";
const IMAGES_URL = "imageReport/";

const config = {
  headers: {
    'Authorization': 'Bearer ' + Cookies.get("token")
  }
};

function AdjusterReport() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDictamenSection, setShowDictamenSection] = useState(false);
  const [judgmentText, setJudgmentText] = useState('');
  const [reportId, setReportId] = useState(-1);
  const [modalDetails, setShowModalDetails] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSaveErrorModal, setShowSaveErrorModal] = useState(false);

  const fetchReports = async () => {
    try {
      const response = await axios.get(REPORTS_URL + 'getByAdjuster/' + 3, config);
      setReports(response.data.reportList);
    } catch (error) {
      setError('Hubo un problema al obtener los reportes');
      setShowErrorModal(true);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const showReportDetails = (report, show) => {
    try {
      const response = axios.get(IMAGES_URL + 'getByReportId/' + report.reportId);
      setImages(response.data);
      setShowModalDetails(show);
      setSelectedReport(report);
      setShowDetails(show);
      setReportId(report.reportId);
      setShowDictamenSection(false);
    }
    catch (error) {
      setError('Hubo un problema al obtener las imagenes del reporte');
      setShowErrorModal(true);
    }
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
      const response = await axios.put(REPORTS_URL + 'report/updateReportJudgment', data);
      console.log("Dictamen guardado exitosamente:", response.data);
      setShowModalDetails(false);
      setJudgmentText('');
    } catch (error) {
      setError('Hubo un problema al guardar el dictamen, por favor reintentelo');
      setShowSaveErrorModal(true);
    }
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
        centered>
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
          {showDetails && images.length > 0 && (
            <div className='row mt-3'>
              <div className='col-12 col-lg offset-0 offset-lg-0'>
                <h3>Imágenes:</h3>
                <div>
                  {images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Imagen ${index}`}
                      style={{ width: '200px', height: 'auto', marginRight: '10px' }}
                    />
                  ))}
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

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={reloadPage}>
            Recargar
          </Button>
          <Button variant="primary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSaveErrorModal} onHide={() => setShowSaveErrorModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={saveJudgment}>
            Reintentar
          </Button>
          <Button variant="primary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdjusterReport;
