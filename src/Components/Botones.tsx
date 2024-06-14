import Body from "./Body";
import  "../style.css/botones.css"



export default function Botones() {
  return (
    <div>

              <div><Body/></div>

      <div>
        <button
          id="btnBuscar"
          className="btn btnAdd "
          type="button"
        >
          <i className="materialIcons">search</i>
          <span>BUSCAR</span>
        </button>
        <button id="btnVolver" className="btn" type="button">
          <i className="materialIcons btnVolver">keyboard_backspace</i>
          <span>VOLVER</span>
        </button>
      </div>
    </div>
  )
}
