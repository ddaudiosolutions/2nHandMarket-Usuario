import styled from "styled-components";
import { useState, useEffect } from "react";
//import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormData from "form-data";
import { editarProductoAction } from "../actions/productoActions";
import { useHistory } from "react-router-dom";
import "./EditarProducto.css";
//STYLED COMPONENTS
const Label = styled.label`
  font-family: Saira;
`;

const TextArea = styled.textarea`
  font-family: Saira;
  font-weight: 300;
`;

//FUNCION PARA EDITAR PRODUCTO

const EditarProducto = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //OPCIONES DESDE NUEVO PRODUCTO
  const [categoria, setCategoria] = useState("");
  const [subCategoria, setSubCategoria] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImage] = useState("");
  const [imagesfilename, setImagesfilenamel] = useState("");
  const [contacto, setContacto] = useState("");
  const [id, setId] = useState("");

  //TOMAMOS LOS DATOS DEL PRODUCTO LLAMADO A EDICIÓN.
  const productoEditar = useSelector((state) => state.productos.productoeditar);
  //console.log(productoEditar)

  // TOMAMOS DEL STATE DEL PROUDUCTO EL ID PARA PODER PASARLO A LA NUEVA FUNCION DEL DISPATCH Y ASÍ
  // PODER PASAR LOS DATOS AL SERVIDOR Y NO TENER EL ERROR 'UNDEFINED'
  let productoId = productoEditar._id;
  // console.log(productoId)

  useEffect(() => {
    setId(productoId);
    setCategoria(productoEditar.categoria);
    setSubCategoria(productoEditar.subCategoria);
    setTitle(productoEditar.title);
    setPrice(productoEditar.price);
    setDescription(productoEditar.description);
    setImage(productoEditar.images[0].url);
    setImagesfilenamel(productoEditar.images[0].filename);
    setContacto(productoEditar.contacto);
    //setProductoEditado(productoEditar);
  }, [productoEditar]); //eslint-disable-line react-hooks/exhaustive-deps

  //console.log(setContacto)
  const editarProducto = (formData) => dispatch(editarProductoAction(formData));

  const submitEditarProducto = () => {
    //e.preventDefault();

    let formData = new FormData();
    formData.set("images", images);
    formData.set("imagesfilename", imagesfilename);
    formData.set("title", title);
    formData.set("categoria", categoria);
    formData.set("subCategoria", subCategoria);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("contacto", contacto);
    formData.set("id", id); //PASAMOS EL ID COMO UN STATE MÁS CON EL PRODUCTO, PARA SABER QUE PRODUCTO ESTAMOS E
    setId(productoId);
    console.log(formData.getAll("images"));
    console.log(formData.getAll("imagesUrl"));

    editarProducto(formData, history);

    //console.log(formData.get("contacto"));
    //console.log(formData);
    history.push("/productos/user");
  };
  //console.log(title)
  //VALIDACION DE FORMULARIO
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      categoria: productoEditar.categoria,
      subCategoria: productoEditar.subCategoria,
      title: productoEditar.title,
      price: productoEditar.price,
      description: productoEditar.description,
      contacto: productoEditar.contacto,
    },
  });

  return (
    <div className="container-fluid  rounded my-4 p-3">
      <div className="d-flex justify-content-center">
        <div className="rounded col-12 col-sm-12 shadow-lg p-3 bg-trasparent">
          {/* <div className="card"> */}
          {/* <div className="card-body"> */}
          <h2 className="text-center mx-auto font-wight-bold mb-5">
            Editar Producto
          </h2>
          <form onSubmit={handleSubmit(submitEditarProducto)}>
            <div className="mb-3">
              <Label className="mb-2">Selecciona el tipo de producto</Label>
              <select
                className="custom-select form-control pproducto"
                {...register("categoria", { required: true })}
                defaultValue={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="tabla">Tabla</option>
                <option value="vela">Vela</option>
                <option value="botavara">Botavara</option>
                <option value="mastil">Mastil</option>
                <option value="accesorio">Accesorio</option>
              </select>
              {errors.categoria?.type === "required" && (
                <h6 className="alert alert-warning col-6 text-center mx-auto">
                  Selecciona una Categoria
                </h6>
              )}
            </div>
            <div className="mb-3">
              <Label className="mb-2">Selecciona la Categoria</Label>
              <select
                className="custom-select form-control pproducto"
                defaultValue={subCategoria}
                {...register("subCategoria", { required: true })}
                onChange={(e) => setSubCategoria(e.target.value)}
              >
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
                className="form-control pproducto"
                //defaultValue={title}
                id="title"
                //name={title}
                {...register("title", { required: true, maxLength: { value: 20}})}
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
                className="form-control pproducto"
                id="precioProducto"
                placeholder="....."
                //name='price'
                {...register("price", { required: true })}
                // defaultValue={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></input>
              {errors.price?.type === "required" && (
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
                className="form-control "
                id="description"
                rows="3"
                // name="description"
                //defaultValue={description}
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
                //name="contacto"
                //defaultValue={contacto}
                {...register("contacto", { required: true })}
                rows="4"
                onChange={(e) => setContacto(e.target.value)}
              ></TextArea>
              {errors.contacto?.type === "required" && (
                <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                  Facilita un Contacto
                </h6>
              )}
            </div>

            <a href={images} target="_blank" rel="noreferrer">
              <img
                className="card-img-top "
                src={images}
                style={{ width: "200px" }}
                alt="Imagen Cambiada"
              ></img>
            </a>
            <div>
              <input
                className="form-input"
                id="images"
                type="file"
                //name="images"
                {...register("images", { required: false })}
                onChange={(e) => setImage(e.target.files[0])}
                //onChange ={imageHandle}
              ></input>
            </div>

            <div className="mb-3 mt-3 text-center">
              <button
                className="btn btn-outline-warning"
                type="submit"
                disabled={images.size > 100000}
              >
                Editar Producto
              </button>
            </div>
          </form>
          {images.size > 100000 ? (
            <h6 className="alert alert-warning col-6 text-center mx-auto">
              La Imagen no puede ser mayor de 100KB
            </h6>
          ) : null}
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default EditarProducto;
