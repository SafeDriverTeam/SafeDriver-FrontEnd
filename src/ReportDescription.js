import "./css/AppReport.css";
import React from 'react';

const ReportDescription = ({selectedCar}) =>{



      return (
        <div>
          <h1>Detalles del Reporte</h1>
          <br></br>
          {selectedCar && (
            <div>
              <h5>Fecha del siniestro: {selectedCar.date}</h5>
              <h5>Lugar del siniestro: {selectedCar.place}</h5>
              <h5>Dictamen: {selectedCar.judgment}</h5>
              <h5>
                Auto afectado: {selectedCar.vehicleInfo.brand}{' '}
                {selectedCar.vehicleInfo.model} {selectedCar.vehicleInfo.color} Con
                matrícula: {selectedCar.vehicleInfo.plate}
              </h5>
              <h5>Declaración del siniestro: {selectedCar.declaration}</h5>
              <h5>Nombre de los involucrados: {selectedCar.involved}</h5>
              <h5>Vehículos involucrados: {selectedCar.vehiclesInvolved}</h5>
    
              {/* Mostrar imágenes */}
              <h5>Imágenes del siniestro:</h5>
              {selectedCar.images.map((image, index) => (
                <img
                  key={index}
                  src={image.image}
                  alt={`Imagen ${index + 1}`}
                  style={{ maxWidth: '100%', marginBottom: '10px', marginRight: '20px', marginLeft: '10px'}}
                />
              ))}
                <br></br>
                <br></br>
            </div>
          )}
        </div>
      );
    };
    

export default ReportDescription;