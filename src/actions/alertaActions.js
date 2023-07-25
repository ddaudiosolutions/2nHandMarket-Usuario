/* import{
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

//MOSTRAR UNA ALERTA

export function mostrarAlertaActions(alerta) {
    return (dispatch) => {
        dispatch(mostrarAlerta(alerta))
    }
}

const mostrarAlerta = alerta => ( {
  type: MOSTRAR_ALERTA,
  payload: alerta  
})


export function ocultarAlertaAction(){
    return(dispatch)=>{
        dispatch(ocultarAlerta())
    }
}


const ocultarAlerta = alerta => ( {
    type: OCULTAR_ALERTA,
    payload: alerta  
  }) */