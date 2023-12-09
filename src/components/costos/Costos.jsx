import "./costos.css";
import { MdSave } from "react-icons/md";
const Costos = ({ precioSeguro, guardarCotizacion }) => {
  const precioInicial = "0.00";
  return (
    <section className="costos-contenedor">
      {precioSeguro && (
        <>
          <p className="costos">Precio de la póliza: ${precioSeguro}</p>
          <MdSave className="icono-guardar" onClick={guardarCotizacion} />
        </>
      )}
      {!precioSeguro && (
        <p className="costos">Precio de la póliza: ${precioInicial}</p>
      )}
    </section>
  );
};

export default Costos;
