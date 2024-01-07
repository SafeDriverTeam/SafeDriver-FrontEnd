    import React, { useState, useEffect } from 'react';
    import "./css/AppReport.css";
    import NavBarDriver from './components/NavBarDriver';
    import Table  from 'react-bootstrap/Table';
    import axios from './api/axios';
    import Cookies from "js-cookie";
    import ReportDescription from './ReportDescription';
    const REPORTS_URL = "report/";
    const VEHICLE_URL = "vehicle/";
    const POLICY_URL = "policy/";
    const IMAGES_URL = "imageReport/";

    const config = {
      headers: {
        'Authorization': 'Bearer ' + Cookies.get("token")
      }
    };

    const user = JSON.parse(localStorage.getItem('user'));

    const HistoryReports = () =>{

      const [selectedCar, setSelectedCar] = useState(null);
      const [data, setData] = useState([]);
      const [showDetail, setShowDetail] = useState(false);


      const fetchVehicleInfo = async (car) => {
        try {
          const vehicleId = car.vehicleId.vehicleId; 
          const vehicleResponse = await axios.get(VEHICLE_URL+'getByVehicleId/'+vehicleId, config);
          if (vehicleResponse.status === 200) {
            const vehicleData = await vehicleResponse.data;
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

      const fetchVehicleInfoForAll = async (reportsData, policyData, imagesData) => {
        const updatedDataPromises = reportsData.map(async (report, index) => {
          const car = { ...report, vehicleId: policyData[index], images: imagesData.find(img => img.reportId === report.reportId)?.images || []};
          const vehicleInfo = await fetchVehicleInfo(car);
          return { ...car, vehicleInfo };
        });

        return await Promise.all(updatedDataPromises);
      };


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(REPORTS_URL+"getByDriverId/"+user.userId, config);
            if (response.status === 201) {
              const reportsData = await response.data;

              const policyData = await fetchPolicyData(reportsData);

              const imagesData = await fetchImagesForAll(reportsData);

              const updatedData = await fetchVehicleInfoForAll(reportsData, policyData, imagesData);

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
            const policyResponse = await axios.get(POLICY_URL + "getById/" + car.policyId, config);
            if (policyResponse.status === 200) {
              const policyData = policyResponse.data; 
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
            const imageResponse = await axios.get(IMAGES_URL+"getByReportId/"+report.reportId, config);

            if (imageResponse.status === 200 ) {
              const imageData = await imageResponse.data;
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

      
      

      const handleSelectCar = (car) => {
        setSelectedCar(car);
        setShowDetail(true); 
      };


    return (
      <div>
        <NavBarDriver />
        <h1 className='title'>Historial de reportes</h1>
  
        {showDetail ? (
          <ReportDescription selectedCar={selectedCar} />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Numero Reporte</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Número de Placas</th>
                <th>Fecha</th>
                <th>Dictamen</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((car) => (
                <tr
                  key={car.reportId}
                  className={selectedCar && selectedCar.id === car.id ? 'selected' : ''}
                  onClick={() => handleSelectCar(car)}
                >
                  <td>{car.reportId}</td>
                  <td>{car.vehicleInfo.brand}</td>
                  <td>{car.vehicleInfo.model}</td>
                  <td>{car.vehicleInfo.plate}</td>
                  <td>{car.date}</td>
                  <td>{car.judgment}</td>
                  <td>
                    <button onClick={() => handleSelectCar(car)}>Seleccionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  };

  export default HistoryReports;