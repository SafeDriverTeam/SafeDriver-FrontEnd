
import React, { useEffect, useState} from 'react';
import "./css/AppReport.css";
import "./css/App.css";
import NavBarAdmin from "./components/NavBarDriver";
import Table from 'react-bootstrap/Table';
import AWS from 'aws-sdk';
import Cookies from "js-cookie";
import axios from './api/axios';
import { useNavigate } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('user'));
const REPORTS_URL = "report/";
const IMAGES_URL = "imageReport/";
const VEHICLE_URL = "vehicle/";
const POLICY_URL = "policy/";

AWS.config.update({
  accessKeyId: 'AKIA5TD46D54C2F6DLMX',
  secretAccessKey: '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',
  region: 'us-east-2'
});

const config = {
  headers: {
    'Authorization': 'Bearer ' + Cookies.get("token")
  }
};


const s3 = new AWS.S3();

const GeoLocationComponent = () => {

  const [location, setLocation] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [involvedNames, setInvolvedNames] = useState([]);
  const [carDetails, setCarDetails] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [images, setImages] = useState([]);
  const MAX_IMAGES = 8;
  const MIN_IMAGES = 4;
  const [incidentType, setIncidentType] = useState('');
  const incidentOptions = ['','Daño a terceros','Daños físicos a terceros','Asistencia legal','Servicios médicos','Robo total de auto','Auxilio vial','Daño a auto personal'];
  const [declaration, setDeclaration] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(VEHICLE_URL+"getVehicleByUserId/"+user.userId, config);
        setCarsData(response.data);
      } catch (error) {
        console.error('Error al recuperar los vehículos:', error);
        alert('Error al recuperar los vehículos, favor de intentar más tarde.');
      }
    };
  
    fetchData();
  }, []);

  

  useEffect(() => {
    if (selectedCar) {
      const fetchPolicy = async () => {
        try {
          const response = await axios.get(POLICY_URL+"getPolicyByVehicleId/"+selectedCar.vehicleId, config);
          const data = response.data;
          try {
            let newCar = selectedCar;
            newCar.policyId = data[0].policyId;
            newCar.acquisitionDate = data[0].acquisitionDate;
            newCar.amount = data[0].amount;
            newCar.userId = data[0].userId;
            let policyDate = new Date(data[0].expirationDate);
            newCar.typePolicy = data[0].typePolicy;
            newCar.policyId = data[0].policyId;
            if (newCar.policyId > 0) {
              if (policyDate > new Date()) {
                setSelectedCar(newCar);
              } else {
                alert('El vehículo cuenta con una póliza pero no está vigente');
                setSelectedCar(null);
              }
            }
          } catch (error) {
            console.log(error);
            alert('El vehículo no cuenta con una póliza');
            setSelectedCar(null);
          }
        } catch (error) {
          console.error(`Error al obtener datos de la API de pólizas para el ID ${selectedCar.vehicleId}:`, error);
        }
      };
      fetchPolicy();
    }
  }, [selectedCar]);


