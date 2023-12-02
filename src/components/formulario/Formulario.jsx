import { useState, useEffect, useRef } from "react";
import Header from "../header/Header";

const Formulario = () => {
  const [propiedades, setPropiedad] = useState([]);

  const [selectedPropiedad, setSelectedPropiedad] = useState("");

  const propiedadRef = useRef();
  const ubicacionRef = useRef();
  const metrosRef = useRef();

  // Filtro las propiedades para obtener solo las que son de tipo propiedad
  const propiedadesFiltradas = propiedades.filter(
    (propiedad) => propiedad.categoria === "propiedad"
  );

  const ubicacionesFiltradas = propiedades.filter(
    (propiedad) => propiedad.categoria === "ubicacion"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json");
        const data = await response.json();
        setPropiedad(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h2>Ingrese los datos solicitados</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const propiedadValue = propiedadRef.current.value;
          const ubicacionValue = ubicacionRef.current.value;
          const metrosValue = metrosRef.current.value;
        }}
      >
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select
          ref={propiedadRef}
          id="propiedad"
          name="propiedad"
          defaultValue={"all"}
          onChange={({ target }) => {
            setSelectedPropiedad(target.value);
          }}
        >
          <option value="all" disabled>
            ...
          </option>
          {propiedadesFiltradas.map((propiedad, indice) => (
            <option key={indice} value={propiedad.tipo}>
              {propiedad.tipo}
            </option>
          ))}
        </select>
        <label htmlFor="ubicacion">Selecciona su ubicación</label>
        <select
          id="ubicacion"
          name="ubicacion"
          ref={ubicacionRef}
          defaultValue={"all"}
        >
          <option value="all" disabled>
            ...
          </option>
          {ubicacionesFiltradas.map((ubicacion, indice) => (
            <option key={indice} value={ubicacion.tipo}>
              {ubicacion.tipo}
            </option>
          ))}
        </select>
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          ref={metrosRef}
          type="number"
          id="metros2"
          name="metros2"
          min={20}
          max={1000}
        />
        <button type={"submit"}>Cotizar</button>
      </form>
    </>
  );
};

export default Formulario;
