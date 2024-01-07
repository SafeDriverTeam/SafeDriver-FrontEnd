import React, { useState, useEffect } from 'react';
import axios from "./api/axios";
import NavBarAdjuster from "./components/NavBarAdjuster";
import './css/App.css';
import Table  from 'react-bootstrap/Table';
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
const user = JSON.parse(localStorage.getItem('user'));

function AdjusterReport() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDictamenSection, setShowDictamenSection] = useState(false);
  const [judgmentText, setJudgmentText] = useState('');
  const [reportId, setReportId] = useState(-1);
  const [modalDetails, setShowModalDetails] = React.useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSaveErrorModal, setShowSaveErrorModal] = useState(false);

  const fetchReports = async () => {
    try {
      const response = await axios.get(REPORTS_URL + 'getByAdjuster/' + user.userId, config);
      setReports(response.data.reportList);
    } catch (error) {
      setError('Hubo un problema al obtener los reportes');
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      const token = Cookies.get("token");
      const user = JSON.parse(localStorage.getItem('user'));

      if (token && user) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        try {
          const response = await axios.get(REPORTS_URL + 'getByAdjuster/' + user.userId, config);
          setReports(response.data.reportList);
        } catch (error) {
          setError('Hubo un problema al obtener los reportes');
          setShowErrorModal(true);
        }
      }
    };

    fetchReports();
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  const showReportDetails = async (reportData, show) => {
    try {
      const response = await axios.get(IMAGES_URL + 'getByReportId/' + reportData.report.reportId, config);
      setImages(response.data.images);
      setShowModalDetails(show);
      setSelectedReport(reportData);
      setShowDetails(show);
      setReportId(reportData.report.reportId);
      setJudgmentText(reportData.report.judgment);
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
    const validText = /^[A-Za-z0-9\u00C0-\u024F\s]+$/;

    const trimmedText = judgmentText.trim();
    setJudgmentText(trimmedText);

    if (!judgmentText) {
      alert('El dictamen no puede estar vacío.');
      return;
    } else if (!validText.test(judgmentText)) {
      alert('Ingresa un dictamen válido que solo contenga letras, números y espacios.');
      return;
    }

    const data = {
      reportId: reportId,
      judgment: judgmentText
    };

    try {
      const response = await axios.put(REPORTS_URL + 'updateReportJudgment', data, config);
      setShowModalDetails(false);
      setJudgmentText('');
      setShowDictamenSection(false);
      fetchReports();
      setShowSaveErrorModal(false);
    } catch (error) {
      setError('Hubo un problema al guardar el dictamen, por favor reintentelo');
      setShowSaveErrorModal(true);
    }
  };

  return (
    <div>
      <NavBarAdjuster />
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
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Descripción</th>
                    <th>Lugar</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Vehiculo</th>
                    <th>Dictamen</th>
                    <th>Consultar</th>
                  </tr>
                </thead>
                <tbody>
                  {reports && reports.map((reportData) => (
                    <tr key={reportData.report.id}>
                      <td>{reportData.report.reportId}</td>
                      <td>{reportData.report.declaration}</td>
                      <td>{reportData.report.place}</td>
                      <td>{new Date(reportData.report.date).toLocaleDateString()}</td>
                      <td>{reportData.user.name} {reportData.user.surnames}</td>
                      <td>{reportData.vehicle.brand} {reportData.vehicle.model}</td>
                      <td>{reportData.report.judgment}</td>
                      <td>
                        <button
                          type="button"
                          className="primary"
                          onClick={() => showReportDetails(reportData, true)}>Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
            {showDetails && selectedReport && (
              <div className='container-fluid mt-3'>
                <div className='row'>
                  <div className='col text-center'>
                    <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Cliente: {selectedReport.user.name} {selectedReport.user.surnames}</p>
                  </div>
                </div>
                <div className='row'>
                <div className='col-lg-6'>
                    <h5>Reporte</h5>
                    <p>ID: {selectedReport.report.reportId}</p>
                    <p>Fecha: {new Date(selectedReport.report.date).toLocaleDateString()}</p>
                    <p>Descripción: {selectedReport.report.declaration}</p>
                    <p>Lugar: {selectedReport.report.place}</p>
                  </div>
                  <div className='col-lg-6'>
                    <h5>Vehículo</h5>
                    <p>Vehículo: {selectedReport.vehicle.brand} {selectedReport.vehicle.model}</p>
                    <p>Placas: {selectedReport.vehicle.plate}</p>
                    <p>Color: {selectedReport.vehicle.color}</p>
                    <p>Modelo: {selectedReport.vehicle.year}</p>
                  </div>
                  <div className="row">
                  <p>Imágenes:</p>
                      {images.map((image) => (
                        <div key={image.imageReportId} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                          <img src={image.image} alt={`Imagen ${image.imageReportId}`} className="img-fluid" />
                        </div>
                      ))}
                    </div>
                </div>
                <div className='row mt-3'>
                  <div className='col'>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => setShowModalDetails(false)}>
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="primary"
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
                  <h3>Ingrese el dictamen:</h3>
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
          centered>
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
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdjusterReport;
