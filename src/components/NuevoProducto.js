//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO
import styled from "styled-components";
import "./NuevoProducto.css";
import { useState } from "react";
//import Select from "react-select";
import FormData from "form-data";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

//ACTIONS DE REDUX
import { crearNuevoProductoAction } from "../actions/productoActions";

const Label = styled.label`
  font-family: Saira;
`;

const TextArea = styled.textarea`
  font-family: Saira;
`;

// const tablas = [
//   { value: "slalom", label: "Slalom" },
//   { value: "freeride", label: "Free-Ride" },
//   { value: "freerace", label: "Free-Race" },
//   { value: "freestyle", label: "Free-Style" },
//   { value: "waves", label: "Waves" },
// ];

// const velas = [
//   { value: "slalom", label: "Slalom_V" },
//   { value: "freeride", label: "Free-Ride" },
//   { value: "freerace", label: "Free-Race" },
//   { value: "freestyle", label: "Free-Style" },
//   { value: "waves", label: "Waves" },
// ];

// const botavaras = [
//   { value: "carbono", label: "Carbono" },
//   { value: "aluminio", label: "Aluminio" },
//   { value: "mixtas", label: "Mixtas" },
// ];

// const mastiles = [
//   { value: "rdm", label: "RDM" },
//   { value: "sdm", label: "SDM" },
// ];

// const accesorios = [
//   { value: "arnes", label: "Arnes" },
//   { value: "alargador", label: "Alargador" },
//   { value: "aleta", label: "Aleta" },
// ];

const NuevoProducto = () => {
  //MANEJO DE STATES LOCALES
  const [categoria, setCategoria] = useState("");

  const handleProduct = (e) => {
    setCategoria(e.target.value);
  };

  const [subCategoria, setSubCategoria] = useState("");

  const handleSubProduct = (e) => {
    setSubCategoria(e.target.value);
  };

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImage] = useState("");
  const [contacto, setContacto] = useState("");

  console.log(title.length)
  //console.log(images.size);
  if (images.size > 100000) {
  }
  //console.log(subCategoria);

  // let subopcion;

  // switch (categoria) {
  //   case "tabla":
  //     subopcion = tablas;
  //     break;

  //   case "vela":
  //     subopcion = velas;
  //     break;

  //   case "botavara":
  //     subopcion = botavaras;
  //     break;

  //   case "mastil":
  //     subopcion = mastiles;
  //     break;

  //   case "accesorio":
  //     subopcion = accesorios;
  //     break;

  //   default:
  //     subopcion = tablas;
  //     break;
  // }

  //MANEJO DEL REDUX EN EL FORMULARIO

  //UTILIZAR USEDISPATCH Y TE CREA UNA FUNCION
  const dispatch = useDispatch();

  //ACCDER AL STATE DEL STORE
  

  //manda llamar al action de productoAction

  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

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

    agregarProducto(formData);

    //history.push('/productos')
  };

  //VALIDACION DE FORMULARIO
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  return (
    <div className="container-fluid  rounded my-4 p-3">
      <div className="d-flex justify-content-center">
        <div className="rounded col-md-12 col-sm-12 shadow-lg p-3 bg-trasparent">
          {/* <div className="card"> */}
            {/* <div className="card-body"> */}
              <h2 className="text-center mx-auto font-wight-bold mb-5">
                Agregar Nuevo Producto
              </h2>

              <form onSubmit={handleSubmit(submitNuevoProducto)}>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <select
                    className="custom-select form-control pproducto"
                    defaultValue=""
                    {...register("categoria", { required: true })}
                    onChange={handleProduct}
                  >
                    <option value="" disabled>
                      Selecciona el tipo de producto
                    </option>
                    <option value="tabla">Tabla</option>
                    <option value="vela">Vela</option>
                    <option value="botavara">Botavara</option>
                    <option value="mastil">Mastil</option>
                    <option value="accesorio">Accesorio</option>
                  </select>
                  {errors.categoria?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Selecciona una Categoria
                    </h6>
                  )}
                </div>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona la SubCategoria</Label>
                  <select
                    className="custom-select form-control pproducto"
                    defaultValue={subCategoria}
                    {...register("subCategoria", { required: true })}
                    //value={subCategoria} 
                    onChange={handleSubProduct}
                    // onChange={onChangeFormularioEditado}
                  > 
                   <option value="" disabled>
                      Selecciona el tipo de producto
                    </option>    
                    <option value="slalom">Slalom</option>
                    <option value="freeride">Free-Ride</option>
                    <option value="freerace">Free-Race</option>
                    <option value="freestyle">Free-Style</option>
                    <option value="foil">Foil</option>
                    <option value="waves">Waves</option>
                    <option value="carbono">Carbono</option>
                    <option value="aluminio">Aluminio</option>
                    <option value="mixta">Mixta</option>
                    <option value="rdm">RDM</option>
                    <option value="sdm">SDM</option>
                    <option value="aleta">ALETA</option>
                    <option value="arnes">ARNES</option>
                    <option value="alargador">ALARGADOR</option>
                  </select>
                  {errors.subCategoria?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Selecciona una SubCategoria
                    </h6>
                  )}
                </div>
                
                <div className="mb-3">
                  <Label htmlFor="tituloProducto" className="form-label">
                    Producto
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("title", { required: true, maxLength: { value: 20}})}
                    id="title"
                    placeholder="...."
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>

                  {errors.title && errors.title.type === 'required' && <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Pon un título al anuncio
                    </h6> }
                    {errors.title && errors.title.type === 'maxLength' && <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Demasiados Caracteres máx 20!!
                    </h6> }
                    
                 
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
                    {...register("price", { required: true, message: 'Ponle un precio' })}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  >                    
                  </input>                                  
                  {errors.price && errors.price.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Pon un precio al producto
                    </h6>
                  )}
                </div>

                <div className="mb-3">
                  <Label htmlFor="descripcionProducto" className="form-label">
                    Descripción del Producto
                  </Label>
                  <TextArea
                    className="form-control"
                    id="descripcionProducto"
                    rows="3"
                    {...register("description", { required: true })}
                    onChange={(e) => setDescription(e.target.value)}
                  ></TextArea>
                  {errors.description?.type === "required" && (
                  <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                    Describe el producto
                  </h6>
                )}
                </div>
                

                <div className="mb-3">
                  <Label htmlFor="contacto" className="form-label">
                    Contacto
                  </Label>
                  <TextArea
                    className="form-control"
                    id="contacto"
                    rows="3"
                    {...register("contacto", { required: true })}
                    onChange={(e) => setContacto(e.target.value)}
                  ></TextArea>
                  {errors.contacto?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Facilita un Contacto
                    </h6>
                  )}
                </div>
                <div>
                  <input
                    className="form-input"
                    id="images"
                    type="file"
                    //name="images"
                    {...register("images", { required: true })}
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                  {errors.images?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-4">
                      Sube una imagen
                    </h6>
                  )}
                </div>
                
                <div className="mb-3 mt-3 text-center">
                  <button
                    className="btn btn-outline-warning"
                    type="submit"
                    disabled={images.size > 100000}
                  >
                    Agregar Producto
                  </button>
                </div>
              </form>
              {images.size > 100000 ? (
                <h6 className="alert alert-warning col-6 text-center mx-auto mt-2">
                  La Imagen no puede ser mayor de 100KB
                </h6>
              ) : null}
              {/* {error ? <alert>HAY UN ERROR</alert> : null} */}
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default NuevoProducto;
