import { Modal } from 'react-bootstrap';
import FormularioDatosEnvio from '../gestionEnvios/FormularioDatosEnvio';

function GestionEnvioModal({ show, handleClose, datosRemitente }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>
          <h5> Formulario de contacto </h5>
          <h6>Rellena todos los campos que estén vacíos</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormularioDatosEnvio handleClose={handleClose} datosRemitente={datosRemitente.author} />
      </Modal.Body>
    </Modal>
  );
}

export default GestionEnvioModal;