useEffect(() => {
  setIncidentType('');
}, []);

  const typePolicy = selectedCar && selectedCar.typePolicy;
  const policyId = selectedCar && selectedCar.policyId;

  const handleCheckboxChange = (car) => {
    setSelectedCar(selectedCar === car ? null : car);
  };

  

  const handleGetLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`Latitud: ${latitude}, Longitud: ${longitude}`);
          },
          (error) => {
            setLocation('Error al obtener la ubicación.');
            console.error(error);
          }
        );
      } else {
        setLocation('La geolocalización no es compatible con este navegador.');
      }
  };



  const handleRegisterInvolved = (names) => {
    const validNameRegex = /^[A-Za-z\s]+$/;
    if(names === '' || names.length > 40 || !validNameRegex.test(names)){
      alert('Ingresa un nombre válido con letras (sin acentos) y espacios que no supere los 40 caracteres.');
      return;
    }else{
      setInvolvedNames([...involvedNames, names]);
    }
  };

  const handleRegisterCarDetails = (details) => {
    
    if(validateData(details)){
      setCarDetails([...carDetails, details]);
    }
    
  };
  const validateData= (details) =>{
    const validNameRegex = /^[A-Za-z\s]+$/;
    let result = true;
    if(details.marca === '' || details.marca.length > 20 || !validNameRegex.test(details.marca)){
      alert('Ingresa una marca válida con letras (sin acentos) y espacios que no supere los 20 caracteres.');
      result = false;
    }
    if(details.modelo === '' || details.modelo.length > 20 || !validNameRegex.test(details.modelo)){
      alert('Ingresa un modelo válido con letras (sin acentos) y espacios que no supere los 20 caracteres.');
      result = false;
    }
    if(details.color === '' || details.color.length > 20 || !validNameRegex.test(details.color)){
      alert('Ingresa un color válido con letras (sin acentos) y espacios que no supere los 20 caracteres.');
      result = false;
    }
    if(details.matricula === '' || details.matricula.length > 9 ){
      alert('Ingresa una matrícula válida que no supere los 9 caracteres.');
      result = false;
    }
    return result;
  }

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    if(event.target.files.length === 0){
      setImages([]);
      return;
    }

    if(uploadedImages.length + images.length > MAX_IMAGES || uploadedImages.length < MIN_IMAGES){
      alert('selecciona entre '+MIN_IMAGES+' y '+MAX_IMAGES+' imagenes.');
      return;
    }
    setImages([...images, ...uploadedImages]);
  };

  const validateIncidentType = () => {
    let result = true;
    switch(typePolicy){
      case 1:
        if(incidentType === 'Servicios médicos' || incidentType === 'Robo total de auto' ||
       incidentType === 'Auxilio vial'  ||incidentType === 'Daño a auto personal'){
        alert('El tipo de incidente no es compatible con la póliza.');
        result = false;
       }
       break;
      case 2:
        if(incidentType === 'Auxilio vial'  ||incidentType === 'Daño a auto personal'){
          alert('El tipo de incidente no es compatible con la póliza.');
          result = false;
        }
        break;
      default:
        break;
    }
    return result;
  }


  const validateFormat = () => {
    let result = true;
    if(selectedCar === null){
      alert('Selecciona un auto.');
      result = false;
    }
    if(location === ''){
      alert('Favor de obtener la ubicación.');
      result = false;
    }
    if(incidentType === ''){
      alert('Selecciona un tipo de incidente.');
      result = false;
    }
    if(validateIncidentType() === false){
      result = false;
    }
    if(declaration === '' || declaration.length > 500){
      alert('Ingresa una declaración que no supere los 500 caracteres.');
      result = false;
    }
    if(involvedNames.length === 0){
      alert('Ingresa al menos un nombre de involucrado.');
      result = false;
    }
    if(carDetails.length === 0){
      alert('Ingresa los detalles de los autos.');
      result = false;
    }
    if(images.length === 0){ 
     alert('Favor de cargar al menos cuatro imagenes.'); 
    }
    if(images.length > MAX_IMAGES || images < MIN_IMAGES){
      alert('selecciona entre '+MIN_IMAGES+' y '+MAX_IMAGES+' imagenes.');
      result = false;
    }
    return result;
  }

  const handleSendDataToConsole = async () => {
    let involved = '';
    let vehiclesInvolved = '';
    if(validateFormat() === true){
      for(let i =0; i < involvedNames.length ; i++){
        if(i === involvedNames.length - 1){
          involved= involved + involvedNames[i];
        }else{
          involved= involved + involvedNames[i] + ', ';
        }
      }
      for(let i =0; i < carDetails.length ; i++){
        if(i === carDetails.length - 1){
          vehiclesInvolved= vehiclesInvolved+ "Marca: " + carDetails[i].marca + ", Modelo: " + 
          carDetails[i].modelo + ", Matrícula: " + carDetails[i].matricula + ", Color: " + carDetails[i].color;
        }else{
          vehiclesInvolved= vehiclesInvolved+ "Marca: " + carDetails[i].marca + ", Modelo: " + 
          carDetails[i].modelo + ", Matrícula: " + carDetails[i].matricula + ", Color: " + carDetails[i].color + "; ";
        }
      }
      try{
        const uploadPromises = images.map(async (image, index) => {
          const fileName = `image_${index + 1}_${Date.now()}.jpg`;
          const params = {
            Bucket: 'safedriver2',
            Key: fileName,
            Body: image,
            ACL: 'public-read', 
            ContentType: 'image/jpeg', 
          };
  
          await s3.upload(params).promise();
          return fileName;
        });
        const currentDate = new Date();
        let place = location;
        const requestBody={
          declaration: declaration,
          date: currentDate,
          place: place,
          judgment: "por asignar",
          policyId: policyId,
          involved: involved,
          vehiclesInvolved: vehiclesInvolved,
          userId: 1,
          driverId: user.userId,
        }
        const response = await axios.post(REPORTS_URL+"createReport", requestBody, config);
      if (response.status === 201) {
        const responseData = response.data;
        let result = true;
        // Realizar el segundo llamado a la API para insertar los nombres de archivo y el ID del reporte
        for (const fileNamePromise of uploadPromises) {
          const fileName = await fileNamePromise;
          const imageReportBody = {
            image: "https://safedriver2.s3.us-east-2.amazonaws.com/"+ fileName,
            reportId: responseData.reportId, 
          };

          const imageReportResponse = await axios.post(IMAGES_URL+"createImageReport", imageReportBody, config);
          if (imageReportResponse.status === 201 && result === true) {
            console.log('Imagen registrada');
          } else {
            result=false;
            alert('Error al registrar la imagen, favor de intentar más tarde.');
          }
        }
        if(result === true){
          alert('Reporte registrado correctamente.');
          navigate('/historyReports');
        }else{
          alert('Error al registrar el reporte, favor de intentar más tarde.');
        }
      } else {
        console.error('Error al crear el reporte:', response.status, response.statusText);
      }

    } catch (error) {
      console.log('Error al crear el reporte: ', error);
      alert('Error al registrar el reporte, favor de intentar más tarde.');
    }
  }
};


  const handleDeleteInvolved = (index) => {
   const updatedNames = [...involvedNames];
   updatedNames.splice(index, 1);
   setInvolvedNames(updatedNames);
  };

  const handleDeleteCarDetails = (index) => {
   const updatedDetails = [...carDetails];
   updatedDetails.splice(index, 1);
   setCarDetails(updatedDetails);
  };



  return (
    <div>
      <NavBarAdmin />
      <h1 className='title'>Registrar Reporte</h1>
      {/* Tabla de autos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Número de Placas</th>
            <th>Color</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {carsData.map((car) => (
            <tr
              key={car.vehicleId}
              className={selectedCar && selectedCar.vehicleId === car.vehicleId ? 'selected' : ''}

            >
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.plate}</td>
              <td>{car.color}</td>
              <td>
                <input
                  type='checkbox'
                  checked={selectedCar === car}
                  onChange={() => handleCheckboxChange(car)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      {/* Ubicación geográfica */}
      <label>{location}</label><br></br><br></br>
      <button onClick={handleGetLocation}>Obtener Ubicación</button>
      <br></br>
      {/* ComboBox para seleccionar el tipo de incidente */}
      <br></br>
      <label>Tipo de Incidente:</label> 
      <select
        value={incidentType}
        onChange={(e) => setIncidentType(e.target.value)}
      >
        {incidentOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>  
       {/* Textbox para registrar la declaración */}   
      <label>Declaración:</label>
      <textarea
        value={declaration}
        onChange={(e) => setDeclaration(e.target.value)}
        style={{ width: '750px', height: '100px' }}
      />
      <br></br>
      <br></br>
      {/* Formulario para registrar nombres de involucrados */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const names = e.target.names.value;
          handleRegisterInvolved(names);
          e.target.reset();
        }}
      >
        <label>Nombres de Involucrados:</label>
        <input type="text" name="names" required />
        <button type="submit">Registrar Involucrados</button>
      </form>

      {/* Tabla para mostrar los nombres de involucrados */}
      <Table striped bordered hover>
        <thead>
          <tr >
            <th>Nombres Involucrados</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {involvedNames.map((names, index) => (
            <tr key={index}>
              <td>{names}</td>
              <td>
                <button onClick={() => handleDeleteInvolved(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      <br></br>
      {/* Formulario para registrar detalles del auto */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const carDetails = {
            marca: e.target.marca.value,
            modelo: e.target.modelo.value,
            matricula: e.target.matricula.value,
            color: e.target.color.value,
          };
          handleRegisterCarDetails(carDetails);
          e.target.reset();
        }}
      >
        <label>Detalles del Auto:</label>
        <input type="text" name="marca" placeholder="Marca" required />
        <input type="text" name="modelo" placeholder="Modelo" required />
        <input type="text" name="matricula" placeholder="Matrícula" required />
        <input type="text" name="color" placeholder="Color" required />
        <button type="submit">Registrar Detalles del Auto</button>
      </form>

      {/* Tabla para mostrar los detalles de los autos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Matrícula</th>
            <th>Color</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {carDetails.map((details, index) => (
            <tr key={index}>
              <td>{details.marca}</td>
              <td>{details.modelo}</td>
              <td>{details.matricula}</td>
              <td>{details.color}</td>
              <td>
                <button onClick={() => handleDeleteCarDetails(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Formulario para cargar imágenes */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Imágenes cargadas:', images);
        }}
      >
        <label>Cargar Imágenes:</label>
        <input 
        type="file" 
        name="images" 
        multiple 
        accept='image/*'
        onChange={handleImageUpload} />
      </form>
      <button onClick={handleSendDataToConsole}>Registrar</button>
    </div>
  );
};

export default GeoLocationComponent;
