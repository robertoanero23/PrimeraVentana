import  "../style.css/SubHeader.css"
import Header from "./Header"


export default function SubHeader() {
  return (
    <div>
        <div><Header/></div>
      <div>
        <div className="encabezadoBody breadCrumb breadCrumbCustom">
          <a
            href="/Home/Index"
            className="breadCrumbStep breadCrumbStepActive "
          >
            <i>
              <img
                className="image-sidebar  iconEncabezadoBody"
                src="/src/Images/home_white.png"
              />
            </i>
          </a>

          <a className="breadCrumbStep breadCrumbStepActive textWhite">
            Grados de avance
          </a>
          <a className="breadCrumbStep ">
            Grados de avance
          </a>
        </div>

        <div>
        <div>
          <div className="row">
            <label >
              <label>
                <h10>
                  <strong>&nbsp;&nbsp;Nombre&nbsp;&nbsp;</strong>
                </h10>
              </label>
              <label >
                <h10>ROBERTO ANERO REDONDO | RANERO</h10>
              </label>
            </label>

            <div >
              <label >
                <h10>&nbsp;&nbsp;</h10>
              </label>

              <label>
                <h10>
                  <strong>&nbsp;Número de empleado&nbsp;&nbsp; </strong>
                </h10>
              </label>
              <label  >
                <h10>2426</h10>
              </label>

              <label >
                <h10>&nbsp;&nbsp;&nbsp;&nbsp;</h10>
              </label>

              <label >
                <h10>
                  <strong>&nbsp;Sociedad&nbsp;&nbsp; </strong>
                </h10>
              </label>
              <label >
                <h10>Devoteam España</h10>
              </label>

              <label >
                <h10>&nbsp;&nbsp;&nbsp;&nbsp;</h10>
              </label>

              <div >
                <label >
                  <h10>
                    <strong>
                      &nbsp;&nbsp;&nbsp;Unidad preasignada&nbsp;&nbsp;
                    </strong>
                  </h10>
                </label>
                <strong>
                  <label>
                    <h10>..GD-OS DEVOPS GENERAL</h10>
                  </label>
                  &nbsp;&nbsp;&nbsp;
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>
  )
}
