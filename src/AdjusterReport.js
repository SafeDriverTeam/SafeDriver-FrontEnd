import React from 'react';
import Modal from "react-bootstrap/Modal";
import ReportList from './components/ReportList';

function AdjusterReport() {

  return (
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
            <Modal.Title id="Reportes">Lista de reportes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
              <ReportList />
            </div>
        </Modal.Body>
    </Modal>
  );
};

export default AdjusterReport;
