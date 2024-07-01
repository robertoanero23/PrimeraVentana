import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Body from "./Body";
import "../style.css/botones.css";
import { getBoss, getClientes, getPMO, getcodprojects, getClientName, getIdClient } from "../rutes/RutasProyectos";

interface Proyecto {
  idProyecto: number;
  idCliente: number;
  nombreProyecto: string;
  codProyecto: string;
  activo: number;
  responsable: string;
  horasContsProvisional: number;
}

interface Cliente {
  idCliente: number;
  nombre: string;
}

const Botones: React.FC = () => {
  const [inputValueProyecto, setInputValueProyecto] = useState('');
  const [inputValueCliente, setInputValueCliente] = useState('');
  const [resultados, setResultados] = useState<Proyecto[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Proyecto[]>([]);
  const [showDropdownProjects, setShowDropdownProjects] = useState(false);
  const [, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [showDropdownClientes, setShowDropdownClientes] = useState(false);
  const [clientNames, setClientNames] = useState<{ [key: number]: string }>({});
  const [, setSelectedProject] = useState<Proyecto | null>(null);

  const navigate = useNavigate();

  const handleInputChangeProyecto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueProyecto(value);
    if (value) {
      try {
        const projects: Proyecto[] = await getcodprojects(value);
        setFilteredProjects(projects);
        setShowDropdownProjects(true);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    } else {
      setShowDropdownProjects(false);
    }
  };

  const handleProjectSelect = (project: Proyecto) => {
    setInputValueProyecto(project.codProyecto);
    setSelectedProject(project);
    setShowDropdownProjects(false);
  };

  const handleInputChangeCliente = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueCliente(value);
    if (value) {
      fetchClientes(value);
    } else {
      setShowDropdownClientes(false);
    }
  };

  const fetchClientes = async (search: string) => {
    try {
      const clients: Cliente[] = await getClientes(search);
      setClientes(clients);
      setFilteredClientes(clients.filter(client => client.nombre.toLowerCase().includes(search.toLowerCase())));
      setShowDropdownClientes(true);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const handleMisProyectosClick = async () => {
    try {
      const projectsJefes = await getBoss('6');
      const projectsPMO = await getPMO('1644');
      const fusionArray: Proyecto[] = [...projectsJefes, ...projectsPMO];
      const uniqueProjects = Array.from(new Map(fusionArray.map(project => [project.idProyecto, project]))).map(([, project]) => project);
      

      const clientNamesTemp: { [key: number]: string } = {};
      for (const project of uniqueProjects) {
        const clientData = await getIdClient(project.idCliente.toString());
        if (clientData && clientData.length > 0) {
          clientNamesTemp[project.idCliente] = clientData[0].nombre;
        }
      }

      setClientNames(clientNamesTemp);
      setResultados(uniqueProjects);
      setShowResults(true);
    } catch (error) {
      console.error('Error al obtener mis proyectos:', error);
    }
  };

  const handleSearchClick = async () => {
    try {
      let projects: Proyecto[] = [];
      const clientNamesTemp: { [key: number]: string } = {};

      if (inputValueProyecto) {
        projects = await getcodprojects(inputValueProyecto);
      } else if (inputValueCliente) {
        projects = await getClientName(inputValueCliente);
      }


      for (const project of projects) {
        const clientData = await getIdClient(project.idCliente.toString());
        if (clientData && clientData.length > 0) {
          clientNamesTemp[project.idCliente] = clientData[0].nombre;
        }
      }

      setClientNames(clientNamesTemp);
      setResultados(projects);
      setShowResults(true);
    } catch (error) {
      console.error('Error al buscar proyectos o clientes:', error);
      setResultados([]);
      setShowResults(false);
    }
  };

  const handleClientSelect = (client: Cliente) => {
    setInputValueCliente(client.nombre);
    setShowDropdownClientes(false);
  };

  const handleRowClick = (project: Proyecto) => {
    navigate(`/gradosAvance/${project.idProyecto}`, { state: { selectedProject: project, clientName: clientNames[project.idCliente] } });
  };

  return (
    <div>
      <div><Body /></div>

      <div className='SearchButton'>
        <div>
          <h4 className="label">Código del proyecto</h4>
          <input
            type="text"
            value={inputValueProyecto}
            onChange={handleInputChangeProyecto}
            placeholder='Código del proyecto'
            className='searchInput'
          />
          {showDropdownProjects && filteredProjects.length > 0 && (
            <ul className="dropdown">
              {filteredProjects.map((project) => (
                <li key={project.idProyecto} onClick={() => handleProjectSelect(project)}>
                  {project.codProyecto} - {project.nombreProyecto}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h4 className="label">Cliente</h4>
          <input
            type="text"
            placeholder='Cliente'
            onChange={handleInputChangeCliente}
            className='searchInput2'
            value={inputValueCliente}
            onClick={() => setShowDropdownClientes(true)}
          />
          <button className='searchButtonToggle' onClick={() => setShowDropdownClientes(!showDropdownClientes)}>
            ▼
          </button>
          {showDropdownClientes && filteredClientes.length > 0 && (
            <ul className="dropdown">
              {filteredClientes.map((client, index) => (
                <li key={index} onClick={() => handleClientSelect(client)}>
                  {client.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className='customButton' onClick={handleMisProyectosClick}>
          Mis Proyectos
        </button>
      </div>

      <button id="btnBuscar" className="btn btnAdd" type="button" onClick={handleSearchClick}>
        <i className="materialIcons2">search</i>
        <span>BUSCAR</span>
      </button>
      <button id="btnVolver" className="btn" type="button">
        <i className="materialIcons2">keyboard_backspace</i>
        <span>VOLVER</span>
      </button>

      {showResults && resultados.length > 0 && (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          <table className="tabla">
            <thead>
              <tr>
                <th>Código del proyecto</th>
                <th>Nombre del proyecto</th>
                <th>Nombre del cliente</th>
                <th>Responsable</th>
                <th>Horas Conts Provisional</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((proyecto) => (
                <tr key={proyecto.idProyecto} onClick={() => handleRowClick(proyecto)}>
                  <td>{proyecto.codProyecto}</td>
                  <td>{proyecto.nombreProyecto}</td>
                  <td>{clientNames[proyecto.idCliente] ? clientNames[proyecto.idCliente] : 'N/A'}</td>
                  <td>{proyecto.responsable}</td>
                  <td>{proyecto.horasContsProvisional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showResults && resultados.length === 0 && (
        <p>No se encontraron resultados para la búsqueda.</p>
      )}
    </div>
  );
};

export default Botones;
