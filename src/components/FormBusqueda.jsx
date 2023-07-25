import {  useHistory } from "react-router-dom";

const FormBusqueda = ({busquedaquery}) => {

    const history = useHistory();
    return ( 
        <div>
            <form>
                  <div className="container">
                    <select
                      className="form-select col-6"
                      defaultValue={busquedaquery}
                      name="busqueda"
                      //SELECCION DE CATEGORIA DE PRODUCTOS A MOSTRAR en REACT MEJOR CON HISTORY.PUSH
                      onChange={(e) =>
                        history.push(
                          `/productos?busqueda=${e.target.value}&page=0`
                        )
                      }
                    >
                      <option value="ultimos_productos">
                        Últimos Productos
                      </option>
                      <option value="tablas">Tablas</option>
                      <option value="velas">Velas</option>
                      <option value="botavaras">Botavaras</option>
                      <option value="mastiles">Mastiles</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </div>
                </form>
        </div>
     );
}
 
export default FormBusqueda;