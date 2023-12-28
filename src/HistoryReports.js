import React, { useState, useEffect } from 'react';
import "./css/AppReport.css";
import NavBarDriver from './components/NavBarDriver';
import Table  from 'react-bootstrap/Table';

const HistoryReports = () =>{

  const [selectedCar, setSelectedCar] = useState(null);
  const [data, setData] = useState([]);


  const fetchVehicleInfo = async (car) => {
    try {
      const vehicleId = car.vehicleId.vehicleId; // Asegúrate de obtener el ID correcto
      const vehicleResponse = await fetch(`http://localhost:3001/vehicle/getByVehicleId/${vehicleId}`);
      if (vehicleResponse.ok) {
        const vehicleData = await vehicleResponse.json();
        console.log("Vehicle Data:");
        console.log(vehicleData);
        return vehicleData;
      } else {
        console.log('Error al obtener datos de la API de vehículos');
        return null;
      }
    } catch (error) {
      console.error('Error al realizar la consulta a la API de vehículos:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/report/getByUserId/4');
        if (response.ok) {
          const reportsData = await response.json();
          console.log("Reports Data:");
          console.log(reportsData);

          const policyData = await fetchPolicyData(reportsData);
          console.log("Policy Data:");
          console.log(policyData);

          const imagesData = await fetchImagesForAll(reportsData);
          console.log("Images Data:");
          console.log(imagesData);

          const updatedData = await fetchVehicleInfoForAll(reportsData, policyData, imagesData);
          console.log("Combined Data:");
          console.log(updatedData);

          setData(updatedData);
        } else {
          console.log('Error al obtener datos de la API');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchPolicyData = async (apiCarsData) => {
    try {
      const promises = apiCarsData.map(async (car) => {
        const policyResponse = await fetch(`http://localhost:3001/policy/getById/${car.policyId}`);
        if (policyResponse.ok) {
          const policyData = await policyResponse.json();
          return policyData;
        } else {
          console.error(`Error al obtener datos de la API de pólizas para el ID ${car.policyId}`);
          return null;
        }
      });

      const policyDataResults = await Promise.all(promises);
      return policyDataResults.filter(data => data !== null);
    } catch (error) {
      console.error('Error al realizar la consulta a la API de pólizas:', error);
      return [];
    }
  };

  const fetchImagesForAll = async (reportsData) => {
    try {
      const imagesPromises = reportsData.map(async (report) => {
        const imageResponse = await fetch(`http://localhost:3001/imageReport/getByReportId/${report.reportId}`);
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          return { reportId: report.reportId, images: imageData };
        } else {
          console.error(`Error al obtener imágenes para el reporte ID ${report.reportId}`);
          return null;
        }
      });
  
      const imagesResults = await Promise.all(imagesPromises);
      return imagesResults.filter(data => data !== null);
    } catch (error) {
      console.error('Error al realizar la consulta a la API de imágenes:', error);
      return [];
    }
  };

  const fetchVehicleInfoForAll = async (reportsData, policyData, imagesData) => {
    const updatedDataPromises = reportsData.map(async (report, index) => {
      const car = { ...report, vehicleId: policyData[index], images: imagesData.find(img => img.reportId === report.reportId)?.images || []};
      const vehicleInfo = await fetchVehicleInfo(car);
      return { ...car, vehicleInfo };
    });

    return await Promise.all(updatedDataPromises);
  };

  

  const handleSelectCar = (car) => {
    console.log('Seleccionando auto:', car);
    setSelectedCar(car);
  };


    return(
        <div>
            <NavBarDriver />
                <h1 className='title'>Historial de reportes</h1>
                {/*Tabla de autos*/ }
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Numero Reporte</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Número de Placas</th>
            <th>Fecha</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((car) => (
            <tr
              key={car.id}
              className={selectedCar && selectedCar.id === car.id ? 'selected' : ''}
              onClick={() => handleSelectCar(car)}
            >
              <td>{car.reportId}</td>
              <td>{car.vehicleInfo.brand}</td>
              <td>{car.vehicleInfo.model}</td>
              <td>{car.vehicleInfo.plate}</td>
              <td>{car.date}</td>
              <td>
                <button onClick={() => handleSelectCar(car)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
    );
};

export default HistoryReports;