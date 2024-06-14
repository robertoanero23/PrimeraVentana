import  "../style.css/Header.css"


export default function header() {
  return (
      <div className="header">
        <img className="imagen" src="/src/Images/Logo_Devoteam.png" alt="" />
        <div className="Segundo">
        <div className="Nombres">Roberto</div>
        <img className="Avatar" src="/src/Images/icon_gestion_cv.jpg" alt="avatar" id="img-icono" />
          <i
            className="materialIcons"
          >
            menu
          </i>
        </div>
        </div>

  )
}
