import styled from "styled-components";
import { useState, useEffect } from "react";
//import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
import { editarProductoAction} from "../actions/productoActions";
import { useHistory } from "react-router-dom";

//STYLED COMPONENTS
const Label = styled.label`
  font-family: Anton;
`;

const TextArea = styled.textarea`
  font-family: Lato;
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
  const [imagesfilename, setImagesfilenamel] = useState('')
  const [contacto, setContacto] = useState('');
  const [id, setId] = useState('');

//TOMAMOS LOS DATOS DEL PRODUCTO LLAMADO A EDICIÓN.
  const productoEditar = useSelector((state) => state.productos.productoeditar);
  //console.log(productoEditar)

 
 // TOMAMOS DEL STATE DEL PROUDUCTO EL ID PARA PODER PASARLO A LA NUEVA FUNCION DEL DISPATCH Y ASÍ 
 // PODER PASAR LOS DATOS AL SERVIDOR Y NO TENER EL ERROR 'UNDEFINED'
  let productoId = productoEditar._id
  console.log(productoId)
  
  useEffect(() => {
    setId(productoId)
    setCategoria(productoEditar.categoria)
    setSubCategoria(productoEditar.subCategoria)
    setTitle(productoEditar.title)
    setPrice(productoEditar.price)
    setDescription(productoEditar.description)
    setImage(productoEditar.images[0].url)
    setImagesfilenamel(productoEditar.images[0].filename)
    setContacto(productoEditar.contacto)
    //setProductoEditado(productoEditar);
    
    
  }, [productoEditar]); //eslint-disable-line react-hooks/exhaustive-deps
  
  //console.log(setContacto)
  const editarProducto = (formData ) => 
    dispatch(editarProductoAction(formData));
  
  const submitEditarProducto = (e) => {
    e.preventDefault();      

    let formData = new FormData();
    formData.set("images", images);
    formData.set('imagesfilename', imagesfilename);
    formData.set("title", title);
    formData.set("categoria", categoria);
    formData.set("subCategoria", subCategoria);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("contacto", contacto)
    formData.set('id', id) //PASAMOS EL ID COMO UN STATE MÁS CON EL PRODUCTO, PARA SABER QUE PRODUCTO ESTAMOS E
    setId(productoId)
    console.log(formData.getAll('images'))
    console.log(formData.getAll('imagesUrl'))

    editarProducto(formData, history);
    
    console.log(formData.get('contacto'))
    //console.log(formData);
    history.push("/productos");
  };

  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mx-auto font-wight-bold mb-5">
                EDITAR Producto
              </h2>
              <form onSubmit={submitEditarProducto}>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <select
                    className="custom-select form-control"
                    defaultValue={categoria}
                    name="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    // onChange={onChangeFormularioEditado}
                  >
                    
                    <option value="tabla">Tabla</option>
                    <option value="vela">Vela</option>
                    <option value="botavara">Botavara</option>
                    <option value="mastil">Mastil</option>
                    <option value="accesorio">Accesorio</option>
                  </select>
                </div>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona la Categoria</Label>
                  <select
                    className="custom-select form-control"
                    defaultValue={subCategoria}
                    name="subCategoria"
                    value={subCategoria} 
                    onChange={(e) => setSubCategoria(e.target.value)}
                    // onChange={onChangeFormularioEditado}
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
                </div>
                <div className="mb-3">
                  <Label htmlFor="tituloProducto" className="form-label">
                    Producto
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
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
                    value={price}
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
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></TextArea>
                </div>
                <div className="mb-3">
                  <Label htmlFor="contacto" className="form-label">
                    Contacto
                  </Label>
                  <TextArea
                    className="form-control"
                    id="contacto"
                    value={contacto}
                    rows="4"
                    onChange={(e) => setContacto(e.target.value)}
                  ></TextArea>
                </div>
                <a href={images} target='_blank' rel='noreferrer'>
                <img
                  className="card-img-top "
                  src={images}
                  style={{width: '200px'}}
                  alt="imagen nula"
                ></img>
                  </a>
                <div>
                  <input
                    className="form-input"
                    id="images"
                    type="file"
                    name="images"
                    //value={images}
                    onChange={(e) => setImage(e.target.files[0])}
                    //onChange ={imageHandle}
                  ></input>
                </div>

                <div className="mb-3 mt-3 text-center">
                  <button className="btn btn-success" type="submit">
                    Editar Producto
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
