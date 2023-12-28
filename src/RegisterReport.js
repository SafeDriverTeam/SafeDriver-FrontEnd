
import React, { useEffect, useState} from 'react';
import "./css/AppReport.css";
import "./css/App.css";
import NavBarAdmin from "./components/NavBarDriver";
import Table from 'react-bootstrap/Table';
import { Alert } from 'bootstrap';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIA5TD46D54C2F6DLMX',
  secretAccessKey: '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',
  region: 'us-east-2'
});

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

  
  useEffect(()=>{
    try{
      fetch('http://localhost:3001/vehicle/getVehicleByUserId/4')
    .then(response => response.json())
    .then(data => setCarsData(data))
    .catch(error => console.error('Error al recuperar los vehículos:',error));
    }catch(error){
      Alert('Error al recuperar los vehículos, favor de intentar más tarde.');
    }
  }, []);


  

  useEffect(() => {
    if (selectedCar) {
      const fetchPolicy = async () => {
        fetch('http://localhost:3001/policy/getPolicyByVehicleId/'+selectedCar.vehicleId)
      .then(response => response.json())
      .then(data => {
        try{
        let newCar = selectedCar;
        newCar.policyId = data[0].policyId;
        newCar.acquisitionDate = data[0].acquisitionDate;
        newCar.amount = data[0].amount;
        newCar.userId = data[0].userId;
        let policyDate = new Date(data[0].expirationDate);
        newCar.typePolicy = data[0].typePolicy;
        newCar.policyId = data[0].policyId;
        if (newCar.policyId > 0) {
          if(policyDate > new Date()){
            setSelectedCar(newCar);
          }else{
            alert('El vehículo cuenta con una póliza pero no está vigente');
            setSelectedCar(null);
          }
        }
      }catch(error){
          console.log(error);
          alert('El vehículo no cuenta con una póliza');
          setSelectedCar(null);
        }
      })
        }
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
    setInvolvedNames([...involvedNames, names]);
  };

  const handleRegisterCarDetails = (details) => {
    setCarDetails([...carDetails, details]);
  };

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
    if(declaration === ''){
      alert('Ingresa una declaración.');
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
          userId: 4
        }
        const response = await fetch('http://localhost:3001/report/createReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const responseData = await response.json();

        // Realizar el segundo llamado a la API para insertar los nombres de archivo y el ID del reporte
        for (const fileNamePromise of uploadPromises) {
          const fileName = await fileNamePromise;
          const imageReportBody = {
            image: "https://safedriver2.s3.us-east-2.amazonaws.com/"+ fileName,
            reportId: responseData.reportId, 
          };

          const imageReportResponse = await fetch('http://localhost:3001/imageReport/createImageReport', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(imageReportBody),
          });

          if (imageReportResponse.ok) {
            Alert('Reporte registrado correctamente.');
          } else {
            Alert('Error al registrar el reporte, favor de intentar más tarde.');
          }
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
          <tr>
            <th>Nombres Involucrados</th>
          </tr>
        </thead>
        <tbody>
          {involvedNames.map((names, index) => (
            <tr key={index}>
              <td>{names}</td>
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
          </tr>
        </thead>
        <tbody>
          {carDetails.map((details, index) => (
            <tr key={index}>
              <td>{details.marca}</td>
              <td>{details.modelo}</td>
              <td>{details.matricula}</td>
              <td>{details.color}</td>
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
