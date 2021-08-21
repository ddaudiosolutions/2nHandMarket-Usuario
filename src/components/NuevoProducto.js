//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO
import styled from "styled-components";
import { useState } from "react";
import Select from "react-select";

import { useDispatch } from "react-redux";

import 'react-toastify/dist/ReactToastify.css';
//ACTIONS DE REDUX
import { crearNuevoProductoAction } from "../actions/productoActions";

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
  { value: "waves", label: "Waves" },
];

const velas = [
  { value: "slalom", label: "Slalom_V" },
  { value: "freeride", label: "Free-Ride" },
  { value: "freerace", label: "Free-Race" },
  { value: "freestyle", label: "Free-Style" },
  { value: "waves", label: "Waves" },
];

const botavaras = [
  { value: "carbono", label: "Carbono" },
  { value: "aluminio", label: "Aluminio" },
  { value: "mixtas", label: "Mixtas" },
];

const mastiles = [
  { value: "rdm", label: "RDM" },
  { value: "sdm", label: "SDM" },
];

const accesorios = [
  { value: "arnes", label: "Arnes" },
  { value: "alargador", label: "Alargador" },
  { value: "aleta", label: "Aleta" },
];

const NuevoProducto = ({history}) => {
  //MANEJO DE STATES LOCALES
  const [categoria, setCategoria] = useState("");

  const handleProduct = (e) => {
    setCategoria(e.target.value);
  };

  const [subCategoria, setSubCategoria] = useState("");

  const handleSubProduct = (e) => {
    setSubCategoria(e.value);
  };

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  //CONFIGURANDO EL UPLOADIMAGES
  
  //const [images, setImages] = useState([]);
  
  // const imageHandler = (e) => {
  //   const file = e.target.files[0]
  //   const formData = new FormData()
  //   formData.append ('image', file)
  //   console.log(formData)
  // }

  let subopcion;

  switch (categoria) {
    case "tabla":
      subopcion = tablas;
      break;

    case "vela":
      subopcion = velas;
      break;

    case "botavara":
      subopcion = botavaras;
      break;

    case "mastil":
      subopcion = mastiles;
      break;

    case "accesorio":
      subopcion = accesorios;
      break;

    default:
      subopcion = tablas;
      break;
  }

  //MANEJO DEL REDUX EN EL FORMULARIO

  //UTILIZAR USEDISPATCH Y TE CREA UNA FUNCION
  const dispatch = useDispatch();

  //manda llamar al action de productoAction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  //AL HACER SUBMIT EN EL FORMULARIO
  const submitNuevoProducto = (e) => {
        e.preventDefault();
    
    //crear el nuevo producto agregando los states locales de cada producto, para enviarlo al action
    agregarProducto({
      categoria,
      subCategoria,
      title,
      price,
      description,
      //images
    });

    history.push('/productos')
  };

    

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mx-auto font-wight-bold mb-5">
                Agregar Nuevo Producto
              </h2>
              <form onSubmit={submitNuevoProducto}>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <select
                    className="custom-select form-control"
                    defaultValue=""
                    name="categoria"
                    //value={categoria}
                    onChange={handleProduct}
                  >
                    <option value="" selected>
                      Selecciona el tipo de producto
                    </option>
                    <option value="tabla">Tabla</option>
                    <option value="vela">Vela</option>
                    <option value="botavara">Botavara</option>
                    <option value="mastil">Mastil</option>
                    <option value="accesorio">Accesorio</option>
                  </select>
                </div>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <Select
                    defaultValue=""
                    name="subCategoria"
                    //value={subCategoria.Label}
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
                    name="title"
                    //value={title}
                    id="title"
                    placeholder="Tabla Slalom ...."
                    onChange={(e) => setTitle(e.target.value)}
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
                    name="price"
                    //value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
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
                    // value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></TextArea>
                </div>
                
                <div className="mb-3 text-center">
                  <button className="btn btn-success" type="submit">
                    Agregar Producto
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

export default NuevoProducto;
