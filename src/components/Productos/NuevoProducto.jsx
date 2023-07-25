//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO
import styled from "styled-components";
import "./NuevoProducto.css";
import { useState, useEffect } from "react";
import FormData from "form-data";
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoProducto } from "../../slices/productSlice";
import { Form, Field } from "react-final-form";
import Swal from "sweetalert2";

const Label = styled.label`
  font-family: Saira;
`;

const NuevoProducto = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.users.user);
  const [images, setImage] = useState("");

  let muchoPeso = false;
  for (let image of images) {
    if (image.size > 1000000) {
      console.log("demasiado peso");
      muchoPeso = true;
    }
  }
  const [imgVerif, setImagVerif] = useState(false);

  useEffect(() => {
    setImagVerif(muchoPeso);
  }, [muchoPeso]);

  const agregarProducto = (producto) => dispatch(crearNuevoProducto(producto));

  const submitNuevoProducto = (values) => {
    if (images.length > 0 && usuario.telefono !== undefined) {
      let formData = new FormData();
      for (var i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      formData.set("title", values.title);
      formData.set("categoria", values.categoria);
      formData.set("subCategoria", values.subCategoria);
      formData.set("price", values.price);
      formData.set("description", values.description);
      formData.set("contacto", values.contacto);
      agregarProducto(formData);
    } else {
      if (usuario.telefono === undefined) {
        Swal.fire({
          icon: "info",
          html: "Recuerda <br> No podrás recibir mensajes por Whatsapp <br> si no añades tu numero de telefono a tu perfil",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Guardar y Continuar",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            let formData = new FormData();
            for (var i = 0; i < images.length; i++) {
              formData.append("images", images[i]);
            }
            formData.set("title", values.title);
            formData.set("categoria", values.categoria);
            formData.set("subCategoria", values.subCategoria);
            formData.set("price", values.price);
            formData.set("description", values.description);
            formData.set("contacto", values.contacto);
            agregarProducto(formData);
          }
        });
      }
      if (images.length <= 0) {
        Swal.fire({
          icon: "error",
          text: "Debes subir al menos una imagen",
        });
      }
    }
  };
  const required = (value) => value === (undefined || "") && "Debes Rellenar este campo";

  return (
    <div className="container-fluid  rounded my-4 p-2">
      <div className="d-flex justify-content-center">
        <div className="rounded col-12 col-sm-12 shadow-lg p-3 bg-trasparent">
          <h2 className="text-center mx-auto font-wight-bold mb-5">Agregar Nuevo Producto</h2>
          <Form
            onSubmit={submitNuevoProducto}
            initialValues={{
              categoria: "",
              subCategoria: "",
              title: "",
              price: "",
              description: "",
              contacto: usuario.email,
            }}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Field name="categoria" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className="mb-2">Selecciona el tipo de producto</Label>
                        <select {...input} className="form-select mb-2">
                          <option value=""></option>
                          <option value="tablas">Tabla</option>
                          <option value="velas">Vela</option>
                          <option value="botavaras">Botavara</option>
                          <option value="mastiles">Mastil</option>
                          <option value="accesorios">Accesorio</option>
                        </select>
                        {meta.error && meta.touched && (
                          <span className="error">Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="subCategoria" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className="mb-2">Selecciona la SubCategoria</Label>
                        <select {...input} className="form-select mb-2">
                          <option value=""></option>
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
                        {meta.error && meta.touched && (
                          <span className="error">Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="title" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className="mb-2">Título</Label>
                        <input {...input} type="text" className="form-control mb-2" />
                        {meta.error && meta.touched && (
                          <span className="error">Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="price" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className="mb-2">Precio</Label>
                        <input {...input} type="number" className="form-control mb-2" />
                        {meta.error && meta.touched && (
                          <span className="error">Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="description" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className="mb-2">Descripción del Producto</Label>
                        <textarea {...input} type="textarea" className="form-control mb-2" />
                        {meta.error && meta.touched && (
                          <span className="error">Introduce una descripción</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="contacto" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className="mb-2">Contacto</Label>
                        <input {...input} type="textarea" className="form-control mb-2" />
                        {meta.error && meta.touched && (
                          <span className="error">Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <div>
                    <div>
                      <Label className="">Sube Tus Fotos:</Label>
                      <text className="text-danger">
                        {" "}
                        Las Imagenes no pueden pesar más de 1MB cada Una{" "}
                      </text>
                    </div>
                    <input
                      className="form-input btn-file-upload"
                      id="images"
                      type="file"
                      multiple
                      onChange={(e) => setImage(e.target.files)}
                    ></input>
                  </div>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                <div className="mb-3 mt-3 text-center">
                  <button
                    className="btn btn-outline-warning"
                    type="submit"
                    disabled={images.length > 4 || imgVerif === true}
                  >
                    Agregar Producto
                  </button>
                </div>
              </form>
            )}
          />
          {imgVerif ? (
            <h6 className="alert alert-warning col-6 text-center mx-auto mt-2">
              Las Imágenes no pueden ser mayores de 1MB
            </h6>
          ) : null}
          {images.length > 4 ? (
            <h6 className="alert alert-warning col-6 text-center mx-auto mt-2">
              Solo puedes subir un maximo de 4 fotos
            </h6>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
