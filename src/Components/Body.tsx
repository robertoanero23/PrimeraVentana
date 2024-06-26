import Header from './Header';
import SubHeader from './SubHeader';
import "../style.css/Body.css"



export default function Body() {
  return (
    <div>
      <Header />
      <SubHeader />
      <div className="flipContainer">
        Filtro de búsqueda
        <i className="materialIcons floatLeft">arrow_drop_down</i>
        <i className="materialIcons floatRight">arrow_drop_down</i>
      </div>
    </div>
  );
}
