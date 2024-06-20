<<<<<<< HEAD
import  "../style.css/Body.css"
import Header from "./Header"
import SubHeader from "./SubHeader"

=======
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import SubHeader from './SubHeader';
import "../style.css/Body.css"
>>>>>>> 75686cb5378183d8662a23f6091d6342886d820e



export default function Body() {
<<<<<<< HEAD

=======
  const [data, setData] = useState(null);
  const [newGradoAvance, setNewGradoAvance] = useState({
    idProyecto: '',
    year: '',
    month: '',
    day: '',
    porcentajeAvanceReal: '',
    porcentajeAvancePrevisto: ''
  });

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
    } catch (error) {
      console.error('Error al añadir el grado de avance:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/proyecto/getallprojects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const firstFiveElements = jsonData.slice(0, 5);
        setData(firstFiveElements);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
>>>>>>> 75686cb5378183d8662a23f6091d6342886d820e

  return (
    <div>
      <Header />
      <SubHeader />
      <div className="flipContainer">
        Filtro de búsqueda
        <i className="materialIcons floatLeft">arrow_drop_down</i>
        <i className="materialIcons floatRight">arrow_drop_down</i>
      </div>

      {data && (
        <div>
          <p>Primeros 5 elementos del JSON: {JSON.stringify(data)}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="idProyecto"
          placeholder="ID Proyecto"
          value={newGradoAvance.idProyecto}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Año"
          value={newGradoAvance.year}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="month"
          placeholder="Mes"
          value={newGradoAvance.month}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="day"
          placeholder="Día"
          value={newGradoAvance.day}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="porcentajeAvanceReal"
          placeholder="Porcentaje Avance Real"
          value={newGradoAvance.porcentajeAvanceReal}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="porcentajeAvancePrevisto"
          placeholder="Porcentaje Avance Previsto"
          value={newGradoAvance.porcentajeAvancePrevisto}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Añadir Grado de Avance</button>
      </form>
    </div>
  );
}
