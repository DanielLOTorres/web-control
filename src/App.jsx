import React, { useState, useEffect} from 'react';
import axios from 'axios';

import './App.css'

const Dashboard = () => {
  const [rawData, setRawData] = useState([]);
  const [labels, setLabels] = useState([])
  const [measurements, setMeasurements] = useState([]) 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data');
      setRawData(response.data); // Atualiza rawData
    } catch (error) {
      console.error('Erro ao carregar dados', error);
    }
  };

  useEffect(() => {
    fetchData(); // Faz a primeira consulta imediatamente

    const intervalId = setInterval(() => {
      fetchData(); // Consulta periodicamente
    }, 2000); // Ajuste o intervalo de tempo conforme necessário

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);
  
  useEffect(() => {
    if (rawData && rawData.length > 0) {
      const measurementsData = rawData[0].data; 
      const infoData = rawData[0].info;
      setLabels(infoData)
      setMeasurements(measurementsData)

      console.log(measurementsData, infoData);
    }
  }, [rawData]); // Dependência para rawData
  
  
  
  const MeasurementCard = ({ measurement }) => {
    return (
      <div className="card">
        <h3>{measurement.name}</h3>
        <p>Valor: {measurement.value} {measurement.EU}</p>
        {/* Inclua mais detalhes conforme necessário */}
      </div>
    );
  };
  

  return (
    <div>
      <div className="dashboard">
      {measurements.length > 0 && measurements.map((m, index) => (
          <MeasurementCard key={index} measurement={m} />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard de Medição</h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
