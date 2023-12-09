import "./select.css";

const Select = ({
  propiedadesFiltradas,
  setSelectedPropiedades,
  propiedadRef,
  ubicacionesFiltradas,
  ubicacionRef,
  setSelectedUbicacion,
}) => {
  return (
    <>
      <label htmlFor="propiedad" className="label">
        Selecciona el tipo de propiedad
      </label>
      <select
        ref={propiedadRef}
        className="select"
        id="propiedad"
        name="propiedad"
        defaultValue={"all"}
        onChange={({ target }) => {
          setSelectedPropiedades(target.value);
        }}
      >
        <option className="option" value={"all"} disabled>
          ...
        </option>
        {propiedadesFiltradas.map((propiedad, indice) => (
          <option key={indice} value={propiedad.tipo} className="option-select">
            {propiedad.tipo}
          </option>
        ))}
      </select>

      <label htmlFor="ubicacion" className="label">
        Selecciona su ubicación
      </label>
      <select
        id="ubicacion"
        name="ubicacion"
        className="select"
        ref={ubicacionRef}
        defaultValue={"all"}
        onChange={({ target }) => {
          setSelectedUbicacion(target.value);
        }}
      >
        <option className="option" value={"all"} disabled>
          ...
        </option>
        {ubicacionesFiltradas.map((ubicacion, indice) => (
          <option key={indice} value={ubicacion.tipo} className="option-select">
            {ubicacion.tipo}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
