//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO
import styled from "styled-components";
import "./NuevoBuscoPost.css";
import { useState, } from "react";
//import Select from "react-select";
// import FormData from "form-data";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

//ACTIONS DE REDUX
import { crearNuevoBuscoPostActions } from "../actions/buscoPostActions";

const Label = styled.label`
  font-family: Saira;
`;

const TextArea = styled.textarea`
  font-family: Saira;
`;

const NuevoBuscoPost = () => {

  const datosContacto = useSelector((state) => state.auth)
  console.log(datosContacto);

  //UTILIZAR USEDISPATCH Y TE CREA UNA FUNCION
  const dispatch = useDispatch();
  

  const [title, setTitle] = useState("");  
  const [description, setDescription] = useState("");  
  const [contacto, setContacto] = useState(datosContacto);

  

  //MANEJO DEL REDUX EN EL FORMULARIO  

  const agregarBuscoPost = (title, description, contacto) =>
    dispatch(crearNuevoBuscoPostActions(title, description, contacto));

  //Validar Formulario

  //AL HACER SUBMIT EN EL FORMULARIO
  const submitNuevoBuscoPost = () => {
    //e.preventDefault();
    agregarBuscoPost(title, description, contacto);    
    //history.push('/productos')
  };

  //VALIDACION DE FORMULARIO
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
 
  return (
    <div className="container-fluid  rounded my-4 p-2">
      <div className="d-flex justify-content-center">
        <div className="rounded col-12 col-sm-12 shadow-lg p-3 bg-trasparent">
          {/* <div className="card"> */}
            {/* <div className="card-body"> */}
              <h2 className="text-center mx-auto font-wight-bold mb-5">
                Agregar Nuevo Post de Busqueda
              </h2>

              <form onSubmit={handleSubmit(submitNuevoBuscoPost)}>
                {/* <div className="mb-3">
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
                    <option value="tablas">Tabla</option>
                    <option value="velas">Vela</option>
                    <option value="botavaras">Botavara</option>
                    <option value="mastiles">Mastil</option>
                    <option value="accesorios">Accesorio</option>
                  </select>
                  {errors.categoria?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Selecciona una Categoria
                    </h6>
                  )}
                </div> */}
                {/* <div className="mb-3">
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
                </div> */}
                
                <div className="mb-3">
                  <Label htmlFor="tituloProducto" className="form-label">
                    Título
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
                      Pon un título a la Busqueda
                    </h6> }
                    {errors.title && errors.title.type === 'maxLength' && <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Demasiados Caracteres máx 20!!
                    </h6> }
                    
                 
                </div>
                {/* <div className="mb-3">
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
                </div> */}

                <div className="mb-3">
                  <Label htmlFor="descripcionProducto" className="form-label">
                    Descripción de la Busqueda
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
                    Describe lo que Buscas
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
                    defaultValue={datosContacto}
                    //placeholder='Por Defecto se utilizarán los datos de contacto guardados en el perfil'
                    {...register("contacto", { required: false })}
                    onChange={(e) => setContacto(e.target.value)}
                  ></TextArea>
                  {errors.contacto?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Facilita un Contacto
                    </h6>
                  )}
                </div>
                {/* <div>
                  <div>
                  <Label className=''/ >Sube Tus Fotos:<Label/>
                  <text className='text-danger'> Las Imagenes no pueden pesar más de 1MB cada Una </text>
                  </div>
                  
                  <input
                    className="form-input btn-file-upload"
                    id="images"
                    type="file"
                    multiple
                    //name="images"
                    {...register("images", { required: true })}
                    onChange={(e) => setImage(e.target.files)}
                  ></input>
                  {errors.images?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-4">
                      Sube una imagen
                    </h6>
                  )}
                </div> */}
                
                <div className="mb-3 mt-3 text-center">
                  <button
                    className="btn btn-outline-warning"
                    type="submit"
                    //disabled={images.length > 4 || imgVerif === true}
                    //disabled={imgVerif === true}
                  >
                    Agregar Post de Busqueda
                  </button>
                </div>
              </form>
              {/* {imgVerif ? (
                <h6 className="alert alert-warning col-6 text-center mx-auto mt-2">
                  Las Imágenes no pueden ser mayores de 1MB
                </h6>
              ) : null}
              {images.length > 4 ? (
                <h6 className="alert alert-warning col-6 text-center mx-auto mt-2">
                  Solo puedes subir un maximo de 4 fotos
                </h6>
              ) : null} */}
              {/* {error ? <alert>HAY UN ERROR</alert> : null} */}
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default NuevoBuscoPost;
