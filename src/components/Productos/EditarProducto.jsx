import styled from "styled-components";
import { useState, useEffect, Fragment } from "react";
//import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormData from "form-data";
import { editarProducto } from "../../slices/productSlice";
import { useHistory } from "react-router-dom";
import "./EditarProducto.css";
import VerImagesEdit from "./VerImagesEdit";
import Swal from "sweetalert2";
import { cargarProductosAuthor } from "../../helpers/utils";
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
  const [images, setImage] = useState(""); //IMAGENES DEL STATE INICIAL
  //const [newimages, setNewImages] = useState('');
  const [contacto, setContacto] = useState("");
  const [id, setId] = useState("");

  const productoEditar = useSelector((state) => state.products.productToEdit);
  const [imagesTotales, setImagesTotales] = useState(""); //NUM TOTA DE IMGS (SUBIDAS Y POR SUBIR)
  const [imagesT, setImages] = useState(""); //NUEVAS IMAGENES PARA SUBIR
  let imagesState = parseInt(productoEditar.images.length); //NUM IMAGENES YA SUBIDAS
  let imagesSelect = parseInt(imagesT.length); //NUMERO DE IMAGENES A SUBIR

  //STATE DE IMAGENES A BORRAR
  const [imageSel, setImageSel] = useState(""); // creamos el state que llenamos desde el hijo

  //DIFERENCIA ENTRE ALMACENADAS Y CARGADAS PARA SUBIR
  const [imageDif, setImageDif] = useState();

  //STATE PESO IMAGENES
  const [imagesSize, setImagesSize] = useState(0);
  const [verifySize, setVerifySize] = useState(false);

  const sendDataToParent = (filename, status) => {
    if (status.checked === false) {
      addImagesSel(filename);
    } else {
      deleteImage(filename);
    }
  };

  const addImagesSel = (filename) => {
    setImageSel([...imageSel, filename]);
  };
  const deleteImage = (filename) => {
    setImageSel(imageSel.filter((image) => image !== filename));
  };

  let total = 0;
  let muchoPeso = false;
  for (let image of imagesT) {
    if (image.size > 1000000) {
      muchoPeso = true;
    }
    total += image.size;
  }

  useEffect(() => {
    setImageDif(imagesTotales - imageSel.length);
    setVerifySize(muchoPeso);
    setImagesSize(total);
    setId(productoEditar._id);
    setCategoria(productoEditar.categoria);
    setSubCategoria(productoEditar.subCategoria);
    setTitle(productoEditar.title);
    setPrice(productoEditar.price);
    setDescription(productoEditar.description);
    setImages(imagesT); //NUEVAS IMAGENES PARA SUBIR
    setImage(productoEditar.images); //IMAGENES DE ESTADO INICAL
    setImagesTotales(imagesState + imagesSelect);
    setContacto(productoEditar.author.nombre);
    if (imageSel.length === productoEditar.images.length && imagesT.length === 0) {
      Swal.fire({
        icon: "error",
        text: "No puedes borrar todas las imagenes, debes dejar al menos una, o cargar una imagen nueva",
      });
    }
  }, [imageSel, imagesT, imagesSize, imageDif, imagesSelect]); //eslint-disable-line react-hooks/exhaustive-deps

  const sendDataEditProduct = (formData, id) => {
    dispatch(editarProducto(formData, id));
    /* .then(res => {
      console.log(res)
      if (res.payload.status === 200) {
        Swal.fire("Correcto", "POST EDITADO CON EXITO", "success")
          .then(function () {
            cargarProductosAuthor(dispatch, history, productoEditar)
          })
      }
    }) */
  };

  const submitEditarProducto = () => {
    let formData = new FormData();
    for (var j = 0; j < imagesT.length; j++) {
      formData.append("images", imagesT[j]);
    }
    formData.set("title", title);
    formData.set("categoria", categoria);
    formData.set("subCategoria", subCategoria);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("contacto", contacto);
    formData.set("id", id); //PASAMOS EL ID COMO UN STATE MÁS CON EL PRODUCTO, PARA SABER QUE PRODUCTO ESTAMOS E

    for (var i = 0; i < imageSel.length; i++) {
      formData.append("imagesDelete", imageSel[i]);
    }
    setId(productoEditar._id);
    sendDataEditProduct({ formData, id, history });
  };

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
      contacto: productoEditar.author.nombre,
    },
  });

  return (
    <div className="container-fluid  rounded my-4 p-3">
      <div className="d-flex justify-content-center">
        <div className="rounded col-12 col-sm-12 shadow-lg p-3 bg-trasparent">
          <h2 className="text-center mx-auto font-wight-bold mb-5">Editar Producto</h2>
          <form onSubmit={handleSubmit(submitEditarProducto)}>
            <div className="mb-3">
              <Label className="mb-2">Selecciona el tipo de producto</Label>
              <select
                className="custom-select form-control pproducto"
                {...register("categoria", { required: true })}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="tablas">Tabla</option>
                <option value="velas">Vela</option>
                <option value="botavaras">Botavara</option>
                <option value="mastiles">Mastil</option>
                <option value="accesorios">Accesorio</option>
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
                Título
              </Label>
              <input
                type="text"
                className="form-control pproducto"
                id="title"
                {...register("title", {
                  required: true,
                  maxLength: { value: 50 },
                })}
                placeholder="...."
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              {errors.title && errors.title.type === "required" && (
                <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                  Pon un título al anuncio
                </h6>
              )}
              {errors.title && errors.title.type === "maxLength" && (
                <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                  Demasiados Caracteres máx 20!!
                </h6>
              )}
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
                {...register("price", { required: true })}
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

            {/* <div className="mb-3">
              <Label htmlFor="contacto" className="form-label">
                Contacto
              </Label>
              <TextArea
                className="form-control"
                id="contacto"
                {...register("contacto", { required: true })}
                rows="4"
                onChange={(e) => setContacto(e.target.value)}
              ></TextArea>
              {errors.contacto?.type === "required" && (
                <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                  Facilita un Contacto
                </h6>
              )}
            </div> */}
            <div className="container">
              <div className="row d-flex">
                <div>
                  <h6>Selecciona las imagenes que quieres sutituir : </h6>
                </div>
                {!images
                  ? null
                  : images.map((imagenEdit) => (
                      <VerImagesEdit
                        className=""
                        imagenEdit={imagenEdit}
                        sendDataToParent={sendDataToParent}
                        numImages={images.length}
                      />
                    ))}
              </div>
            </div>

            <div>
              <div className="text-center"></div>
              <input
                className="form-input"
                id="images"
                type="file"
                multiple
                {...register("images", { required: false })}
                onChange={(e) => setImages(e.target.files)}
              ></input>
            </div>

            <div className="mb-3 mt-3 text-center">
              <button
                className="btn btn-outline-warning"
                type="submit"
                disabled={
                  verifySize === true || (imageDif < 4 && verifySize === true) || imageDif > 4
                }
              >
                Editar Producto
              </button>
            </div>
          </form>
          {verifySize ? (
            <h6 className="alert alert-warning col-6 text-center mx-auto">
              Las imagenes no pueden pesar más de 1MB
            </h6>
          ) : null}
          {imageDif > 4 ? (
            <Fragment>
              <h6 className="alert alert-success col-6 text-center mx-auto">
                El numero máximo de imágenes es 4.
              </h6>
              <h5 className="alert alert-success col-6 text-center mx-auto">
                Selecciona las imagenes que quieres sustituir
              </h5>
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default EditarProducto;
