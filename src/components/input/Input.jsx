import "./input.css";

const Input = ({ metrosRef, onChange }) => {
  const cambioEntrada = (e) => {
    // Obtener el valor del input
    const valor = e.target.value;
    // Llamar a la función onChange pasando el valor
    onChange(valor);
  };
  return (
    <>
      <label htmlFor="metros2" className="label">
        Ingresa los Metros cuadrados:
      </label>
      <input
        ref={metrosRef}
        type="number"
        id="metros2"
        className="input"
        name="metros2"
        min={20}
        max={1000}
        defaultValue={20}
        onChange={cambioEntrada}
      />
    </>
  );
};
export default Input;
