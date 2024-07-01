import React, { useState } from "react";
import Body from "./Body";
import "../style.css/botones.css";
import { getBoss, getClientes, getPMO, getcodprojects, getAllProjectsByClientName } from "../rutes/RutasProyectos";

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
  const [arrayJefesProyecto, setArrayJefesProyecto] = useState<Proyecto[]>([]);
  const [fusionArrayMisProyectos, setFusionArrayMisProyectos] = useState<Proyecto[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Proyecto[]>([]);
  const [showDropdownProjects, setShowDropdownProjects] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [showDropdownClientes, setShowDropdownClientes] = useState(false);

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
      const uniqueProjects = Array.from(new Map(fusionArray.map(project => [project.idProyecto, project]))).map(([id, project]) => project);
      setArrayJefesProyecto(uniqueProjects);
      setFusionArrayMisProyectos(uniqueProjects);
    } catch (error) {
      console.error('Error al obtener mis proyectos:', error);
    }
  };

  const handleSearchClick = async () => {
    try {
      let projects: Proyecto[] = [];

      if (inputValueProyecto) {
        projects = await getcodprojects(inputValueProyecto);
      } else if (inputValueCliente) {
        const clients = await getClientes(inputValueCliente);
        if (clients.length > 0) {
          const clienteId = clients[0].idCliente; // Tomamos el primer cliente encontrado
          projects = await getAllProjectsByClientName(clienteId.toString());
        }
      }

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
                <th>Responsable</th>
                <th>Horas Cooonts Provisional</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((proyecto) => (
                <tr key={proyecto.idProyecto}>
                  <td>{proyecto.codProyecto}</td>
                  <td>{proyecto.nombreProyecto}</td>
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

      {arrayJefesProyecto && (
        <div>
          <h2>Mis Proyectos (Jefes y PMO)</h2>
          <ul>
            {fusionArrayMisProyectos.map((proyecto) => (
              <li key={proyecto.idProyecto}>
                {proyecto.codProyecto} - {proyecto.nombreProyecto}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Botones;
