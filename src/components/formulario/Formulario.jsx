import { useState, useEffect, useRef } from "react";
import Select from "../select/Select";
import Costos from "../costos/Costos";
import Input from "../input/Input";
import Button from "../boton/Button";
import Swal from "sweetalert2";
import "./formulario.css";
import useStorage from "../../hooks/useStorage";
import Toastify from "toastify-js";

const Formulario = () => {
  //Uso el useState() para almacenar las propiedades y el estado asociado a ellas
  const [propiedades, setPropiedad] = useState([]);

  // Almacena la propiedad seleccionada
  const [selectedPropiedad, setSelectedPropiedad] = useState("");
  // Almacena la ubicación seleccionada
  const [selectedUbicacion, setSelectedUbicacion] = useState("");
  const [metros2, setMetros2] = useState(0);
  // Almacena el precio del seguro y su estado
  const [precioSeguro, setPrecioSeguro] = useState("");

  //uso el hook useStorage para guardar los datos en el localStorage
  const [datosFormulario, setDatosFormulario] = useStorage(
    "datosFormulario",
    []
  );
  const [mostrarIconoGuardar, setMostrarIconoGuardar] = useState(false);
  const [mostrarCargando, setMostrarCargando] = useState(false);

  //Uso el hook useRef() para obtener los valores seleccionados o ingresados
  const propiedadRef = useRef(null);
  const ubicacionRef = useRef(null);
  const metrosRef = useRef();

  //Obtengo los datos del data.json
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

  // Filtro las propiedades para obtener solo las que son de tipo propiedad, lo mismo para las ubicaciones
  const propiedadesFiltradas = propiedades.filter(
    (propiedad) => propiedad.categoria === "propiedad"
  );
  const ubicacionesFiltradas = propiedades.filter(
    (propiedad) => propiedad.categoria === "ubicacion"
  );

  const guardarCotizacion = () => {
    //Se utiliza la referencia  para obtener el valor seleccionado
    const propiedadValue = propiedadRef.current.value;
    const ubicacionValue = ubicacionRef.current.value;
    const metrosValue = metrosRef.current.value;
    //Obtener la fecha y hora actual
    const fechaHoraActual = new Date();
    const dia = fechaHoraActual.getDate();
    const mes = fechaHoraActual.getMonth() + 1; // Sumamos 1 porque los meses se indexan desde 0
    const año = fechaHoraActual.getFullYear();
    const horas = fechaHoraActual.getHours();
    const minutos = fechaHoraActual.getMinutes();
    const segundos = fechaHoraActual.getSeconds();
    const nuevoPrecioSeguro = precioSeguro; // Obtener el precio del seguro del estado

    const nuevosDatos = {
      propiedad: propiedadValue,
      ubicacion: ubicacionValue,
      metrosCuadrados: metrosValue,
      fechaCotizada: `${dia}/${mes}/${año}, ${horas}:${minutos}:${segundos}`, // Convertir la fecha y hora en una cadena de texto
      precioSeguro: nuevoPrecioSeguro, //Agregar el precio del seguro a nuevosDatos
    };
    // Agrega nuevos datos al arreglo de datos del formulario
    setDatosFormulario((prevDatos) => [...prevDatos, nuevosDatos]);
    console.log("Guardando datos:", nuevosDatos);

    // Mensaje de cotización guardada
    Toastify({
      text: "Cotización guardada",
      duration: 3000,
      className: "mi-toastify-success", // Agrega la clase CSS personalizada
      bodyClassName: "mi-toastify-success-body", // Agrega la clase CSS para el cuerpo del mensaje
      progressClassName: "mi-toastify-success-progress", // Agrega la clase CSS para la barra de progreso
      destination: "https://example.com",
      newWindow: true,
      gravity: "top",
      position: "right",
      style: {
        background:
          "linear-gradient(90deg, rgba(78,96,158,1) 24%, rgba(151,159,186,1) 78%)",
      },
      stopOnFocus: true,
    }).showToast();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const propiedadValue = propiedadRef.current.value;
    const ubicacionValue = ubicacionRef.current.value;
    const metrosValue = metrosRef.current.value;

    if (
      propiedadValue === "all" ||
      ubicacionValue === "all" ||
      metrosValue < 20
    ) {
      Swal.fire({
        title: "Error",
        text: "Debes seleccionar alguna propiedad y alguna ubicación",
        icon: "error",
        customClass: {
          confirmButton: "error-button",
        },
      });
      return;
    }
    setMostrarCargando(true); // Mostrar los puntos de carga
    setTimeout(() => {
      calcular(propiedadValue, ubicacionValue, metrosValue);
      setMostrarCargando(false); // Ocultar los puntos de carga después de realizar el cálculo
    }, 2000); // Simular un tiempo de espera de 2 segundos para el cálculo

    return;
  };

  const calcular = (propiedadValue, ubicacionValue, metrosValue) => {
    // Obtener el factor correspondiente al tipo de propiedad seleccionado
    const propiedadFactor = propiedades.find(
      (propiedad) => propiedad.tipo === propiedadValue
    ).factor;
    // Obtener el factor correspondiente a la ubicación seleccionada
    const ubicacionFactor = propiedades.find(
      (propiedad) => propiedad.tipo === ubicacionValue
    ).factor;
    // Calcular el precio del seguro
    const nuevoPrecioSeguro = (
      propiedadFactor *
      ubicacionFactor *
      metrosValue
    ).toFixed(3);
    setPrecioSeguro(nuevoPrecioSeguro); // Actualizar el estado del precio del seguro
    console.log(
      "Se ha cotizado su seguro de",
      propiedadValue,
      "en",
      ubicacionValue,
      "con",
      metrosValue,
      "metros cuadrados",
      "Precio de la poliza: $",
      nuevoPrecioSeguro
    );
    // Mensaje de exito de sweet alert
    Swal.fire({
      title: "Se ha realizado la cotización exitosamente!",
      icon: "success",
      customClass: {
        container: "my-swal-container",
        title: "my-swal-title",
        icon: "my-swal-icon",
      },
    }).then((result) => {
      // Después de cerrar el mensaje de SweetAlert, mostrar el ícono de guardar
      setMostrarIconoGuardar(true);
    });
    setTimeout(() => {
      Swal.close();
    }, 3000); // Cerrar automáticamente después de 3 segundos (3000 milisegundos)
  };

  const inputChange = (valor) => {
    // Actualizar el estado con el valor del input
    setMetros2(valor);
  };

  return (
    <>
      <section className="contenedor-formulario">
        <h2 className="titulo-formulario">Ingrese los datos solicitados</h2>

        <form onSubmit={onSubmit} className="form">
          <Select
            propiedadesFiltradas={propiedadesFiltradas}
            setSelectedPropiedades={setSelectedPropiedad}
            propiedadRef={propiedadRef}
            ubicacionesFiltradas={ubicacionesFiltradas}
            setSelectedUbicacion={setSelectedUbicacion}
            ubicacionRef={ubicacionRef}
          />
          <Input metrosRef={metrosRef} onChange={inputChange} />

          <Button isLoading={mostrarCargando}>Cotizar</Button>
        </form>
        <Costos
          precioSeguro={precioSeguro}
          guardarCotizacion={guardarCotizacion}
        />
      </section>
    </>
  );
};

export default Formulario;
