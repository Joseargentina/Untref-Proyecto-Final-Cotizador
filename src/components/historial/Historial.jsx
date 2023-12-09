import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./historial.css";

const Historial = () => {
  const [datosGuardados, setDatosGuardados] = useState([]);
  useEffect(() => {
    const datos = localStorage.getItem("datosFormulario");
    if (datos) {
      const parseDatos = JSON.parse(datos);
      setDatosGuardados(parseDatos);
    }
  }, []);

  return (
    <>
      <header className="header-historial">
        <h2 className="titulo-historial">Historial de Cotizaciones</h2>
      </header>

      {datosGuardados && datosGuardados.length > 0 ? (
        <section className="contenedor-tabla">
          <table className="tabla-cotizaciones">
            <thead>
              <tr>
                <th>Propiedad</th>
                <th>Ubicacion</th>
                <th>Metros Cuadrados</th>
                <th>Feacja Cotizada</th>
                <th>Precio Seguro</th>
              </tr>
            </thead>
            <tbody>
              {datosGuardados.map((datos, indice) => (
                <tr key={indice}>
                  <td>{datos.propiedad}</td>
                  <td>{datos.ubicacion}</td>
                  <td>{datos.metrosCuadrados}</td>
                  <td>{datos.fechaCotizada}</td>
                  <td>{datos.precioSeguro}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/" className="btn-volver">
            Volver
          </Link>
        </section>
      ) : (
        <>
          <p className="no-datos">No hay datos disponibles</p>

          <Link to="/" className="btn-volver btn-nodatos">
            Volver
          </Link>
        </>
      )}
    </>
  );
};

export default Historial;
