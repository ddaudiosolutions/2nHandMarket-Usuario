import styled from "styled-components";
import { useState } from "react";
import Select from "react-select";

const Label = styled.label`
  font-family: Anton;
`;

const TextArea = styled.textarea`
  font-family: Lato;
`;

const tablas = [
  { value: "slalom", label: "Slalom" },
  { value: "freeride", label: "Free-Ride" },
  { value: "freerace", label: "Free-Race" },
  { value: "freestyle", label: "Free-Style" },
];

const velas = [
  { value: "slalom", label: "Slalom_V" },
  { value: "freeride", label: "Free-Ride" },
  { value: "freerace", label: "Free-Race" },
  { value: "freestyle", label: "Free-Style" },
];

const botavaras = [
  { value: "carbono", label: "Carbono" },
  { value: "aluminio", label: "Aluminio" },
  { value: "mixtas", label: "Mixtas" },
];

const accesorios = [
  { value: "arnes", label: "Arnes" },
  { value: "alargador", label: "Alargador" },
  { value: "aleta", label: "Aleta" },
];

const EditarProducto = () => {
  const [producto, setProducto] = useState("");

  const handleProduct = (e) => {
    setProducto(e.target.value);
  };

  const [subProducto, setSubProducto] = useState("");

  const handleSubProduct = (e) => {
    setSubProducto(e.value);
  };

  // const [datos, setDatos] = useState({
  //   producto: "",
  //   subProducto: "",
  //   tituloProducto: "",
  //   precio: "",
  // });
  // const { tituloProducto, precio } = datos;

  let subopcion = tablas;
  // let [opciones, setOpciones] = useState([])

  switch (producto) {
    case "tabla":
      subopcion = tablas;
      break;

    case "vela":
      subopcion = velas;
      break;

    case "botavara":
      subopcion = botavaras;
      break;

    case "accesorio":
      subopcion = accesorios;
      break;

    default:
      console.log("ALGO DIFERENTE SE HA SELECCIONADO");
      break;
  }

  // const handleDatosForm = (e) => {
  //   setDatos({
  //     producto,
  //     subProducto,
  //     ...datos,
  //     [e.target.value]: e.target.value,
  //   });
  // };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mx-auto font-wight-bold mb-5">
                Editar Nuevo Producto
              </h2>
              <form>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <select
                    className="custom-select form-control"
                    defaultValue=""
                    name="producto"
                    value={producto}
                    onChange={handleProduct}
                  >
                    <option value="" selected>
                      Selecciona el tipo de producto
                    </option>
                    <option value="tabla">Tabla</option>
                    <option value="vela">Vela</option>
                    <option value="botavara">Botavara</option>
                    <option value="accesorio">Accesorio</option>
                  </select>
                </div>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <Select
                    name="subProducto"
                    value={subProducto.Label}
                    onChange={handleSubProduct}
                    options={subopcion}
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="tituloProducto" className="form-label">
                    Producto
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    name="tituloProducto"
                    //value={tituloProducto}
                    id="tituloProducto"
                    placeholder="Tabla Slalom ...."
                    //onChange={handleDatosForm}
                  ></input>
                </div>
                <div className="mb-3">
                  <Label htmlFor="precioProducto" className="form-label">
                    Precio
                  </Label>
                  <input
                    type="number"
                    className="form-control"
                    id="precioProducto"
                    placeholder="450"
                    name="precio"
                    //value={precio}
                    //onChange={handleDatosForm}
                  ></input>
                </div>
                <div className="mb-3">
                  <Label htmlFor="descripcionProducto" className="form-label">
                    Descripción del Producto
                  </Label>
                  <TextArea
                    className="form-control"
                    id="descripcionProducto"
                    rows="3"
                  ></TextArea>
                </div>
                <div className="mb-3 text-center">
                  <button className="btn btn-success" type="submit">
                    Guardar Cambios Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;