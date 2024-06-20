import Body from "./Body";
import  "../style.css/botones.css"
import { useState, useEffect, SetStateAction } from "react";
import { getBoss, getClientes, getPMO, getcodprojects } from "../rutes/RutasProyectos";






export default function Botones() {
  
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2] = useState('6');
  const [inputValue3] = useState('1644');
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
 




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


  useEffect(() => {
    const fetchData = async () => {
      const projects = await getClientes();
      setData2(projects);
      console.log(projects);
    };
  
    fetchData();
  }, []);

 
  const handleButtonClick = async () => {
    try {
     const projects = await getBoss(inputValue2);
      setData3(projects);
    }catch (error) {
      console.log(error)
    }
  }

  const handleButtonClick2 = async () => {
    try {
     const projects = await getPMO(inputValue3);
      setData4(projects);
    }catch (error) {
      console.log(error)
    }
  }



  return (
    <div>

              <div><Body/></div>
              
             
              
              

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
                className='searchInput2'


                />
                
                <button  className='searchButtonToggle'
                
                >▼</button>  </div>   
                <button className='customButton' 
                onClick={handleButtonClick2}
                
                value={inputValue2}
                

                >Mis Proyectos</button>     
        </div>
        <button
          id="btnBuscar"
          className="btn btnAdd "
          type="button"
        >
          <i   className="materialIcons2"
          
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
          {data2 && (
        <div>
          <p> {JSON.stringify(data2)}</p>
        </div>
        
      )}

{data3 && (
        <div>
          <p> {JSON.stringify(data3)}</p>
        </div>
        
      )}
      {data4 && (
        <div>
          <p> {JSON.stringify(data4)}</p>
        </div>
        
      )}



    </div>


    



) 
  
}
