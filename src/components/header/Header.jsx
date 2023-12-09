import { Link } from "react-router-dom";
import { RiHistoryLine } from "react-icons/ri";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="titulo-principal">Seguros del Hogar</h1>
      <nav>
        <Link to={"/historial"}>
          <RiHistoryLine className="icono-historial" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
