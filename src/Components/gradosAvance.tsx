import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import SubHeader from './SubHeader';

import "../style.css/gradosAvance.css"
import { getIdproyecto } from '../rutes/RutasProyectos';

interface LocationState {
  selectedProject: {
    idProyecto: number;
    codProyecto: string;
    nombreProyecto: string;
    responsable: string;
  };
  clientName: string;
}

interface GradoAvance {
  id: number;
  idProyecto: string;
  year: string;
  month: string;
  day: string;
  porcentajeAvanceReal: string;
  porcentajeAvancePrevisto: string;
  porcentajeAvanceIncurrido: string;
  porcentajeAvanceRealContraIncurrido: string;
}

const GradosAvance: React.FC = () => {
  const location = useLocation();
  const { selectedProject, clientName } = location.state as LocationState || {};

  const [newGradoAvance, setNewGradoAvance] = useState({
    idProyecto: selectedProject?.idProyecto.toString() || '',
    year: '',
    month: '',
    day: '',
    porcentajeAvanceReal: '',
    porcentajeAvancePrevisto: '',
    porcentajeAvanceIncurrido: '',
    porcentajeAvanceRealContraIncurrido: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [gradoAvanceData, setGradoAvanceData] = useState<GradoAvance[]>([]);

  useEffect(() => {
    const fetchGradoAvanceData = async () => {
      if (selectedProject?.idProyecto) {
        const data = await getIdproyecto(selectedProject.idProyecto.toString());
        setGradoAvanceData(data);
      }
    };

    fetchGradoAvanceData();
  }, [selectedProject]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGradoAvance({ ...newGradoAvance, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/grado-avance/addnuevogradoavance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGradoAvance),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Grado de avance añadido con éxito');
     
     
      const data = await getIdproyecto(selectedProject.idProyecto.toString());
      setGradoAvanceData(data);

    } catch (error) {
      console.error('Error al añadir el grado de avance:', error);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Header />
      <SubHeader />

      <div className="flipContainer">
        Filtro de búsqueda
        <i className="materialIcons floatLeft">arrow_drop_down</i>
        <i className="materialIcons floatRight">arrow_drop_down</i>
      </div>

      <h2 className='proyecto'>Datos del proyecto</h2>

      <div className='SearchButton'>
        <div>
          <h4 className="label">Código del proyecto</h4>
          <input
            type="text"
            placeholder='Código del proyecto'
            className='searchInput'
            value={selectedProject?.codProyecto || ''}
            readOnly
          />
        </div>

        <div>
          <h4 className="label">Nombre</h4>
          <input
            type="text"
            placeholder='Nombre'
            className='searchInput2'
            value={selectedProject?.nombreProyecto || ''}
            readOnly
          />
        </div>

        <div>
          <h4 className="label">Cliente</h4>
          <input
            type="text"
            placeholder='Cliente'
            className='searchInput2'
            value={clientName || ''}
            readOnly
          />
        </div>

        <div>
          <h4 className="label">Gerente</h4>
          <input
            type="text"
            placeholder='Gerente'
            className='searchInput2'
            value={selectedProject?.responsable || ''}
            readOnly
          />
        </div>
      </div>

      <h2 className='proyecto2'>Histórico grados de avance</h2>

      <div className='GradosAvance'>
        <button className='btnNuevoGrado' onClick={handleShowForm}>
          Nuevo Grado de Avance
        </button>

        {showForm && (
          <form className='formulario' onSubmit={handleSubmit}>
            <div className="formGroup">
              <h4 className="label2">ID Proyecto</h4>
              <input
                className='btngrado'
                type="text"
                name="idProyecto"
                value={newGradoAvance.idProyecto}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            
            <div className="formGroup">
              <h4 className="label2">Año</h4>
              <input
                className='btngrado'
                type="text"
                name="year"
                value={newGradoAvance.year}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="formGroup">
              <h4 className="label2">Mes</h4>
              <input
                className='btngrado'
                type="text"
                name="month"
                value={newGradoAvance.month}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="formGroup">
              <h4 className="label2">Día</h4>
              <input
                className='btngrado'
                type="text"
                name="day"
                value={newGradoAvance.day}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="formGroup">
              <h4 className="label2">% Porcentaje Avance Real</h4>
              <input
                className='btngrado'
                type="text"
                name="porcentajeAvanceReal"
                value={newGradoAvance.porcentajeAvanceReal}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="formGroup">
              <h4 className="label2">% Avance Previsto</h4>
              <input
                className='btngrado'
                type="text"
                name="porcentajeAvancePrevisto"
                value={newGradoAvance.porcentajeAvancePrevisto}
                onChange={handleInputChange}
                required
              />
            </div>

            
            
            <button className='btnAvance' type="submit">Añadir Grado de Avance</button>
          </form>
        )}

        <div>
          {gradoAvanceData && gradoAvanceData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID Proyecto</th>
                  <th>Año</th>
                  <th>Mes</th>
                  <th>Día</th>
                  <th>% Avance Real</th>
                  <th>% Avance Previsto</th>
                  <th>% Avance incurrido</th>
                  <th>% Avance real contra incurrido</th>

                </tr>
              </thead>
              <tbody>
                {gradoAvanceData.map((grado: GradoAvance) => (
                    <tr key={grado.id}>
                    <td>{grado.idProyecto}</td>
                    <td>{grado.year}</td>
                    <td>{grado.month}</td>
                    <td>{grado.day}</td>
                    <td>{grado.porcentajeAvanceReal}</td>
                    <td>{grado.porcentajeAvancePrevisto}</td>
                    <td>{grado.porcentajeAvanceIncurrido}</td>
                    <td>{grado.porcentajeAvanceRealContraIncurrido}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay datos de grados de avance para este proyecto.</p>
          )}
        </div>
      </div>
      
      <button id="btnVolver" className="btn" type="button" onClick={() => window.history.back()}>
        <i className="materialIcons2">keyboard_backspace</i>
        <span>VOLVER</span>
</button>
</div>
);
};

export default GradosAvance;