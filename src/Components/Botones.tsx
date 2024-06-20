import Body from "./Body";
import "../style.css/botones.css"
import { useState, useEffect, SetStateAction } from "react";
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

export default function Botones() {

  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2] = useState('6');
  const [inputValue3] = useState('1644');
  const [inputValue4, setInputValue4] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [arrayJefesProyecto, setArrayJefesProyecto] = useState<Proyecto[]>([]);
  const [arrayPMOProyecto, setArrayPMOProyecto] = useState<Proyecto[]>([]);
  const [fusionArrayMisProyectos, setFusionArrayMisProyectos] = useState<Proyecto[]>([]);



  useEffect(() => {
    const fetchData = async () => {
      const projects = await getcodprojects(inputValue);
      setData(projects);
      console.log(projects);
    };

    fetchData();
  }, [inputValue]);

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  }

  const handleInputChange2 = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue4(event.target.value);
    fetchData();
  }


  useEffect(() => {

  }, []);


  const fetchData = async () => {
    
    const clients: Cliente[] = await getClientes(inputValue4);
    setClientes(clients);
    clients.map((c: Cliente) => console.log(c.nombre));

    const projects = await getAllProjectsByClientName(inputValue4);
    setFusionArrayMisProyectos(projects);
    console.log(projects);

  };

  const handleButtonClick = async () => {
    try {
      const projectsJefes = await getBoss(inputValue2);
      setArrayJefesProyecto(projectsJefes);

      const projectsPMO = await getPMO(inputValue3);
      setArrayPMOProyecto(projectsPMO);

      const fusionArray: Proyecto[] = [...projectsJefes, ...projectsPMO];
      const aux: Proyecto[] = Array.from(
        new Map(fusionArray.map((proyecto) => [proyecto.idProyecto, proyecto]))
      ).map(([_, proyecto]) => proyecto);

      setFusionArrayMisProyectos(aux);

      console.log(projectsJefes);
      console.log(projectsPMO);
      console.log(fusionArray);
      console.log(aux);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>

      <div><Body /></div>





      <div className='SearchButton'>

        <div >
          <h4 className="label">Código del proyecto</h4>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Código del proyecto'
            className='searchInput'

          />

        </div>


        <div >
          <h4 className="label">Cliente</h4>
          <input
            type="text"
            placeholder='Cliente'
            onChange={handleInputChange2}
            className='searchInput2'
            value={inputValue4}
          />

          <button className='searchButtonToggle'>▼</button>
        </div>


        <button className='customButton'
          onClick={handleButtonClick}

          value={inputValue2}


        >Mis Proyectos</button>
      </div>
      <button
        id="btnBuscar"
        className="btn btnAdd "
        type="button"
      >
        <i className="materialIcons2"

        >search</i>
        <span>BUSCAR</span>
      </button>
      <button id="btnVolver" className="btn" type="button">
        <i className="materialIcons2">keyboard_backspace</i>
        <span>VOLVER</span>
      </button>


      {data && (
        <div>
          <p> {JSON.stringify(data)}</p>
        </div>

      )}
      {clientes && (
        <div>
          {clientes.map((cliente, index) => (
            <p key={index}>
              {cliente.nombre === inputValue4 && cliente.nombre}
            </p>
          ),
          console.log(inputValue4)
          )}
        </div>
      )}


      {arrayJefesProyecto && (
        <div>
          <p> {JSON.stringify(arrayJefesProyecto)}</p>
        </div>

      )}
      {arrayPMOProyecto && (
        <div>
          <p> {JSON.stringify(arrayPMOProyecto)}</p>
        </div>

      )}


      {fusionArrayMisProyectos && (
        <div>
          <p> {JSON.stringify(fusionArrayMisProyectos)}</p>
        </div>

      )}
    </div>

  )

}
