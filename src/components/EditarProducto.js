import styled from "styled-components";
import { useState, useEffect, Fragment } from "react";
//import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormData from "form-data";
import { editarProductoAction } from "../actions/productoActions";
import { useHistory } from "react-router-dom";
import "./EditarProducto.css";
import VerImagesEdit from "./VerImagesEdit";
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
  const [images, setImage] = useState(""); //imagenes de estado inical
  //const [newimages, setNewImages] = useState('');
  const [contacto, setContacto] = useState("");
  const [id, setId] = useState("");

  //TOMAMOS LOS DATOS DEL PRODUCTO LLAMADO A EDICIÓN.
  const productoEditar = useSelector((state) => state.productos.productoeditar);
  console.log(productoEditar.categoria);

  // TOMAMOS DEL STATE DEL PROUDUCTO EL ID PARA PODER PASARLO A LA NUEVA FUNCION DEL DISPATCH Y ASÍ
  // PODER PASAR LOS DATOS AL SERVIDOR Y NO TENER EL ERROR 'UNDEFINED'
  let productoId = productoEditar._id;

  const [imagesTotales, setImagesTotales] = useState("");//NUM TOTA DE IMGS (SUBIDAS Y POR SUBIR)
  console.log('imagenes Totales:  ' + imagesTotales)
  const [imagesT, setImages] = useState("");
  //console.log(imagesT)
  let imagesState = parseInt(productoEditar.images.length); //NUM IMAGENES YA SUBIDAS
  //console.log(imagesState)
  let imagesSelect = parseInt(imagesT.length);//NUMERO DE IMAGENES A SUBIR
  //console.log(imagesSelect)

  //STATE DE IMAGENES A BORRAR
  const [imageSel, setImageSel] = useState(''); // creamos el state que llenamos desde el hijo  

  //DIFERENCIA ENTRE ALMACENADAS Y CARGADAS PARA SUBIR

  const [imageDif, setImageDif] = useState()
  


//STATE PESO IMAGENES
  const [imagesSize, setImagesSize] = useState(0);
  const [verifySize, setVerifySize] = useState(false);

  const sendDataToParent = (filename, status) => {    
    if(status.checked === false) {
      addImagesSel(filename)
    }else{
      deleteImage(filename)
    }};
    const addImagesSel = (filename)=> {
      setImageSel([...imageSel, filename])
    }
    const deleteImage = (filename)=>{      
      setImageSel(imageSel.filter(image=> image !== filename))
      }
      
       let total = 0;
       let muchoPeso = false;
    for(let image of imagesT){
      if(image.size > 1000000)
      {
        muchoPeso = true
      }
      console.log(image.size)
      total += image.size;
    }
   
    //console.log(imagesSize) 

  useEffect(() => {  
    setImageDif(imagesTotales - imageSel.length)
    console.log('La diferencia es de:  ' + imageDif)
    console.log(imageSel)
    console.log(imagesSize) 
    console.log(verifySize)  
    setVerifySize(muchoPeso)
    setImagesSize(total)  
    setId(productoId);
    setCategoria(productoEditar.categoria);
    setSubCategoria(productoEditar.subCategoria);
    setTitle(productoEditar.title);
    setPrice(productoEditar.price);
    setDescription(productoEditar.description);
    setImages(imagesT); //NUEVAS IMAGENES PARA SUBIR
    setImage(productoEditar.images); //IMAGENES DE ESTADO INICAL
    setImagesTotales(imagesState + imagesSelect);
    setContacto(productoEditar.author.nombre);
    //setProductoEditado(productoEditar);
  }, [imageSel, imagesT, imagesSize, imageDif, imagesSelect]); //eslint-disable-line react-hooks/exhaustive-deps
    
  

  //console.log(images);
  const editarProducto = (formData, id) =>
    dispatch(editarProductoAction(formData, id));

  const submitEditarProducto = () => {
    //e.preventDefault();

    let formData = new FormData();

    for (var j = 0; j < imagesT.length; j++) {
      formData.append("images", imagesT[j]);
    }
    //formData.set("imagesfilename", imagesfilename);
    formData.set("title", title);
    formData.set("categoria", categoria);
    formData.set("subCategoria", subCategoria);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("contacto", contacto);
    formData.set("id", id); //PASAMOS EL ID COMO UN STATE MÁS CON EL PRODUCTO, PARA SABER QUE PRODUCTO ESTAMOS E
    
    for(var i = 0; i<imageSel.length; i++){
      formData.append('imagesDelete', imageSel[i])
    }
    
    setId(productoId);
    console.log(formData.getAll("imagesDelete"));

    editarProducto(formData, id, history);
    // console.log(images);

    history.push("/productos/user");
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
          <h2 className="text-center mx-auto font-wight-bold mb-5">
            Editar Producto
          </h2>
          <form onSubmit={handleSubmit(submitEditarProducto)}>
            <div className="mb-3">
              <Label className="mb-2">Selecciona el tipo de producto</Label>
              <select
                className="custom-select form-control pproducto"
               // defaultValue={categoria}
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
                //defaultValue={subCategoria}
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
                {...register("title", {
                  required: true,
                  maxLength: { value: 20 },
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
            <div className="container">
              <div className="row d-flex">
                {!images
                  ? null
                  : images.map((imagenEdit) => (
                      <VerImagesEdit
                        className=""
                        imagenEdit={imagenEdit}
                        sendDataToParent={sendDataToParent}
                      />
                    ))}
              </div>
            </div>

            <div>
              <div className='text-center'>
              {/* <text className='text-danger'> El número máximo de fotos es 4 </text> */}
              </div>
             
              <input
                className="form-input"
                id="images"
                type="file"
                multiple
                //name="images"
                {...register("images", { required: false })}
                onChange={(e) => setImages(e.target.files)}
                //onChange ={imageHandle}
              ></input>
              {/* <text className='text-danger'> Las Imagenes no pueden pesar más de 1MB cada Una </text> */}
          
            </div>

            <div className="mb-3 mt-3 text-center">
              <button
                className="btn btn-outline-warning"
                type="submit"
                disabled={verifySize === true || (imageDif < 4 && verifySize === true) || imageDif > 4}                
              
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
              <h6 className="alert alert-warning col-6 text-center mx-auto">
              El numero máximo de imágenes es 4.             
            </h6>
            <h5 className="alert alert-warning col-6 text-center mx-auto">
              Selecciona {imagesSelect} imagen/es para ser borrada/s
                         
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
