import styled from "styled-components";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { editarProductoActionUser } from "../actions/productoActions";
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

  //NUEVO STATE PRODUCTO
  const [producto, setProductoEditado] = useState({
    categoria: "",
    subCategoria: "",
    price: "",
    title: "",
    description: "",
  });
  const productoEditar = useSelector((state) => state.productos.productoeditar);
  //console.log(productoEditar);
  //if(!productoEditar) return null;
  const { categoria, subCategoria, price, title, description } = producto;

  useEffect(() => {
    setProductoEditado(productoEditar);
  }, [productoEditar]);

 

  //LEER DATOS FORMULARIO
  const onChangeFormularioEditado = (e) => {
    setProductoEditado({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditarProducto = e => {
    e.preventDefault()
    dispatch(editarProductoActionUser(producto));
    console.log(producto)
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
              <form onSubmit={submitEditarProducto}>
                <div className="mb-3">
                  <Label className="mb-2">Selecciona el tipo de producto</Label>
                  <select
                    className="custom-select form-control"
                    defaultValue=""
                    name="categoria"
                    value={categoria}
                    onChange={onChangeFormularioEditado}
                    // onChange={onChangeFormularioEditado}
                  >
                    <option value="" selected>
                      Selecciona la categoria
                    </option>
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
                    defaultValue=""
                    name="subCategoria"
                    value={subCategoria}
                    onChange={onChangeFormularioEditado}
                    // onChange={onChangeFormularioEditado}
                  >
                    <option value="" selected>
                      Selecciona la categoria
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
                    onChange={onChangeFormularioEditado}
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
                    onChange={onChangeFormularioEditado}
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
                    onChange={onChangeFormularioEditado}
                  ></TextArea>
                </div>

                <div className="mb-3 text-center">
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
