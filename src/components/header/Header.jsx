import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <h1>Seguros del Hogar</h1>
      <nav>
        <Link to={"/historial"}>Historial</Link>
      </nav>
    </header>
  );
};

export default Header;
