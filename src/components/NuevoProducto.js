//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO
import styled from "styled-components";
import { useState } from "react";
import Select from "react-select";
import FormData from "form-data";
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

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

const NuevoProducto = ({ history }) => {

 
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
  const [images, setImage] = useState("");
  const [contacto, setContacto] = useState("");

  //console.log(images)

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

  //ACCDER AL STATE DEL STORE
  const alerta = useSelector((state) => state.alerta.alerta);

  //manda llamar al action de productoAction

  const agregarProducto = (producto, history) =>
    dispatch(crearNuevoProductoAction(producto, history));

 
  //Validar Formulario
  
  
  //AL HACER SUBMIT EN EL FORMULARIO
  const submitNuevoProducto = () => {
        //e.preventDefault();

    let formData = new FormData();
    formData.set("images", images);
    formData.set("title", title);
    formData.set("categoria", categoria);
    formData.set("subCategoria", subCategoria);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("contacto", contacto);

    agregarProducto(formData, history);

    //history.push('/productos')
  };

   //VALIDACION DE FORMULARIO
   const {register, formState:{errors}, handleSubmit} = useForm();

  return (
    <div className="container-fluid bg-transparent rounded my-4 p-3">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card1">
            <div className="card-body">
              <h2 className="text-center mx-auto font-wight-bold mb-5">
                Agregar Nuevo Producto
              </h2>

              
              <form onSubmit={handleSubmit(submitNuevoProducto)}>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <select
                    className="custom-select form-control"
                    defaultValue=""
                    {...register("categoria", {required: true})}
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
                  {errors.categoria?.type === 'required' && 'Selecciona una Categoria'}
                </div>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <Select
                    defaultValue=""
                    {...register("subCategoria", {required: false})}
                    onChange={handleSubProduct}
                    options={subopcion}
                  />
                  {errors.subCategoria?.type === 'required' && 'Selecciona una subCategoria'}
                </div>
                <div className="mb-3">
                  <Label htmlFor="tituloProducto" className="form-label">
                    Producto
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("title", {required:true})}
                    id="title"
                    placeholder="Tabla Slalom ...."
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                  {errors.title?.type === 'required' && 'Pon un título al anuncio'}
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
                    {...register("price", {required:true})}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  ></input>
                  {errors.price?.type === 'required' && 'Pon un precio al producto'}
                </div>

                <div className="mb-3">
                  <Label htmlFor="descripcionProducto" className="form-label">
                    Descripción del Producto
                  </Label>
                  <TextArea
                    className="form-control"
                    id="descripcionProducto"
                    rows="3"
                    {...register('description', {required:true})}
                    onChange={(e) => setDescription(e.target.value)}
                  ></TextArea>
                </div>
                {errors.description?.type === 'required' && 'Describe el producto'}
                <div className="mb-3">
                  <Label htmlFor="contacto" className="form-label">
                    Contacto
                  </Label>
                  <TextArea
                    className="form-control"
                    id="contacto"
                    rows="3"
                    {...register('contacto', {required:true})}
                    onChange={(e) => setContacto(e.target.value)}
                  ></TextArea>
                  {errors.contacto?.type === 'required' && 'Deja un contacto'}
                </div>
                <div>
                  <input
                    className="form-input"
                    id="images"
                    type="file"
                    //name="images"
                    {...register('images', {required: true})}
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                  
                </div>
                {errors.images?.type === 'required' && 'Sube una foto'}
                <div className="mb-3 mt-3 text-center">
                  <button className="btn btn-success" type="submit">
                    Agregar Producto
                  </button>
                </div>
              </form>
              {/* {cargando ? <p>Cargando.....</p> : null} */}
              {/* {error ? <alert>HAY UN ERROR</alert> : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
