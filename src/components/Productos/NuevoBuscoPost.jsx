//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO
import styled from "styled-components";
import "./NuevoBuscoPost.css";
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoBuscoPostActions } from "../../slices/buscoPostSlice";
import { Field, Form } from "react-final-form";

const Label = styled.label`
  font-family: Saira;
`;

const TextArea = styled.textarea`
  font-family: Saira;
`;

const NuevoBuscoPost = () => {
  const usuario = useSelector((state) => state.users.user);
  console.log(usuario);
  //UTILIZAR USEDISPATCH Y TE CREA UNA FUNCION
  const dispatch = useDispatch();
  const submitNuevoBuscoPost = (values) => {
    const { contacto, descripcionBuscoPost, title } = values;
    console.log(values);
    dispatch(
      crearNuevoBuscoPostActions({ title, description: descripcionBuscoPost, contacto: contacto })
    );
  };

  const required = (value) => value === (undefined || "") && "Debes Rellenar este campo";

  return (
    <div className="container-fluid  rounded my-4 p-2">
      <div className="d-flex justify-content-center">
        <div className="rounded col-12 col-sm-12 shadow-lg p-3 bg-trasparent">
          <h2 className="text-center mx-auto font-wight-bold mb-5">
            Agregar Nuevo Post de Busqueda
          </h2>
          <Form
            onSubmit={submitNuevoBuscoPost}
            initialValues={{
              contacto: usuario.email,
            }}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                </div>
                <div className="mb-3">
                  <Field name="descripcionBuscoPost" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className="mb-2"> Descripción de la Busqueda </Label>
                        <input {...input} type="text" className="form-control mb-2" />
                        {meta.error && meta.touched && (
                          <span className="error">Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="mb-3">
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
                </div>
                <div className="mb-3 mt-3 text-center">
                  <button className="btn btn-outline-warning" type="submit">
                    Agregar Post de Busqueda
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default NuevoBuscoPost;
